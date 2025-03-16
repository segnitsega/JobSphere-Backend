const { body, validationResult } = require('express-validator')

const validateUser = [
    body('firstName')
        .notEmpty().withMessage("user's first name required")
        .isString().withMessage("user's first name must be a string"),
    body('lastName')
        .notEmpty().withMessage("user's last name required")
        .isString().withMessage("user's last name must be a string"),
    body('email')
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[\W]/).withMessage("Password must contain at least one special character"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
        }
]
module.exports = validateUser
