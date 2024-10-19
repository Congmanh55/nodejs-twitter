import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import databaseService from "~/services/database.service";
import usersService from "~/services/users.services";
import { validate } from "~/utils/validation";

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'email and password are required' });
    }

    next();
};

export const registerValidator = validate(checkSchema({
    name: {
        notEmpty: true,//khong duoc trống
        isString: true,
        isLength: {
            options: {
                min: 1,
                max: 100
            }
        },
        trim: true,
    },
    email: {
        isEmail: true,
        notEmpty: true,
        trim: true,
        custom: {
            options: async (value) => {
                const isExistEmail = await usersService.checkEmailExist(value);
                if (isExistEmail) {
                    throw new Error("Email already exists")
                }
                return isExistEmail;
            }
        }
    },
    password: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                min: 6,
                max: 50,
            }
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
            errorMessage: 'Password 6 ',
        }
    },
    confirm_password: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                min: 6,
                max: 50,
            }
        },
        isStrongPassword: {
            errorMessage: 'Password 6 ',
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password comfirmation does not match password')
                }
                return true;
            }
        }
    },
    date_of_birth: {
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true,
            }
        }
    }

}))
