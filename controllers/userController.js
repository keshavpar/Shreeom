const User = require('./../models/user');

const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const CustomError = require('./../utils/customError');

exports.signup = asyncErrorHandler( async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    });
})

exports.login = asyncErrorHandler( async (req, res, next) => {
    // 1. Check if user exists with gievn mail 

    // 2. match the passwords

    // 3. send jwt token

    // 4. Logged In

})