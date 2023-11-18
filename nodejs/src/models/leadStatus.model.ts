import mongoose, { Schema, Model, Document } from 'mongoose';
import Joi from "joi";
import { messages } from 'joi-translation-pt-br';

// ##################################################################################

type LeadStatusDocument = Document & {
    companyId : string;
    title     : string;
    enabled   : boolean;
};

// ##################################################################################

type LeadStatusInput = {
    companyId : LeadStatusDocument['companyId'];
    title     : LeadStatusDocument['title'];
    enabled   : LeadStatusDocument['enabled'];
};

// ##################################################################################

const leadStatusSchema = new Schema(
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
        collection : 'leadStatus',
        timestamps : true,
    },
);

const LeadStatus : Model<LeadStatusDocument> = mongoose.model<LeadStatusDocument>('LeadStatus', leadStatusSchema);

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

export { LeadStatus, LeadStatusInput, LeadStatusDocument, createValidation, updateValidation };
