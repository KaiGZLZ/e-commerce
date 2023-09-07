const {check, body, validationResult, ExpressValidator } = require("express-validator");
const { validateUsername, validatePassword,  } = require("./commonValidations");

module.exports = {

    taskRegisterValidation: [
        check('task.title')
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage('The title can not be empty!')
            .bail()
        ,
        check('task.responsible')
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage('The responsible can not be empty!')
            .bail()
        ,
        check('task.priority')
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage('The priority can not be empty!')
            .bail()
        ,
            
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(422).json({message: errors.array()[0].msg});
          next();
        },
    ],
}

  