const fse = require('fs-extra');
const copy = require('recursive-copy');

module.exports = async (dir) => {
  if (!fse.existsSync(dir)) fse.mkdirSync(dir);

  return new Promise((resolve, reject) => {
    copy('./', dir, {
      dot: false, overwrite: true, junk: false, filter: [
        '**/*',
        '!node_modules'
      ]
    }, function (error, results) {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  })
}
