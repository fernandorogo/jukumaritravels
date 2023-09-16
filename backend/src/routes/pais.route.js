const { Router } = require('express')
const route = Router()
const paisesCtrl = require('../controllers/pais.controller')

route.get('/listall', paisesCtrl.listall);
route.get('/listid/:idPais', paisesCtrl.listid);route.get('/list', paisesCtrl.list);
route.post('/add', paisesCtrl.add);
route.post('/addmany', paisesCtrl.addMany);
{/*route.put('/update/:id', paisesCtrl.update);
route.delete('/delete/:id', paisesCtrl.delete);*/}



module.exports = route