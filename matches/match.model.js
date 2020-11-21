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
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

matchSchema.virtual("day").get(function () {
  return this.startTime.getDate();
});

matchSchema.virtual("month").get(function () {
  return this.startTime.getMonth() + 1;
});

matchSchema.virtual("year").get(function () {
  return this.startTime.getFullYear();
});

matchSchema.pre("findByIdAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
