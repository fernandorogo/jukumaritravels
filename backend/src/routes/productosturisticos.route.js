const { Router } = require('express')
const route = Router()
const productosturisticosCtrl = require('../controllers/productosturisticos.controller')

route.get('/list', productosturisticosCtrl.list);
route.get('/list/:id', productosturisticosCtrl.listid);
route.post('/add', productosturisticosCtrl.add);
route.put('/update/:id', productosturisticosCtrl.update);
route.delete('/delete/:id', productosturisticosCtrl.delete);


module.exports = route 