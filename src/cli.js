const meow = require('meow');
const converter = require('./index');

const cli = meow(`
	Usage
  $ alfy-to-arvish

	Examples
	$ alfy-to-arvish
	$ alfy-to-arvish --invert
`);

converter(cli.flags);
