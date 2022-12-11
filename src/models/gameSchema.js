import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().required().trim(),
  image: joi.string().dataUri().required().trim(),
  stockTotal: joi.number().required().greater(0),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required().greater(0),
});

export default gameSchema;
