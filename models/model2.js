var mongoose = require("mongoose");

var data2_schema = new mongoose.Schema({
    full_name: {type: String, required: true},
    email: {type: String, required: true},
    team_name: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("mock_data2", data2_schema);