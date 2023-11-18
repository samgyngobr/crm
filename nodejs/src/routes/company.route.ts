import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createCompany, deleteCompany, getAllCompany, getCompany, updateCompany } from '../controllers/company.controller';

const companyRoute = () => {

    const router = Router();

    router.post(  '/company'     , auth , createCompany );
    router.get(   '/company'     , auth , getAllCompany );
    router.get(   '/company/:id' , auth , getCompany    );
    router.put(   '/company/:id' , auth , updateCompany );
    router.delete('/company/:id' , auth , deleteCompany );

    return router;
};

export { companyRoute };
