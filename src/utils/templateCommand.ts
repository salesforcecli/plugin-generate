/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';

import * as yeoman from 'yeoman-environment';
import * as yeomanGenerator from 'yeoman-generator';

import { ConfigAggregator, Messages } from '@salesforce/core';
import { SfCommand } from '@salesforce/sf-plugins-core';
import { ForceGeneratorAdapter } from '@salesforce/templates/lib/utils';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';

import TerminalAdapter = require('yeoman-environment/lib/adapter');
import Environment = require('yeoman-environment');
import { defaultApiVersion } from '../constants';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@salesforce/plugin-generate', 'templateCommand');

export abstract class TemplateCommand extends SfCommand<CreateOutput> {
  private static API_VERSION = 'apiVersion';

  public static buildJson(adapter: ForceGeneratorAdapter, targetDir: string): CreateOutput {
    const cleanOutput = adapter.log.getCleanOutput();
    const rawOutput = `target dir = ${targetDir}\n${adapter.log.getOutput()}`;
    const output = {
      outputDir: targetDir,
      created: cleanOutput,
      rawOutput,
    };
    return output;
  }

  public static async getApiVersion(): Promise<string> {
    try {
      const aggregator = await ConfigAggregator.create();
      const apiVersionFromConfig = aggregator.getPropertyValue(TemplateCommand.API_VERSION);
      return (apiVersionFromConfig as string) || defaultApiVersion;
    } catch (err) {
      return defaultApiVersion;
    }
  }

  public async runGenerator(
    generator: yeomanGenerator.GeneratorConstructor,
    options: Environment.Options
  ): Promise<CreateOutput> {
    if (!options.apiversion) {
      options.apiversion = await TemplateCommand.getApiVersion();
    }

    const adapter = new ForceGeneratorAdapter();
    const env = yeoman.createEnv(undefined, undefined, adapter as unknown as TerminalAdapter);
    env.registerStub(generator, 'generator');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await env.run('generator', options); // eslint-disable-line @typescript-eslint/await-thenable
    const targetDir = path.resolve(options.outputdir as string);
    if (!options.json) {
      this.log(messages.getMessage('TargetDirOutput', [targetDir]));
      this.log(adapter.log.getOutput());
    }

    return TemplateCommand.buildJson(adapter, targetDir);
  }
}
