const { time } = require("console");
const { stream } = require("got");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    homeTeamScore: {
      type: Number,
      required: true,
    },
    awayTeamScore: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    league: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

matchSchema.pre("findByIdAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
