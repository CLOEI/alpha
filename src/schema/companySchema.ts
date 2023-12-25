import { object, string } from "yup";

const add = object({
  name: string().required(),
  owner: string().required(),
  streetName: string().required(),
  coordinate: string().required(),
});

export { add };
