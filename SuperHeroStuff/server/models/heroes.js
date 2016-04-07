var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Heroes = new Schema({
    Alias: {type: String},
    FirstName: {type: String},
    LastName: {type: String},
    City: {type: String},
    PowerName: {type: String}
});
module.exports = mongoose.model("Heroes", Heroes);
