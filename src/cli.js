#!/usr/bin/env node
const meow = require('meow');
const converter = require('./index');

const helpString = `
Usage
  $ alfy-to-arvish

Examples
  To convert alfy project to arvish,
  $ alfy-to-arvish

  To convert arvish project to alfy,
  $ alfy-to-arvish --invert
`;

const cli = meow(helpString, {
  flags: {
    invert: {
      type: 'boolean',
      alias: 'i',
      isRequired: (_flags, input) => false
    },
  }
});

converter(cli.flags);
