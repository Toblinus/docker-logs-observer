import { Command } from "commander";
import { bindBucket } from "../../services/bucket";

export const buckeBindCmd = new Command('bind')
  .description('bind logs bucket to docket container')
  .argument('<name>')
  .argument('<container-id>')
  .action(async (name, msg) => {
    await bindBucket(name, msg);
  });
