#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse();
