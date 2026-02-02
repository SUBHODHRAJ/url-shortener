//mongodb+srv://subhodhraj1806_db_user:CmFlTBCQSc2YWjla@subhodhraj.fo42mjn.mongodb.net/

const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Url", urlSchema);
//mongodb+srv://subhodhraj1806_db_user:
