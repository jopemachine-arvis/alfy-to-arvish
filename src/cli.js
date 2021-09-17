#!/usr/bin/env node
const meow = require('meow');
const converter = require('./index');

const cli = meow(`
	Usage
		$ alfy-to-arvish

	Examples
		To convert alfy project to arvish,
		$ alfy-to-arvish

		To convert arvish project to alfy,
		$ alfy-to-arvish --invert
`);

converter(cli.flags);
