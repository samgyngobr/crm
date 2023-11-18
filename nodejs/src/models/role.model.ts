import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type RoleDocument = Document & {
    name        : string;
    description : string | null;
};

// ##################################################################################

type RoleInput = {
    name        : RoleDocument['name'];
    description : RoleDocument['description'];
};

// ##################################################################################

const roleSchema = new Schema(
    {
        name : {
            type     : Schema.Types.String,
            required : true,
            unique   : true,
        },
        description : {
            type    : Schema.Types.String,
            default : null,
        },
    },
    {
        collection : 'roles',
        timestamps : true,
    },
);

const Role : Model<RoleDocument> = mongoose.model<RoleDocument>('Role', roleSchema);

// ##################################################################################

const createValidation = (body) => {

    const schema = Joi.object({
        name        : Joi.string().required().label("Name"),
        description : Joi.string().label("Description"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

export { Role, RoleInput, RoleDocument, createValidation };
