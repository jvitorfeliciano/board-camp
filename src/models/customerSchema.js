import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().required().trim(),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .required()
    .min(10)
    .max(11),
  cpf: joi
    .string()
    .pattern(/^[0-9]+$/)
    .required()
    .length(11),
  birthday: joi.date().required(),
});

export default customerSchema;
