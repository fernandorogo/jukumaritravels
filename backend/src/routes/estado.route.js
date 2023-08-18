const { Router } = require('express')
const route = Router()
const estadoCtrl = require('../controllers/estado.controller')

route.get('/list', estadoCtrl.list);
route.get('/listid/:idEstado', estadoCtrl.listid);
route.get('/listall', estadoCtrl.listAll);
route.post('/add', estadoCtrl.add);
route.post('/addmany', estadoCtrl.addMany);
{/*route.put('/update/:id', estadoCtrl.update);
route.delete('/delete/:id', estadoCtrl.delete);*/}


module.exports = route