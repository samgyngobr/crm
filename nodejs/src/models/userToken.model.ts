import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type UserTokenDocument = Document & {
    userId : string;
    token  : string;
};

// ##################################################################################

type UserTokenInput = {
    userId : UserTokenDocument['userId'];
    token  : UserTokenDocument['token'];
};

// ##################################################################################

const userTokenSchema = new Schema(
    {
        userId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        token : {
            type     : String,
            required : true,
        },
        createdAt : {
            type    : Date,
            default : Date.now,
            expires : 30 * 86400, // 30 days
        },
    },
    {
        collection : 'userToken',
        timestamps : true,
    },
);

const UserToken : Model<UserTokenDocument> = mongoose.model<UserTokenDocument>('UserToken', userTokenSchema);

// ##################################################################################

export { UserToken, UserTokenInput, UserTokenDocument };
