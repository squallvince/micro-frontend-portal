// For lazy loading within an application to work you need to set webpack's public path
// basically webpack's internal module system always looks for code-splits (modules) at the root
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const getUrl = () => {
  return window.System.resolve('@portal/frames/frames.js');
};

export default function setPublicPath() {
  return Promise.all([getUrl()]).then(values => {
    const [url] = values;
    const webpackPublicPath = url.slice(0, url.lastIndexOf('/') + 1);

    __webpack_public_path__ = webpackPublicPath;
    return true;
  });
}
