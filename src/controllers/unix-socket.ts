import net from "node:net";
import fs from "node:fs";
import { createBucket, getAllBuckets, getBucket, removeBucket } from "../services/buckets";

const SOCK_NAME = "/var/run/ldld.sock";

const cleanSocket = () => {
  if (fs.existsSync(SOCK_NAME)) {
    fs.unlinkSync(SOCK_NAME);
  }
};

const exitHandler = () => {
  cleanSocket();
  process.exit();
};

process.stdin.resume();

// do something when app is closing
process.addListener("exit", exitHandler);

// catches ctrl+c event
process.addListener("SIGINT", exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler);
process.on("SIGUSR2", exitHandler);

// catches uncaught exceptions
process.on("uncaughtException", (error, origin) => {
  console.error({ error, origin });
  exitHandler();
});

const unixServer = net.createServer((socket) => {
  socket.addListener("data", (chank) => {
    const data = Buffer.from(chank).toString();
    const result = data.match(/^(?<cmd>[\w-]+)(?::(?<args>(?:.+,?)*))?$/);
    if (!result || !result.groups) {
      return;
    }

    const { groups: {
      cmd,
      args = ''
    } } = result;

    const params = args?.split(',') || [];

    try {
      switch(cmd) {
        case 'bucket-create':
          if (params[0]) {
            createBucket(params[0]);
          }
          return;

        case 'bucket-delete':
          if (params[0]) {
            removeBucket(params[0]);
          }
          return;

        case 'bucket-list':
          console.log(getAllBuckets());
          return;

        case 'bucket-send':
          if (params[0] && params[1]) {
            const bucket = getBucket(params[0]);
            if (bucket) {
              bucket.send(params[1]);
            }
          }
          return;


        case 'bucket-bind':
          if (params[0] && params[1]) {
            const bucket = getBucket(params[0]);
            if (bucket) {
              bucket.bind(params[1]);
            }
          }
          return;

        case 'bucket-unbind':
          if (params[0]) {
            const bucket = getBucket(params[0]);
            if (bucket) {
              bucket.unbind();
            }
          }
          return;
        
        default:
          console.log(`cmd not found: ${cmd}, params: ${params}`);
      }
    } catch (e) {
      console.error(e);
    }
  });
});

export const startUnixSocket = () => {
  cleanSocket();
  unixServer.listen(SOCK_NAME);
}