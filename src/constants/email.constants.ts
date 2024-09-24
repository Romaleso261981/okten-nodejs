import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstants = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome to our platform",
    template: "welcome",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Forgot password",
    template: "forgot-password",
  },
  [EmailTypeEnum.OLD_VISIT]: {
    subject: "Old visit",
    template: "old-visit",
  },
  [EmailTypeEnum.LOG_OUT]: {
    subject: "Log out",
    template: "log-out",
  },
};
