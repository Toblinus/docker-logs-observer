import net from 'node:net';

const SOCK_NAME = "/var/run/ldld.sock";

let socketOrPromise: net.Socket | Promise<net.Socket> | null = null;

export const getSocket = async (): Promise<net.Socket> => {
  if (socketOrPromise) {
    return socketOrPromise;
  }

  socketOrPromise = new Promise((resolve, reject) => {
    try {
      const socket = net.createConnection(SOCK_NAME)
      socketOrPromise = socket;
      socket.addListener('connect', () => {  
        resolve(socket);
      });
    } catch (e) {
      reject(e);
    }
  });

  return socketOrPromise;
}

export const send = async (cmd: string, params?: string[]) => {
  const socket = await getSocket();
  
  if (params && Array.isArray(params)) {
    socket.write(`${cmd}:${params.join(',')}`);
  } else {
    socket.write(cmd);
  }

  socket.end();
}