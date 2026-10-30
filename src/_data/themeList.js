const themes = require("./themes.json");

// themes.json is grouped for display; pagination wants one flat list, with each
// theme still carrying the label of the group it came from.
module.exports = () =>
  themes.groups.flatMap((group) =>
    group.themes.map((theme) => ({ ...theme, group: group.label }))
  );
