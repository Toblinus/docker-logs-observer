import { Command } from "commander";
import { createBucketCmd } from "./bucket";

export const createCmd = new Command('create')
  .description('create resource')
  .addCommand(createBucketCmd);
