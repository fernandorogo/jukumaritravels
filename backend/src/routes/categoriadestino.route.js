const { Router } = require('express')
const route = Router()
const categoriadestinoCtrl = require('../controllers/categoriadestino.controller')

route.get('/list', categoriadestinoCtrl.list);
route.get('/list/:id', categoriadestinoCtrl.listid);
route.post('/add', categoriadestinoCtrl.add);
route.put('/update/:id', categoriadestinoCtrl.update);
route.delete('/delete/:id', categoriadestinoCtrl.delete);


module.exports = route