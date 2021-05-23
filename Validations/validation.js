const { check } = require("express-validator")
const ContactValidation = [
    check('email').isEmail(),
    check("name", "name is required").notEmpty(),
    check("orgname", "Organisation Name is required").notEmpty(),
    check("subject", "subject is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("description", "description is required").notEmpty(),
    check("name", "name should be atmost 50 charaters long").isLength({ max: 50 })


]
const LoginValidator = [
    check("password", "password is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("email", "Invalid email address").isEmail(),
]

const OrganizationValidation = [
    check("name", "name is required").notEmpty(),
    check("name", "name should be atmost 50 charaters long").isLength({ max: 50 })


]

const OrgContactValidation = [
    check("name", "name is required").notEmpty(),
    check("OrgID", "OrganizationID is required").notEmpty(),
    check("description", "description is required").notEmpty(),
    check("name", "name should be atmost 50 charaters long").isLength({ max: 50 }),
    check('email').isEmail(),
    check("email", "email is required").notEmpty(),

]

const RegisterValidator = [
    check("name", "Name is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("email", "Invalid email address").isEmail(),
    check("password", "password is required").notEmpty(),

]
module.exports = { ContactValidation, OrganizationValidation, OrgContactValidation, LoginValidator, RegisterValidator }
