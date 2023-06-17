const Image = require("@11ty/eleventy-img")
const path = require("path")
const { DateTime } = require("luxon")
const _ = require("lodash")
const fs = require("fs");
const randomstring = require("randomstring");

module.exports = function(eleventyConfig, config) {

  // generate images
  async function imageShortcode(src, alt, sizes, divClass) {

    const imgPath = path.join(path.dirname(this.page.inputPath), src)
    sizes = _.isEmpty(sizes) ? [700, 1400, "auto"] : sizes

    let metadata = await Image(imgPath, {
      widths: sizes,
      formats: ["jpg"],
      urlPath: "/assets/img/",
      outputDir: config.OUTPUT_DIR + "/assets/img/",
    })

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    }

    const image = Image.generateHTML(metadata, imageAttributes)
    return divClass ? `<div class="${divClass}">${image}</div>` : image
  }

  // image shorthand
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  eleventyConfig.addJavaScriptFunction("image", imageShortcode)

  // copies file to asset folder
  async function copyAssetShortcode(file,folder = "") {
    const inputPath = path.join(path.dirname(this.page.inputPath), file)
    const outputDir = path.join(config.OUTPUT_DIR, "assets", folder)
    const outputFile = randomstring.generate() + "-" + file

    fs.mkdirSync(outputDir, { recursive: true });
    await fs.promises.copyFile(inputPath, path.join(outputDir, outputFile));
    return path.join("/assets", folder, outputFile)
  }

  eleventyConfig.addNunjucksAsyncShortcode("asset", copyAssetShortcode)
  eleventyConfig.addLiquidShortcode("asset", copyAssetShortcode)
  eleventyConfig.addJavaScriptFunction("asset", copyAssetShortcode)

  // format date
  eleventyConfig.addShortcode("formatDate", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_HUGE)
  });
}