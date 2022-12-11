import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().required().trim(),
});

export default categorySchema;
