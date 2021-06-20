var mongoose = require("mongoose");

var data1_schema = new mongoose.Schema({
    city: {type: String, required: true},
    email: {type: String, required: true, ref: 'mock_data1'},
    full_name: {type: String, required: true},
    number: {type: Number, required: true},
    url: {type: String, required: true}
}, {timestamps: true});


module.exports = mongoose.model("mock_data1", data1_schema);