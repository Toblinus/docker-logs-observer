import { Command } from "commander";
import { sendMsgToBucket } from "../../services/bucket";

export const bucketSendMessageCmd = new Command('send')
  .description('send message to logs bucket')
  .argument('<target-bucket>')
  .argument('<message>')
  .action(async (name, msg) => {
    await sendMsgToBucket(name, msg);
  });
