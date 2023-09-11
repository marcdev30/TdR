const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://admin:passwd@maincluster.5epli6n.mongodb.net/mainDB?retryWrites=true&w=majority"
);

exports.default = mongoose;
