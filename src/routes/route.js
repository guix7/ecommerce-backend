import {Router} from 'express';

const router = Router();

router.get('/api/test', (req, res) =>{
    res.json({message: 'API funcionando'})
})

export default router;