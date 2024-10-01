import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userValidation } from "../middlewares/validations/user.validation";

const router = Router();

router.post(
  "/signup",
  userValidation.validationSignUpUser(),
  authController.signUp,
);

router.post(
  "/signin",
  userValidation.validationSignInUser(),
  authController.signIn,
);

router.post("/logout", authController.logOut);

router.post("/refresh", authController.refreshToken);

router.post("/forgot-password", authController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);

router.post(
  "/change-password",
  authMiddleware.checkAccessToken,
  // commonMiddleware.isBodyValid(UserValidator.changePassword),
  authController.changePassword,
);

router.put(
  "/verify",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
  authController.verify,
);

export const authRouter = router;
