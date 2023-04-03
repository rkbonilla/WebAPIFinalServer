var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  userScore: {
    type: Number,
    require: true,
  },
});

mongoose.model("PlayerScores", Schema);
