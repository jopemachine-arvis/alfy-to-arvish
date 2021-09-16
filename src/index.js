const alfredToArvis = require('alfred-to-arvis');
const arvisToAlfred = require('arvis-to-alfred');
const execa = require('execa');
const path = require('path');
const loudRejection = require('loud-rejection');
const { alfredToArvisCSV, arvisToAlfredCSV } = require('./path');

loudRejection();

const execaOpt = {
  cwd: process.cwd()
};

const alfyToArvish = () => {
  alfredToArvis(path.resolve(process.cwd(), 'info.plist')).then(() => {
    execa('code-replacer', [
      `--csv=${alfredToArvisCSV}`
      `--dir=./`
      `--dst=arvis`
      `--template=\${source}->\${value}`
    ], execaOpt);
  });
};

const arvishToAlfy = () => {
  arvisToAlfred(path.resolve(process.cwd(), 'arvis-workflow.json')).then(() => {
    execa('code-replacer', [
      `--csv=${arvisToAlfredCSV}`
      `--dir=./`
      `--dst=alfred`
      `--template=\${source}->\${value}`
    ], execaOpt);
  });
};

module.exports = async (flags) => {
  if (flags['invert']) {
    arvishToAlfy();
  } else {
    alfyToArvish();
  }
};
