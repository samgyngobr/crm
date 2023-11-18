import { Router } from 'express';
import { auth } from "../middleware/auth";
import { createUnity, deleteUnity, getAllUnities, getUnity, updateUnity } from '../controllers/unity.controller';

const unityRoute = () => {

    const router = Router();

    router.post(  '/unity'     , auth , createUnity   );
    router.get(   '/unity'     , auth , getAllUnities );
    router.get(   '/unity/:id' , auth , getUnity      );
    router.put(   '/unity/:id' , auth , updateUnity   );
    router.delete('/unity/:id' , auth , deleteUnity   );

    return router;
};

export { unityRoute };
