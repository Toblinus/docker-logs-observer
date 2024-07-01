import { Command } from "commander";
import { bindBucket } from "../../services/bucket";

export const bucketUnbindCmd = new Command('unbind')
  .description('bind logs bucket to docket container')
  .argument('<name>')
  .action(async (name, msg) => {
    await bindBucket(name, msg);
  });
