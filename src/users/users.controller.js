const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const multer = require('multer');
const path   = require('path');


// File Upload function

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
})

var upload = multer({ 
    storage: storage,
    limits: { fileSize:200000 },
    fileFilter: function(req, file, callback){
        validateFile(file, callback);
    }
});

var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}



// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/photo/:id', upload.single('image'), uploadPhoto);
router.get('/profile/:id', profile);
router.get('/current', getCurrent);
router.put('/profile/:id', update);
router.delete('/:id', _delete);

module.exports = router;


// Route funciton

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}


function register(req, res, next) {
 userService.create(req.body)
        .then(() => res.status(200).json({state: 'Success'}))
        .catch(err => next(err));
}

function uploadPhoto(req, res, next) {
    userService.profilePhoto(req.file.filename, req.params.id)
        .then(() => res.status(200).json({state: 'Success'}))
        .catch(err => next(err));
}


function profile(req, res, next) {
    userService.profile(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}


function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}