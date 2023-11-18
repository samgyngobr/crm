import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type UnityDocument = Document & {
    companyId : string;
    title     : string;
    enabled   : boolean;
};

// ##################################################################################

type UnityInput = {
    companyId : UnityDocument['companyId'];
    title     : UnityDocument['title'];
    enabled   : UnityDocument['enabled'];
};

// ##################################################################################

const unitySchema = new Schema(
    {
        companyId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        title: {
            type     : Schema.Types.String,
            required : true,
        },
        enabled: {
            type     : Schema.Types.Boolean,
            default  : true,
            required : true,
        },
    },
    {
        collection : 'unity',
        timestamps : true,
    },
);

const Unity: Model<UnityDocument> = mongoose.model<UnityDocument>('Unity', unitySchema);

// ##################################################################################

const createValidation = (body) => {

    const schema = Joi.object({
        companyId : Joi.string().required().label("Company"),
        title     : Joi.string().required().label("Title"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

const updateValidation = (body) => {

    const schema = Joi.object({
        title   : Joi.string().required().label("Title"),
        enabled : Joi.boolean().required().label("Enabled"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

export { Unity, UnityInput, UnityDocument, createValidation, updateValidation };
