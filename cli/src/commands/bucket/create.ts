import { Command } from "commander";
import { createBucket } from "../../services/bucket";

export const bucketCreateCmd = new Command('create')
  .description('create logs bucket')
  .argument('<name>')
  .action(async (name) => {
    await createBucket(name);
  });
