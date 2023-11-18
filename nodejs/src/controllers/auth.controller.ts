import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import { generateTokens } from '../utils/generateTokens';

import { User, loginValidation } from '../models/user.model';


// ##################################################################################################################


const login = async (req: Request, res: Response) => {

    try
    {
        // validate form
        const { error } = loginValidation(req.body);

        if( error )
            throw Error( error.details[0].message );

        // user exists?
        const user = await User.findOne({
            email   : req.body.email,
            enabled : true
        });

        if (!user)
            throw Error( "Invalid email or password" );

        // validate password
        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!verifiedPassword)
            throw Error( "Invalid email or password" );

        // generate tokens
        const { accessToken, refreshToken } = await generateTokens(user);

        return res.status(200).json({
            message : "Logged in sucessfully",
            user    : {
                name         : user.name,
                email        : user.email,
                roles        : user.role,
                accessToken  : accessToken,
                refreshToken : refreshToken,
                image        : "/assets/img/damir-bosnjak.jpg",
            }
        });
    }
    catch( err : any )
    {
        return res.status(422).json({
            error   : true,
            message : err.message || err
        });
    }
};


// ##################################################################################################################


export { login };
