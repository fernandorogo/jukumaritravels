const { Router } = require('express')
const route = Router()
const destinosCtrl = require('../controllers/destinos.controller')
const upload = require('../middleware/imgUpload')

route.get('/list', destinosCtrl.list);
route.get('/listall', destinosCtrl.ListAll);
route.get('/listid/:id', destinosCtrl.listById);
route.post('/add', upload.single('img'), destinosCtrl.add);

route.put('/update/:id', upload.single('img'), destinosCtrl.update);
route.delete('/:id', destinosCtrl.delete);

module.exports = route