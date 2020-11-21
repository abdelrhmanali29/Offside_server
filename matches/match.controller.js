const { matchService } = require("./match.service");

exports.postMatch = matchService.create();
exports.getAllMatchs = matchService.getAll();
exports.deleteMatch = matchService.delete();
exports.patchMatch = matchService.patch();
