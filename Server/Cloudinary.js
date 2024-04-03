const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'ddlelands',
    api_key:"523862223337768",
    api_secret:"sFDg2nXjQluBw6i2hUfpxYSlHF8"
});

module.exports = cloudinary;