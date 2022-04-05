const patterns = {
  name: /^([0-9]|[a-z]|[A-Z]){4,15}$/,
  mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^([0-9]|[a-z]|[A-Z]){6,15}$/,
  blockName: /^(?!\s*$)[-'"№, 0-9а-яА-Яa-zA-Z]{1,15}$/,
};

export const validatePassword = (value: string) => {
  if (!patterns.password.test(value)) {
    if (value.length < 6 || value.length > 15) {
      return 'Use 6-15 symbols';
    }
    return 'Use numbers and letters only';
  }
  return '';
};

export const validateEmail = (value: string) => {
  if (!patterns.mail.test(value)) {
    return 'Use correct e-mail';
  }
  return '';
};

export const validateUserName = (value: string) => {
  if (!patterns.name.test(value)) {
    if (value.length < 4 || value.length > 15) {
      return 'Use 4-15 symbols';
    }
    return 'Use numbers and letters only';
  }
  return '';
};

export const validateBlockName = (value: string) => {
  if (!patterns.blockName.test(value)) {
    if (value.length < 1 || value.length > 15) {
      return 'Use 1-15 symbols';
    }
    return "Don't use special symbols";
  }
  return '';
};

export const validateDescription = (value: string) => {
  if (value.length > 120) {
    return 'Use less then 120 symbols';
  } return '';
};

export default patterns;
