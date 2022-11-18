// List of validations
const Validations = {
  REQUIRED: {
    required: {
      value: true,
      message: 'This field is required.',
    },
  },
  REQUIRED_SHORT_MSG: {
    required: {
      value: true,
      message: 'Required.',
    },
  },
  REQUIRED_EMAIL: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter a valid email address.',
    },
  },
  // REQUIRED_CONTACT: {
  //   required: {
  //     value: true,
  //     message: 'This field is required.',
  //   },
  //   pattern: {
  //     value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
  //     message: 'Please enter a number.',
  //   },
  // },
};

export default Validations;

export const MaxLengthValidationFunc = (value) => ({
  maxLength: {
    value,
    message: `Please enter the value must be less than or equal to ${value} characters.`,
  },
});
