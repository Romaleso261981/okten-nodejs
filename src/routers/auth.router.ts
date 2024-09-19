import { Router } from "express";

import { authController } from "../controllers/auth.controller";
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

router.post("/refresh", authController.refreshToken);

export const authRouter = router;
