module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");

  eleventyConfig.addGlobalData("year", () => String(new Date().getFullYear()));

  const slugify = eleventyConfig.getFilter("slugify");

  eleventyConfig.addFilter("tagPath", (tag) => `/tags/${slugify(tag)}/`);

  const byOrder = (a, b) => (a.data.order ?? 999) - (b.data.order ?? 999);

  eleventyConfig.addCollection("selectedWorks", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/works/*.md").sort(byOrder);
  });

  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const groups = new Map();

    collectionApi.getFilteredByGlob("./src/works/*.md").forEach((item) => {
      (item.data.categories || []).forEach((tag) => {
        if (!groups.has(tag)) groups.set(tag, []);
        groups.get(tag).push(item);
      });
    });

    return Array.from(groups.entries())
      .map(([tag, works]) => ({
        tag,
        slug: slugify(tag),
        works: works.sort(byOrder),
      }))
      .sort((a, b) => a.tag.localeCompare(b.tag));
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
