import { object, string } from "yup";

const login = object({
  username: string().required(),
  password: string().required(),
});

const register = object({
  username: string().required(),
  password: string().required(),
  role: string(),
});

export { login, register };
