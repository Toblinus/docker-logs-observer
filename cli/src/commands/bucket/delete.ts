import { Command } from "commander";
import { removeBucket } from "../../services/bucket";

export const bucketDeleteCmd = new Command('delete')
  .description('delete logs bucket')
  .argument('<name>')
  .action(async (name) => {
    await removeBucket(name);
  });
