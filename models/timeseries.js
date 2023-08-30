const mongoose = require("mongoose");

const TimeSeriesSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
    },
    origin: {
      type: String,
    },
    destination: {
      type: String,
    }
  }
);

const TimeSeries = mongoose.model("TimeSeries", TimeSeriesSchema);
module.exports = TimeSeries;