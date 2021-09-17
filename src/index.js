const execa = require('execa');
const path = require('path');
const del = require('delete');
const fse = require('fs-extra');
const loudRejection = require('loud-rejection');
const latestVersion = require('latest-version');
const alfredToArvis = require('alfred-to-arvis').default;
const arvisToAlfred = require('arvis-to-alfred').default;
const { alfredToArvisCSV, arvisToAlfredCSV } = require('./path');
const copyCurrentProject = require('./copyProject');

loudRejection();

const execaOpt = {
  cwd: process.cwd()
};

const alfyToArvish = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await alfredToArvis(path.resolve(process.cwd(), 'info.plist'));
      await copyCurrentProject('arvis');

      await del.promise([
        './arvis/info.plist',
        './arvis/arvis'
      ]);

      const replacerProc = execa('code-replacer', [
        `--csv='${alfredToArvisCSV}'`,
        `--dir='./arvis'`,
        `--dst='arvis'`,
        `--overwrite`,
        `--template='\${source}->\${value}'`,
      ], execaOpt);

      replacerProc.stdout.pipe(process.stdout);
      replacerProc.then(async () => {
        const pkg = await fse.readJSON('./arvis/package.json');
        pkg.dependencies.arvish = await latestVersion('arvish');
        pkg.files && pkg.files.push('arvis-workflow.json') && pkg.files.splice(pkg.files.indexOf('info.plist'), 1);

        await fse.writeJSON('./arvis/package.json', pkg, { encoding: 'utf8', spaces: 2 });
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

const arvishToAlfy = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await arvisToAlfred(path.resolve(process.cwd(), 'arvis-workflow.json'))
      await copyCurrentProject('alfred');

      await del.promise([
        './alfred/arvis-workflow.json',
        './alfred/alfred'
      ]);

      const replacerProc = execa('code-replacer', [
        `--csv='${arvisToAlfredCSV}'`,
        `--dir='./alfred'`,
        `--dst='alfred'`,
        `--overwrite`,
        `--template='\${source}->\${value}'`,
      ], execaOpt);

      replacerProc.stdout.pipe(process.stdout);
      replacerProc.then(async () => {
        const pkg = await fse.readJSON('./alfred/package.json');

        // Avoid ESM
        pkg.dependencies.alfy = '^0.11.1';
        pkg.scripts && pkg.scripts.prepublishOnly && delete pkg.scripts.prepublishOnly;
        pkg.files && pkg.files.push('info.plist') && pkg.files.splice(pkg.files.indexOf('alfred-workflow.json'), 1);

        await fse.writeJSON('./alfred/package.json', pkg, { encoding: 'utf8', spaces: 2 });
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = async (flags) => {
  if (flags['invert']) {
    await arvishToAlfy();
  } else {
    await alfyToArvish();
  }

  console.log('Jobs done.');
};
