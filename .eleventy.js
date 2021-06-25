const shorthands = require('./11ty-shorthands')
const filters = require('./11ty-filters')

const config = {
  OUTPUT_DIR : "dist",
  INPUT_DIR : "site"
}

module.exports = function(eleventyConfig) {

  // copy fonts
  eleventyConfig.addPassthroughCopy(config.INPUT_DIR + "/assets")

  // copy css
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addPassthroughCopy(config.INPUT_DIR + "/css")
  eleventyConfig.addWatchTarget(config.INPUT_DIR + "/css/")

  shorthands(eleventyConfig, config)
  filters(eleventyConfig, config)

  return {
    dir: {
      input: config.INPUT_DIR,
      output: config.OUTPUT_DIR,
      layouts: "_layouts",
      data: "data"
    }
  }
}