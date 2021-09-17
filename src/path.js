const path = require('path');

const rootPath = path.dirname(__dirname);
const alfredToArvisCSV = path.resolve(rootPath, 'alfred-to-arvis.csv');
const arvisToAlfredCSV = path.resolve(rootPath, 'arvis-to-alfred.csv');

module.exports = {
  alfredToArvisCSV,
  arvisToAlfredCSV,
};
