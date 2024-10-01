/* eslint-disable no-console */
import { CronJob } from "cron";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const date30DaysAgo = timeHelper.subtractByParams(5, "m");

    const users = await userRepository.findUsersNotLoggedInSince(date30DaysAgo);

    for (const user of users) {
      await emailService.sendMail(EmailTypeEnum.LOG_OUT, user.email, {
        name: user.name,
      });
    }

    console.log(
      `Sent emails to ${users.length} users who haven't logged in for more than 30 days.`,
    );
  } catch (error) {
    console.error(error);
  }
};

export const sendEmailToInactiveUsersCronJob = new CronJob(
  "10 * * * * *",
  handler,
);
