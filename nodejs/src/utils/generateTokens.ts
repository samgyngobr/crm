
import jwt from "jsonwebtoken";
import { UserToken } from "../models/userToken.model";

const generateTokens = async (user) => {

    try
    {
        const payload = {
            _id       : user._id,
            roles     : user.roles,
            companyId : user.companyId,
        };

        const accessToken  = jwt.sign( payload, process.env.ACCESS_TOKEN_PRIVATE_KEY , { expiresIn: "15d" } ); // 14m
        const refreshToken = jwt.sign( payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "30d" } );

        const userToken = await UserToken.findOne({ userId: user._id });

        if (userToken)
            await userToken.remove();

        await new UserToken({
            userId : user._id,
            token  : refreshToken
        }).save();

        return Promise.resolve({ accessToken, refreshToken });
    }
    catch (err)
    {
        return Promise.reject(err);
    }

}; // const generateTokens = async (user) => {

export { generateTokens };
