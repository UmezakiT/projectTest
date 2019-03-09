const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Location = db.Location;
const Fish = db.Fish;
const User = db.User;

module.exports = {
  create,
  getRecent,
  getLocations,
  getLocation,
  allLocations,
  deleteLocation,
  updateLocation,

  fishcreate,
};



async function create(locationParam, filename) {

   // validate
    if (await Location.findOne({ locationName: locationParam.locationName })) {
        throw 'LocationName "' + locationParam.locationName + '" is already taken';
    }   

    const location = new Location(locationParam);

    location.locationPicture = '/location/'+filename;

    // save location
    await location.save();
}


async function getRecent(){
    return await Location.find().sort({createdDate:-1}).limit(50);
}

async function getLocations(idParam){
    const user = await User.findById(idParam);
    const locations = await Location.find({ userID: idParam });
    const data = [user, locations];

    return data;
}

async function getLocation(idParam){
    const location = await Location.findById(idParam);
    const fishes = await Fish.find({ locationID:idParam });
    const data = [location, fishes];

    return data;
}

async function allLocations(){
    return await Location.find({},{"locationName":1});
}

async function deleteLocation(idParam){
    await Location.findByIdAndRemove(idParam.id);
}



async function updateLocation(locationParam) {
    const location = await Location.findById(locationParam.id);

    // validate
    if (!location) throw 'Product not found';
    if (location.locationName !== locationParam.locationName && await Location.findOne({ locationName: locationParam.locationName })) {
        throw 'ProductName "' + locationParam.locationName + '" is already taken';
    }

    
    // if (productParam.password) {
    //     productParam.productPrice = productParam.productPrice;
    // }

    location.locationDescription = locationParam.locationDescription;    

    // copy productParam properties to product
    Object.assign(location, locationParam);

    await location.save();
}

async function fishcreate(fishParam, filename) {

    const fish = new Fish(fishParam);

    fish.fishPicture = '/location/'+filename;

    // save location
    await fish.save();
}

