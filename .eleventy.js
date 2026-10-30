module.exports = function (eleventyConfig) {
  // The deck assets are shared by every deck -- one copy, not 67 inlined ones.
  eleventyConfig.addPassthroughCopy("src/assets");

  // Hex -> "r, g, b" so a token can be used inside rgba() for soft fills.
  eleventyConfig.addFilter("rgbParts", (hex) => {
    const h = String(hex).replace("#", "").trim();
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(", ");
  });

  // Relative luminance, used to pick readable text over a swatch on the index.
  eleventyConfig.addFilter("isDark", (hex) => {
    const h = String(hex).replace("#", "").trim();
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const n = parseInt(full, 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.4;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
