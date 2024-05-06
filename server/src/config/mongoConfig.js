const {Mongoose} = require('mongoose');

const mongo = new Mongoose({createInitialConnection: true});


module.exports = mongo;