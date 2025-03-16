const { body, validationResult } = require('express-validator')

const validateJob = [
    body('title')
        .notEmpty()
        .withMessage("job title is required")
        .isString()
        .withMessage('job title must be a string')
        .isLength({min: 3})
        .withMessage('title must be at least 3 characters long'),
    body('type')
        .notEmpty()
        .withMessage('job type is required')
        .isString()
        .withMessage('job type must be a string')
        .custom((value)=>["FULL TIME", "PART TIME", "INTERNSHIP", "VOLUNTEER", "REMOTE", "ONSITE"].includes(value.toUpperCase()))
        .withMessage('job type must be one of "full time", "part time", "internship", "volunteer", "remote", "onsite"'),
    body('salary')
        .isNumeric()
        .withMessage('Salary must be a numeric value')
        .custom(value => value > 0)
        .withMessage("Salary must be greater than 0"),
    body('description')
        .isString()
        .withMessage("description must be a string")
        .notEmpty() 
        .withMessage("Description should not be empty")
        .isLength({min: 3})
        .withMessage('description must be at least 3 characters long'),
    body('company')
        .notEmpty()
        .withMessage('company name must be specified')
        .isString()
        .withMessage('company name must be a string'),
    body('logo')
        .optional()
        .isURL()
        .withMessage('logo must be a valid URL'),
    body('isBookmarked')
        .optional()
        .isBoolean()
        .withMessage('isBookmarked must be a boolean'),
    body('location')
        .isString() 
        .withMessage('location must be a string value')
        .notEmpty()
        .withMessage('location must be specified'),
    body('experienceLevel')
        .notEmpty()
        .withMessage('Experience level is required')
        .isString()
        .withMessage('Experience level must be a string')
        .custom((value) => ['SENIOR', 'INTERMEDIATE', 'MID LEVEL', 'ENTRY LEVEL'].includes(value.toUpperCase())) 
        .withMessage('Experience level must be one of "Intermediate", "Mid level", "Entry level", or "Senior"'),
    body('currency')
        .notEmpty()
        .withMessage('Currency is required')
        .isString()
        .withMessage('Currency must be a string')
        .custom((value) => ['USD', 'EUR', 'GPR', 'INR', 'BIRR']
        .includes(value.toUpperCase()))
        .withMessage('Currency must be one of "USD", "EUR", or "INR"')
,

]

const handleJobValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next();
 }

 module.exports = { validateJob, handleJobValidationErrors }