import { Command } from "commander";
import { createBucket } from "../../services/bucket";

export const createBucketCmd = new Command('bucket')
  .description('create logs bucket')
  .argument('<name>')
  .action(async (name) => {
    await createBucket(name);
  });
