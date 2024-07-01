import { createDockerLogsObserver } from '../utils/create-docker-logs-observer';
import mitt from 'mitt';

export type TBucket = {
  send(msg: string): Promise<void>;
  bind(containerId: string): Promise<void>;
  unbind(): Promise<void>;
  containerId: string | null;
}

type TEvents = {
  create: { name: string },
  remove: { name: string },
}

const events = mitt<TEvents>();

export const addEventListener: typeof events['on'] = events.on.bind(events);
export const removeEventListener: typeof events['off'] = events.off.bind(events);

export type TBucketTransport = (backet: string, msg: string) => Promise<void> | void | null;

let transportRef: { transport: TBucketTransport } =  { transport: () => null }

export const registryTransport = (transport: TBucketTransport) => {
  transportRef.transport = transport;
}

const buckets = new Map<string, TBucket>();

export const createBucket = (name: string): TBucket => {
  if (buckets.has(name)) {
    throw new Error(`bucket with name is ${name} already exists`)
  }

  const send = async (msg: string) => {
    await transportRef.transport(name, msg);
  };

  let observerRef: { observer: (() => void) | null }  = { observer: null };

  const bucket: TBucket = {
    send,
    bind: async (containerId) => {
      bucket.containerId = containerId;
      observerRef.observer?.();
      const observer = await createDockerLogsObserver(containerId, send);
      observerRef.observer = observer;
    },
    unbind: async () => {
      observerRef.observer?.();
    },
    containerId: null,
  }

  buckets.set(name, bucket);
  events.emit('create', { name });

  return bucket;
}

export const getBucket = (name: string) => {
  if (!buckets.has(name)) {
    throw new Error(`bucket with name is ${name} not exists`)
  }

  return buckets.get(name);
}

export const removeBucket = (name: string) => {
  if (!buckets.has(name)) {
    throw new Error(`bucket with name is ${name} not exists`)
  }

  buckets.get(name)?.unbind();

  events.emit('remove', { name });

  buckets.delete(name);
}

export const getAllBuckets = (): (TBucket & { name: string })[] => {
  const bucketsNames = buckets.keys();
  const names = Array.from(bucketsNames);

  return names.map((name) => {
    return {
      name,
      ...buckets.get(name)!
    }
  });
}

export const hasBucket = (name: string) => buckets.has(name);
