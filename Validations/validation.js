const { check } = require("express-validator")
const ContactValidation = [
    check('email').isEmail(),
    check("name", "name is required").notEmpty(),
    check("orgname", "Organisation Name is required").notEmpty(),
    check("subject", "subject is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("description", "description is required").notEmpty(),
    check("name", "name should be greater than 2 charaters").isLength({ min: 2 }),
    check("orgname", "Organisation Name should be greater than 2 charaters").isLength({ min: 2 }),
    check("subject", "subject should be greater than 2 charaters").isLength({ min: 2 }),
    check("description", "description should be greater than 6 charaters").isLength({ min: 2 }),
    check("name", "name should be atmost 50 charaters long").isLength({ max: 50 })


]

const OrganizationValidation = [
    check("name", "name is required").notEmpty(),
    check("name", "name should be greater than 2 charaters").isLength({ min: 2 }),
    check("name", "name should be atmost 50 charaters long").isLength({ max: 50 })


]
module.exports = { ContactValidation,OrganizationValidation }
