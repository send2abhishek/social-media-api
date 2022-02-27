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
    title: Joi.string().min(2),
    content: Joi.string().min(2).max(3000),
    userId: Joi.number().min(1),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

const validateCreateComment = (req, res, next) => {
  if (checkBody(req.body)) {
    res.status(400).json({
      error: "empty body",
    });
    return;
  }

  const schema = Joi.object({
    comment: Joi.string().min(3),
    postId: Joi.number().min(1).max(8),
    userId: Joi.number().min(1).max(8),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

const validateCreateLike = (req, res, next) => {
  if (checkBody(req.body)) {
    res.status(400).json({
      error: "empty body",
    });
    return;
  }

  const schema = Joi.object({
    postId: Joi.number().min(1).max(8),
    userId: Joi.number().min(1).max(8),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

const validatePostId = (req, res, next) => {
  if (!req.params.postId) {
    res.status(400).json({
      error: "postId is missing as params in request",
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
  validateCreateComment,
  validateCreateLike,
  validatePostId,
};
