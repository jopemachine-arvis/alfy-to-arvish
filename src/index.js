const alfyToArvish = () => {

};

const arvishToAlfy = () => {

};

module.exports = async (flags) => {
  if (flags['invert']) {
    arvishToAlfy();
  } else {
    alfyToArvish();
  }
};
