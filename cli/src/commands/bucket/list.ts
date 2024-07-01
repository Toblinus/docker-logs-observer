import { Command } from "commander";
import { getBucketsList } from "../../services/bucket";

export const bucketListCmd = new Command('list')
  .description('get logs buckets list')
  .action(async () => {
    await getBucketsList();
  });
