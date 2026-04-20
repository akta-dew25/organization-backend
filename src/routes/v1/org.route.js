import express from "express";
import {
  createOrgController,
  deleteOrgController,
  getOrgByid,
  getOrgController,
  replaceOrgController,
  updateOrganizationController,
} from "../../controller/v1/org.controller.js";
import { validatePayload } from "../../middleware/validator.js";
import { orgUserValidation } from "../../utils/v1/validator.json.js";

const orgRouter = express.Router();

orgRouter.post(
  "/",
  validatePayload({ rule: orgUserValidation }),
  createOrgController,
);
orgRouter.get("/", getOrgController);
orgRouter.get("/:id", getOrgByid);
orgRouter.patch("/:id", updateOrganizationController);
orgRouter.put(
  "/:id",
  validatePayload({ rule: orgUserValidation }),
  replaceOrgController,
);
orgRouter.delete("/:id", deleteOrgController);

export default orgRouter;
