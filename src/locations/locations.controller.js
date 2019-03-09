const express = require('express');
const router = express.Router();
const locationService = require('./location.service');
const multer = require('multer');
const path = require('path');

//file upload function

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/location');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize:200000 },
    fileFilter: function( req, file, callback ) {
        validateFile(file, callback);
    }
});

var validateFile = function(file, callback) {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return callback(null, true);
    } else {
        callback("Invalid file type. Only JPEG, PNG and GIF file are allowed.");
    }
}

// routes
router.post('/create', upload.single('image'), create);
router.get('/recent', recent);
router.get('/all', allLocations);
router.get('/user/:id', getLocations);
router.get('/:id', getLocation);

router.post('/fish/create', upload.single('image'), fishCreate);
// router.post('/delete', _deleteProduct);
// router.post('/update', updateProduct);


module.exports = router;

function create(req, res, next) {
    locationService.create(req.body, req.file.filename)
        .then(() => res.status(200).json({"message": "success"}))
        .catch(err => next(err));
}

function getLocation(req, res, next) {
    locationService.getLocation(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}

function recent(req, res, next) {
    locationService.getRecent()
        .then(locations => res.json(locations))
        .catch(err => next(err));
}

function allLocations(req, res, next) {
    locationService.allLocations()
        .then(locations => res.json(locations))
        .catch(err => next(err));
}

function getLocations(req, res, next) {
    locationService.getLocations(req.params.id)
        .then(locations => res.json(locations))
        .catch(err => next(err));
}

function fishCreate(req, res, next) {
    locationService.fishcreate(req.body, req.file.filename)
        .then(() => res.status(200).json({"message": "success"}))
        .catch(err => next(err));
}

// function _deleteProduct(req, res, next) {
   
//     productService.deleteProduct(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }



// function updateProduct(req, res, next) {
//    productService.updateProduct(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }