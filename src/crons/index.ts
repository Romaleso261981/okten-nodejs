import { removeOldTokensCronJob } from "./remove-old-tokens.cron";
import { sendEmailToInactiveUsersCronJob } from "./sendEmailToInactiveUsersCronJob ";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  sendEmailToInactiveUsersCronJob.start();
};
