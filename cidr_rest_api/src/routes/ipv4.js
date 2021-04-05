import { Router } from 'express';
import Cird from '../cird';
import models from '../models';

/**
 * WE have our methods here that manage the req and the responses for all the cases:
 * @class Models.list: we create a singelton in order to store, that models propageted the updated list trough the app
 * @method GET: we send back the full list of available IP that are stored in the List
 * @method PUT: we update the status on a IP with id and status provided from the request
 * @method POST: we are getting the CIRD BLock ip and range from the requested we send it trough @method Cird that generate the list of IP addresses that we insert in the List and we send that back to then UI to update the app
 * if the CIRD block is out of range we propagate the error and send back the before lsit of IPs
 */

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