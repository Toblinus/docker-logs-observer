import { send } from "../utils/socket"

export const createBucket = async (name: string) => {
  return await send('bucket-create', [name]);
}

export const removeBucket = async (name: string) => {
  return await send('bucket-delete', [name]);
}

export const getBucketsList = async () => {
  return await send('bucket-list');
}

export const sendMsgToBucket = async (name: string, msg: string) => {
  return await send('bucket-send', [name, msg]);
}

export const bindBucket = async (name: string, containerId: string) => {
  return await send('bucket-bind', [name, containerId]);
}

export const unbindBucket = async (name: string) => {
  return await send('bucket-unbind', [name]);
}
