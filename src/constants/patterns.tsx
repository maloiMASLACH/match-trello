const patterns = {
  name: /^([a-z]|[A-Z]){6,15}$/,
  mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^([0-9]|[a-z]|[A-Z]){6,15}$/,
};

export default patterns;