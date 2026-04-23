import Organization from "../../models/org.model.js";

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

    return {
      statusCode: 201,
      message: "Organization created successfully",
      org,
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
    const org = await Organization.find().sort({ createdAt: -1 });
    return {
      statusCode: 200,
      message: "Organization fetch successfully",
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

export const getOrganizationById = async (data) => {
  try {
    const org = await Organization.findById(data.params.id);

    if (!org) {
      return {
        statusCode: 404,
        message: "Org not found",
      };
    }
    return {
      statusCode: 200,
      message: "org fetch successfully",
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

export const updateOrganization = async (data) => {
  try {
    const { name, logo } = data.body;

    const org = await Organization.findByIdAndUpdate(
      data.params.id,
      { name, logo },
      { new: true },
    );
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
