const _ = require("lodash")

const MAX_ABSTRACT_LENGTH = 256

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
    return _.truncate(str, {
      length: index > 0 ? Math.min(index, MAX_ABSTRACT_LENGTH) : MAX_ABSTRACT_LENGTH,
      separator: ' ',
      omission: ' ...'
    })
  })

  eleventyConfig.addFilter("decodeHtmlChars", (str) => {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  })
}