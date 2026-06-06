import Organization from "../../models/org.model.js";
import { deleteCache, getCache, redisKeys, setCache } from "./cache.js";
import { getFileUrl } from "./file.utils.js";

export const createOrgUtils = async (data) => {
  try {
    const { name, domain, logo } = data;

    const existingOrg = await Organization.findOne({ domain });
    if (existingOrg) {
      return {
        statusCode: 400,
        message: "Domain already exists",
      };
    }
    const org = await Organization.create({ name, domain, logo });
    await deleteCache(redisKeys.organizations());
    const orgData = {
      ...org.toObject(),

      logo: getFileUrl(org.logo),
    };
    return {
      statusCode: 201,
      message: "Organization created successfully",
      org: orgData,
    };
  } catch (error) {
    console.log("error", error);

    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
};

export const getOrganization = async () => {
  try {
    const cacheKey = redisKeys.organizations();

    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return {
        statusCode: 200,
        message: "Organization fetch successfully",
        org: cachedData,
      };
    }
    const org = await Organization.find().sort({ createdAt: -1 });
    const formattedOrg = org.map((item) => ({
      ...item.toObject(),

      logo: getFileUrl(item.logo),
    }));

    await setCache(cacheKey, formattedOrg, 3600); // 1 hour

    return {
      statusCode: 200,
      message: "Organization fetch successfully",
      org: formattedOrg,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
};

export const getOrganizationById = async (data) => {
  try {
    const orgId = data.params.id;
    const cacheKey = redisKeys.organizationById(orgId);

    const cachedOrg = await getCache(cacheKey);

    if (cachedOrg) {
      return {
        statusCode: 200,
        message: "org fetch successfully",
        org: cachedOrg,
      };
    }
    const org = await Organization.findById(orgId);
    if (!org) {
      return {
        statusCode: 404,
        message: "Org not found",
      };
    }
    const formattedOrg = {
      ...org.toObject(),

      logo: getFileUrl(org.logo),
    };

    await setCache(cacheKey, formattedOrg, 3600);

    return {
      statusCode: 200,
      message: "org fetch successfully",
      org: formattedOrg,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
};

export const updateOrganization = async (data) => {
  try {
    const { name, logo } = data.body;

    const org = await Organization.findByIdAndUpdate(
      data.params.id,
      { name, logo },
      { new: true },
    );

    await deleteCache(redisKeys.organizationById(data.params.id));

    await deleteCache(redisKeys.organizations());
    const formattedOrg = {
      ...org.toObject(),

      logo: getFileUrl(org.logo),
    };
    if (!org) {
      return {
        statusCode: 404,
        message: "Org not found",
      };
    }
    return {
      statusCode: 200,
      message: "org updated successfully",
      org: formattedOrg,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
};

export const replaceOrganization = async (data) => {
  try {
    const org = await Organization.findByIdAndUpdate(
      data.params.id,
      data.body,
      {
        new: true,
        runValidators: true,
      },
    );
    await deleteCache(redisKeys.organizationById(data.params.id));

    await deleteCache(redisKeys.organizations());
    if (!org) {
      return {
        statusCode: 404,
        message: "Org not found",
      };
    }
    return {
      statusCode: 200,
      message: "org updated successfully",
      org,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
};

export const deleteOrganization = async (data) => {
  try {
    const org = await Organization.findByIdAndDelete(
      data.params.id,
      { isActive: false },
      { new: true },
    );
    await deleteCache(redisKeys.organizationById(data.params.id));

    await deleteCache(redisKeys.organizations());
    if (!org) {
      return {
        statusCode: 404,
        message: "Org not found",
      };
    }
    return {
      statusCode: 200,
      message: "org deleted successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll('"')],
    };
  }
};
