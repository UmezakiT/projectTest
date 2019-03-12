const cloudinary = require('cloudinary');
const Formidable = require('formidable');
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});


module.exports = function(req, res, next) {
  // create new formidable form
  const form = new Formidable.IncomingForm();


}