#!/usr/bin/env node

/**
 * IRIS CLI
 * 
 * Compiles .iris files to .jsx/.tsx
 */

import { Command } from 'commander';
import { readFileSync, writeFileSync, watch } from 'fs';
import { resolve, basename, dirname } from 'path';
import { compileFile, compile } from '../index.js';

const program = new Command();

program
  .name('iris')
  .description('IRIS - IA-first UI DSL Compiler')
  .version('0.1.0');

program
  .argument('<input>', 'Input .iris file')
  .option('-o, --output <file>', 'Output file path')
  .option('-w, --watch', 'Watch for changes and recompile')
  .action((input: string, options: { output?: string; watch?: boolean }) => {
    const inputPath = resolve(input);
    
    if (!inputPath.endsWith('.iris')) {
      console.error('Error: Input file must have .iris extension');
      process.exit(1);
    }
    
    const outputPath = options.output 
      ? resolve(options.output)
      : resolve(dirname(inputPath), basename(inputPath, '.iris') + '.jsx');
    
    function compile() {
      try {
        console.log(`Compiling ${inputPath}...`);
        const jsx = compileFile(inputPath);
        writeFileSync(outputPath, jsx, 'utf-8');
        console.log(`✓ Compiled to ${outputPath}`);
      } catch (error: any) {
        console.error(`✗ Error: ${error.message}`);
        if (options.watch) {
          console.log('Waiting for changes...');
        } else {
          process.exit(1);
        }
      }
    }
    
    compile();
    
    if (options.watch) {
      console.log(`Watching ${inputPath} for changes...`);
      watch(inputPath, { persistent: true }, () => {
        compile();
      });
    }
  });

program
  .command('compile')
  .description('Compile IRIS code from stdin or string')
  .argument('[code]', 'IRIS code to compile')
  .option('-o, --output <file>', 'Output file path')
  .action((code: string | undefined, options: { output?: string }) => {
    try {
      const irisCode = code || readFileSync(0, 'utf-8');
      const jsx = compile(irisCode);
      
      if (options.output) {
        writeFileSync(resolve(options.output), jsx, 'utf-8');
        console.log(`✓ Compiled to ${options.output}`);
      } else {
        console.log(jsx);
      }
    } catch (error: any) {
      console.error(`✗ Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();

