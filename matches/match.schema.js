const schema = {
  type: "object",
  properties: {
    homeTeam: {
      type: "string",
    },
    awayTeam: {
      type: "string",
    },
    startTime: {
      type: "string",
      format: "date-time",
    },
    endTime: {
      type: "string",
      format: "date-time",
    },
    duration: {
      type: "number",
    },
    homeTeamScore: {
      type: "number",
    },
    awayTeamScore: {
      type: "number",
    },
    isActive: {
      type: "boolean",
    },
    league: {
      type: "string",
    },
  },
};

module.exports = schema;
