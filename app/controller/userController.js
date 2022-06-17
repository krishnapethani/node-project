const db = require('../middleware/db');
const users = db.userModel;
const bcrypt = require('bcrypt');
const logger = require('../helper/logging');
const { GeneralResponse } = require("../utils/responce");
const { GeneralError } = require("../utils/error");
const config = require('../utils/config');
const saltRounds = 10;
exports.signup = async (req, res, next) => {
    try {
        console.log(req.body);
        const findUser = await users.findOne({ where: { email: req.body.email } });
        if (!findUser) {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: encryptedPassword,
                profile: req.file.filename,
                gender: req.body.gender,
            }
            const registerUser = await users.create(user);
            if (registerUser) {
                await next(
                    new GeneralResponse(
                        req.body.name + " successfully register",
                        undefined,
                        config.HTTP_CREATED
                    )
                );
            } else {
                res.send('Something wont Worg')
            }
        } else {
            await next(
                new GeneralError(
                    "User email already exist",
                    undefined
                )
            );
        }
    }
    catch (err) {
        console.log(err);
    }

}
exports.logging = async (req, res, next) => {
    const findUser = await users.findOne({ where: { email: req.body.email } });
    if (!findUser) {
        await next(
            new GeneralError(
                "User not Found",
                undefined
            )
        );
    }
    const comparePassword = await bcrypt.compare(req.body.password, findUser.password);
    if (comparePassword) {
        await next(
            new GeneralResponse(
                findUser.email + " successfully logging",
                undefined,
                config.HTTP_CREATED
            )
        );
    }
    else {
        await next(
            new GeneralError(
                "Email or Password Was Incorrect",
                undefined
            )
        );
    }

}
exports.viewProfile = async (req, res, next) => {
    const email = req.user.email;
    try {
        const user = await users.findOne({ where: { email } });
        if (user) {
            res.send(user);
        } else {
            await next(
                new GeneralError(
                    "view profile is not showing!",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    } catch (err) {
        logger.error("err", err);
        next(new GeneralError("failed to show view profile!"));
    }
}
exports.updateProfile = async (req, res, next) => {
    try {
        const email = req.user.email;
        const findUser = await users.findOne({ where: { email: email } });
        if (findUser) {
            const updateUser = {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
            }
            if (req.file) {
                updateUser.profile
                    = req.file.filename
            }
            const updatedUser = await users.update(updateUser, {
                where: { email: email }
            });
            if (updatedUser) {
                await next(
                    new GeneralResponse(
                        "User Updated...",
                        undefined,
                        config.HTTP_CREATED
                    )
                );
            }
        } else {
            await next(
                new GeneralError(
                    "User not found!",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    }
    catch (err) {
        logger.error("err", err);
        next(new GeneralError("failed to update user details!"));
    }
};
exports.resetPassword = async (req, res, next) => {
    try {
        const email = req.user.email;
        const user = await users.findOne({ where: { email } });
        if (user) {
            const compare = await bcrypt.compare(req.body.current_password, user.password);
            if (compare) {
                const updatePassword = { password: await bcrypt.hash(req.body.password, saltRounds) };
                const updateUser = await users.update(updatePassword, { where: { email: email } });
                if (updateUser) {
                    await next(
                        new GeneralResponse(
                            "Your Password has been Reset...",
                            undefined,
                            config.HTTP_CREATED
                        )
                    );
                } else {
                    await next(
                        new GeneralError(
                            "Your Password has not been Reset!",
                            undefined,
                            config.HTTP_ACCEPTED
                        )
                    );
                }
            } else {
                await next(
                    new GeneralError(
                        "Current Password is incorrect!",
                        undefined,
                        config.HTTP_ACCEPTED
                    )
                );
            }
        }
    }
    catch (err) {
        logger.error("err", err);
        next(new GeneralError("failed to reset password!"));
    }
};