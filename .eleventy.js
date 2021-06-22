const Image = require("@11ty/eleventy-img")
const path = require("path")

const OUTPUT_DIR = "dist"
const INPUT_DIR = "site"

// generate images
async function imageShortcode(src, alt, sizes) {

  const imgPath = path.join(path.dirname(this.page.inputPath), src)

  let metadata = await Image(imgPath, {
    widths: [300, 600],
    formats: ["jpg"],
    urlPath: "/assets/img/",
    outputDir: OUTPUT_DIR + "/assets/img/",
  })

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  eleventyConfig.addJavaScriptFunction("image", imageShortcode)

  return {
    dir: {
      input: INPUT_DIR,
      output: OUTPUT_DIR,
      layouts: "_layouts",
      data: "data"
    }
  }
}