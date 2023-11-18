import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createUser, deleteUser, getAllUsers, getUser, updateUser, getUserNew } from '../controllers/user.controller';

const userRoute = () => {

    const router = Router();

    router.post(  '/users'     , auth , createUser  );
    router.get(   '/users'     , auth , getAllUsers );
    router.get(   '/users/new' , auth , getUserNew  );
    router.get(   '/users/:id' , auth , getUser     );
    router.put(   '/users/:id' , auth , updateUser  );
    router.delete('/users/:id' , auth , deleteUser  );

    return router;
};

export { userRoute };
