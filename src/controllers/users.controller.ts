import { Request, Response } from "express";
import usersService from "~/services/users.services";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterReqBody } from "~/models/requests/User.requests";

export const loginController = (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (email === 'manh@gmail.com' && password === '123456') {
        res.status(200).json({
            message: 'Login success'
        })
    } else {
        res.status(400).json({
            error: 'login error'
        })
    }

}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {

    try {
        const result = await usersService.register(req.body)

        res.json({
            message: 'Register success',
            result
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: 'Register failed'
        })
    }
}
