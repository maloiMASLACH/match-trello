const patterns = {
  name: /^([0-9]|[a-z]|[A-Z]){4,15}$/,
  mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^([0-9]|[a-z]|[A-Z]){6,15}$/,
  blockName: /^(?!\s*$)[-'"№, 0-9а-яА-Яa-zA-Z]{1,15}$/,
};

export const checkPasswordInputs = (value: string) => {
  if (!patterns.password.test(value)) {
    if (value.length < 6 || value.length > 15) {
      return 'Use 6-15 symbols';
    }
    return 'Use numbers and letters only';
  }
  return '';
};

export const checkEmailInputs = (value: string) => {
  if (!patterns.mail.test(value)) {
    return 'Use correct e-mail';
  }
  return '';
};

export const checkUserNamedInputs = (value: string) => {
  if (!patterns.name.test(value)) {
    if (value.length < 4 || value.length > 15) {
      return 'Use 4-15 symbols';
    }
    return 'Use numbers and letters only';
  }
  return '';
};

export const checkBlockNameInputs = (value: string) => {
  if (!patterns.blockName.test(value)) {
    if (value.length < 1 || value.length > 15) {
      return 'Use 1-15 symbols';
    }
    return "Don't use special symbols";
  }
  return '';
};

export default patterns;
