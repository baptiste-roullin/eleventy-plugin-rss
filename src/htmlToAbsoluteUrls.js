const posthtml = require('posthtml');
const urls = require('posthtml-urls')
const absoluteUrl = require("./absoluteUrl");

module.exports = async function (htmlContent, base, processOptions = {}) {
  if (!base) {
    throw new Error("eleventy-plugin-rss, htmlToAbsoluteUrls(absolutePostUrl) was missing the full URL base `absolutePostUrl` argument.")
  }

  let options = {
    eachURL: function (url) {
      //  if (new RegExp(/.png$/g)) {
      return absoluteUrl(url.trim(), base);
      //  }
    },
    filter: {
      img: { src: true},      //  link: { class: "fjpaefiaep" },
      // a: { class: "fjpaefiaep" }
    },
  };

  let modifier = posthtml().use(urls(options));

  let result = await modifier.process(htmlContent, processOptions);
  return result.html;
};
