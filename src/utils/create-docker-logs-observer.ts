import spawn from "cross-spawn";

export const createDockerLogsObserver = async (
  containerId: string,
  cb: (log: string) => void
): Promise<() => void> => {
  const dataHandler = (chunk: Buffer) => {
    const output = Buffer.from(chunk).toString();
    const lines = output.split(/[\n\r]+/);
    lines.forEach((line) => {
      if (line) {
        cb(line);
      }
    });
  };

  return new Promise((resolve, reject) => {
    try {
      const child = spawn("docker", ["logs", "--follow", containerId]);
      child.addListener("spawn", () => {
        if (!child.stdout) {
          reject();
          child.kill();
          return;
        }

        child.stdout.addListener("data", dataHandler);

        resolve(() => {
          child.stdout?.removeListener("data", dataHandler);
          child.kill();
        });
      });

      child.addListener("error", () => {
        reject();
      });
    } catch (e) {
      reject(e);
    }
  });
};
