import { sendEmailToInactiveUsersCronJob } from "./sendEmailToInactiveUsersCronJob ";

export const cronRunner = () => {
  sendEmailToInactiveUsersCronJob.start();
};
