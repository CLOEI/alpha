import { number, object, string } from "yup";

const add = object({
  name: string().required(),
  phone: string().required(),
  email: string(),
  birthday: string().required(),
  role: string().required(),
  companyId: number().required(),
  pcName: string().required(),
});

export { add };
