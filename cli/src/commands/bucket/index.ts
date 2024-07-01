import { Command } from "commander";
import { bucketCreateCmd } from "./create";
import { bucketDeleteCmd } from "./delete";
import { bucketListCmd } from "./list";
import { bucketSendMessageCmd } from "./send-msg";
import { buckeBindCmd } from "./bind";
import { bucketUnbindCmd } from "./unbind";

export const bucketCmd = new Command('bucket')
  .description('control bucket')
  .addCommand(bucketCreateCmd)
  .addCommand(bucketDeleteCmd)
  .addCommand(bucketListCmd)
  .addCommand(bucketSendMessageCmd)
  .addCommand(buckeBindCmd)
  .addCommand(bucketUnbindCmd);
