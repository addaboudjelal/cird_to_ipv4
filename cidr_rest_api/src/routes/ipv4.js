import { Router } from 'express';
import Cird from '../cird';
import models from '../models';

const router = Router();

router.get('/', (req, res) => {
    console.log("this:",models.list.get());
    return res.send(`${JSON.stringify(Object.values(req.context.list))}`);
});
router.post('/', (req, res, next) => {
    const newItem = { 
        id: (Object.keys(req.context.list).length+1).toString(),
        ip: req.body.ip,
        status: req.body.status,
        mask: req.body.mask,
    }
    let temp = Cird(newItem.ip, newItem.mask);
    next();
    if( temp === null){
        return res.status(500).send(`${JSON.stringify(Object.values(req.context.list))}`);
    }else{

        models.list.set(temp);
        return res.status(200).send(`${JSON.stringify(models.list.get())}`);
    }
    

});
router.put('/:ip', (req, res) => {
    
    models.list.update(req.body.id, req.body.status);
    return res.status(200).send(`${JSON.stringify(Object.values(req.context.list))}`);
});

export default router;