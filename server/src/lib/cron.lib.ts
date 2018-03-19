import { CronJob } from 'cron';
import { logger } from 'lib/winston.lib';
import { newGuid } from 'lib/guid.lib';

class Cron {
  private runningJobs: Map<string, CronJob> = new Map<string, CronJob>();

  startJob(timePattern: string, toExecute: () => Promise<void>, name = newGuid()) {
    this.runningJobs.set(name, new CronJob(timePattern, () => {
      logger.info(`Executing cronjob: ${name}`)
      toExecute().catch(err => {
          logger.error(`Error while executing cronjob: ${name}`);
          logger.error(err);
        });
    }, null, true, 'America/Los_Angeles'));

    return name;
  }

  stopJob(name: string): boolean {
    if (!this.runningJobs.has(name)) return;

    let toStop = this.runningJobs.get(name);
    toStop.stop();

    return this.runningJobs.delete(name);
  }
}

export const cronjobber = new Cron();