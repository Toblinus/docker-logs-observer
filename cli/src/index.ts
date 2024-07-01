import { Command } from 'commander';
import { version } from '../package.json';
import { createCmd } from './commands/create';
import { bucketCmd } from './commands/bucket';

const program = new Command()
  .name('docker-logs-observer')
  .description('CLI for docker-logs-observer')
  .version(version)
  .addCommand(createCmd)
  .addCommand(bucketCmd);

program.parse();
