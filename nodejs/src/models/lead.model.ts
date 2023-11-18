import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type LeadDocument = Document & {
    companyId    : string;
    teamId       : string;
    unityId      : string;
    leadStatusId : string;
    enabled      : boolean;
    interactions : any[];
};

// ##################################################################################

type LeadInput = {
    companyId    : LeadDocument['companyId'];
    teamId       : LeadDocument['teamId'];
    unityId      : LeadDocument['unityId'];
    leadStatusId : LeadDocument['leadStatusId'];
    enabled      : LeadDocument['enabled'];
    interactions : LeadDocument['interactions'];
};

// ##################################################################################

const leadSchema = new Schema(
    {
        companyId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        teamId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        unityId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        leadStatusId : {
            type     : Schema.Types.ObjectId,
            required : true,
        },
        enabled: {
            type     : Schema.Types.Boolean,
            default  : true,
            required : true,
        },
        interactions : {
            type : [{
                createdAt        : Schema.Types.Date,
                UserId           : Schema.Types.ObjectId,
                type             : Schema.Types.String,
                content          : Schema.Types.String,
                integration_hash : Schema.Types.String,
                schedule         : Schema.Types.Date,
                grade            : Schema.Types.Number,
                value            : Schema.Types.String,
                image            : Schema.Types.String,
            }],
        },
    },
    {
        collection : 'leads',
        timestamps : true,
    },
);

const Lead : Model<LeadDocument> = mongoose.model<LeadDocument>('Lead', leadSchema);

// ##################################################################################

const createValidation = (body) => {

    const schema = Joi.object({
        companyId    : Joi.string().required().label("Company"),
        teamId       : Joi.string().required().label("Team"),
        unityId      : Joi.string().required().label("Unity"),
        leadStatusId : Joi.string().required().label("Status"),
        interactions : Joi.array().items({
            UserId  : Joi.string().required().label("UserId"),
            type    : Joi.string().required().label("type"),
            content : Joi.string().required().label("content"),
            value   : Joi.string().label("value")
        })
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

const updateValidation = (body) => {

    const schema = Joi.object({
        companyId    : Joi.string().required().label("Company"),
        teamId       : Joi.string().required().label("Team"),
        unityId      : Joi.string().required().label("Unity"),
        leadStatusId : Joi.string().required().label("Status"),
    });

    return schema.validate(body, { messages });
};

// ##################################################################################

export { Lead, LeadInput, LeadDocument, createValidation, updateValidation };
