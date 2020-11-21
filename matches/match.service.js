const Match = require("./match.model");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");
const schema = require("./match.schema");
let Ajv = require("ajv");
let ajv = new Ajv({ allErrors: true });
let startOfToday = require("date-fns/startOfToday");
let errors;
const valid = req => {
  const data = {
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    duration: req.body.duration,
    homeTeamScore: req.body.homeTeamScore,
    awayTeamScore: req.body.awayTeamScore,
    isActive: req.body.isActive,
    league: req.body.league,
  };
  let validate = ajv.compile(schema);
  let valid = validate(data);
  errors = validate.errors;
  return valid;
};

const getErrorMessage = () => {
  let errorsMesssage = "";
  for (let error of errors) {
    errorsMesssage += error.dataPath + ": " + error.message + ", ";
  }
  return errorsMesssage;
};

exports.matchService = {
  create() {
    return catchAsync(async (req, res, next) => {
      if (!valid(req)) {
        let errorsMesssage = getErrorMessage();
        return next(new AppError(errorsMesssage, 400, errors));
      }

      const result = await Match.create({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        duration: req.body.duration,
        homeTeamScore: req.body.homeTeamScore,
        awayTeamScore: req.body.awayTeamScore,
        isActive: req.body.isActive,
        league: req.body.league,
      });
      res.status(201).json({ status: "success", data: result });
    });
  },

  getAll() {
    return catchAsync(async (req, res) => {
      const queryObj = { ...req.query };
      console.log(queryObj);
      const excludedFields = ["page", "limit", "sort", "fields"];
      excludedFields.forEach(el => delete queryObj[el]);

      const matches = await Match.find(queryObj).sort({ startTime: 1 });

      res.status(200).json({ status: "success", data: matches });
    });
  },

  delete() {
    return catchAsync(async (req, res, next) => {
      const match = await Match.findById(req.params.id);

      if (!match)
        return next(new AppError("cannot find doc with that id", 404));

      match.remove();
      res.status(204).send();
    });
  },

  patch() {
    return catchAsync(async (req, res, next) => {
      if (!valid(req)) {
        let errorsMesssage = getErrorMessage();
        return next(new AppError(errorsMesssage, 400, errors));
      }

      const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!match)
        return next(new AppError("cannot find doc with that id", 404));

      res.status(200).json({ status: "success", data: match });
    });
  },
};
