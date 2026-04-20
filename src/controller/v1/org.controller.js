import {
  createOrgUtils,
  deleteOrganization,
  getOrganization,
  getOrganizationById,
  replaceOrganization,
  updateOrganization,
} from "../../utils/v1/org.utils.js";

export const createOrgController = async (req, res) => {
  try {
    const { statusCode, ...response } = await createOrgUtils(req.body);

    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: [error.message.replaceAll('"')],
    });
  }
};

export const getOrgController = async (req, res) => {
  try {
    const { statusCode, ...response } = await getOrganization(req.body);

    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: [error.message.replaceAll('"')],
    });
  }
};

export const getOrgByid = async (req, res) => {
  try {
    const { statusCode, ...response } = await getOrganizationById(req);

    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: [error.message.replaceAll('"')],
    });
  }
};

export const updateOrganizationController = async (req, res) => {
  try {
    const { statusCode, ...response } = await updateOrganization(req);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: [error.message.replaceAll('"')],
    });
  }
};

export const replaceOrgController = async (req, res) => {
  try {
    const { statusCode, ...response } = await replaceOrganization(req);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: [error.message.replaceAll('"')],
    });
  }
};

export const deleteOrgController = async (req, res) => {
  try {
    const { statusCode, ...response } = await deleteOrganization(req);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: [error.message.replaceAll('"')],
    });
  }
};
