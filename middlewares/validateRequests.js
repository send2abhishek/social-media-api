const Joi = require("joi");
const { isEmpty } = require("../utils/");

const validateCreatePost = (req, res, next) => {
  if (checkBody(req.body)) {
    res.status(400).json({
      error: "empty body",
    });
    return;
  }

  const schema = Joi.object({
    title: Joi.string().min(5),
    content: Joi.string().min(5).max(3000),
    userId: Joi.number().min(1).max(8),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

function checkBody(payload) {
  return payload && isEmpty(payload);
}

module.exports = {
  validateCreatePost,
};
