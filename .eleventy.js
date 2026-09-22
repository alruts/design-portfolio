module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addGlobalData("year", () => String(new Date().getFullYear()));

  eleventyConfig.addCollection("selectedWorks", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/works/*.md")
      .sort((a, b) => {
        const orderA = a.data.order ?? 999;
        const orderB = b.data.order ?? 999;
        return orderA - orderB;
      });
  });

  return {
    pathPrefix: "/design-portfolio/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
