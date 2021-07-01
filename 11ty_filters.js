const _ = require("lodash")

module.exports = function(eleventyConfig, config) {

  // split url string in array for navigation bar
  eleventyConfig.addFilter("urlsplit", (url) => {
    return url.split("/")
      .filter( (val) => val.length > 0)
      .reduce((acc, val) => {
        acc.push({
          name: val,
          url: _.isEmpty(acc) ? `/${val}` : `${_.last(acc).url}/${val}`
        })
        return acc
      },[])
  });

  //extract abstract from project markdown
  eleventyConfig.addFilter("abstract", (str) => {
    let index = str.search("<span class=\"more\"></span>")
    return index > 0 ? str.substring(0,index) : str.substring(0,256) + " ..."
  })
}