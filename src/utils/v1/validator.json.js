export const orgUserValidation = {
  name: {
    mandatory: true,
    type: "string",
    minLength: 3,
    minLengthError: "First name must have minimum 3 characters.",
    allowNull: false,
  },
  domain: {
    mandatory: true,
    type: "url",
    allowNull: false,
  },
  logo: {
    type: "string",
    allowNull: false,
  },
};
