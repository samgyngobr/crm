import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from '../controllers/role.controller';

const roleRoute = () => {

    const router = Router();

    router.post(  '/roles'     , auth , createRole  );
    router.get(   '/roles'     , auth , getAllRoles );
    router.get(   '/roles/:id' , auth , getRole     );
    router.put(   '/roles/:id' , auth , updateRole  );
    router.delete('/roles/:id' , auth , deleteRole  );

    return router;
};

export { roleRoute };
