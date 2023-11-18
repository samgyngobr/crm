import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type UserDocument = Document & {
    companyId : string;
    name      : string;
    email     : string;
    password  : string;
    enabled   : boolean;
    role      : string;
};

// ##################################################################################

type UserInput = {
    companyId : UserDocument['companyId'];
    name      : UserDocument['name'];
    email     : UserDocument['email'];
    password  : UserDocument['password'];
    enabled   : UserDocument['enabled'];
    role      : UserDocument['role'];
};

// ##################################################################################

const usersSchema = new Schema(
    {
        companyId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        name: {
            type     : Schema.Types.String,
            required : true,
        },
        email: {
            type     : Schema.Types.String,
            required : true,
            unique   : true,
        },
        password: {
            type     : Schema.Types.String,
            required : true,
        },
        enabled: {
            type     : Schema.Types.Boolean,
            default  : true,
            required : true,
        },
        role: {
            type     : Schema.Types.ObjectId,
            ref      : 'Role',
            required : true,
            index    : true,
        },
    },
    {
        collection : 'users',
        timestamps : true,
    },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

// ##################################################################################

const createValidation = (body) => {

    const schema = Joi.object({
        companyId : Joi.string().required().label("Company"),
        name      : Joi.string().required().label("User Name"),
        email     : Joi.string().email().required().label("Email"),
        enabled   : Joi.boolean().required().label("Enabled"),
        role      : Joi.string().required().label("Role"),
        password  : passwordComplexity().required().label("Password"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

const updateValidation = (body) => {

    const schema = Joi.object({
        name    : Joi.string().required().label("User Name"),
        role    : Joi.string().required().label("Role"),
        enabled : Joi.boolean().required().label("Enabled"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################


const loginValidation = (body) => {

    const schema = Joi.object({
        email    : Joi.string().email().required().label("Email"),
        password : Joi.string().required().label("Password"),
    });

    return schema.validate(body, { messages });
}

// ##################################################################################

export { User, UserInput, UserDocument, createValidation, updateValidation, loginValidation };
