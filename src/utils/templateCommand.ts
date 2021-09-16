/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';

import * as yeoman from 'yeoman-environment';
import * as yeomanGenerator from 'yeoman-generator';

import { SfCommand } from '@salesforce/sf-plugins-core';
import { ConfigAggregator } from '@salesforce/core';
import { ForceGeneratorAdapter } from '@salesforce/templates/lib/utils';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';
import { AnyJson } from '@salesforce/ts-types';

import TerminalAdapter = require('yeoman-environment/lib/adapter');
import { defaultApiVersion } from '../constants';
import { MessageUtil } from './messageUtil';

export abstract class TemplateCommand extends SfCommand<CreateOutput | AnyJson> {
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

  public async runGenerator(generator: yeomanGenerator.GeneratorConstructor): Promise<CreateOutput | AnyJson> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { flags } = await this.parse(TemplateCommand);

    // Can't specify a default value the normal way for apiversion, so set it here
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!flags.apiversion) {
      flags.apiversion = await TemplateCommand.getApiVersion(); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    }

    const adapter = new ForceGeneratorAdapter();
    const env = yeoman.createEnv(undefined, undefined, adapter as unknown as TerminalAdapter);
    env.registerStub(generator, 'generator');

    env.run('generator', flags as yeoman.Callback);
    const targetDir = path.resolve(flags.outputdir); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (flags.json) {
      return TemplateCommand.buildJson(adapter, targetDir);
    } else {
      this.log(MessageUtil.get('TargetDirOutput', [targetDir]));
      this.log(adapter.log.getOutput());
      return {};
    }
  }

  public abstract run(): Promise<CreateOutput | AnyJson>;
}
