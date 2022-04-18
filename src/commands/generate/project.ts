/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Flags } from '@oclif/core';
import { Messages } from '@salesforce/core';
import ProjectGenerator from '@salesforce/templates/lib/generators/projectGenerator';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';

import { TemplateCommand } from '../../utils';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@salesforce/plugin-generate', 'generate.project');

export default class GenerateProject extends TemplateCommand {
  public static summary = messages.getMessage('summary');
  public static examples = messages.getMessages('examples');
  public static description = messages.getMessage('description');

  public static flags = {
    'default-package-dir': Flags.string({
      char: 'p',
      summary: messages.getMessage('flags.default-package-dir.summary'),
      description: messages.getMessage('flags.default-package-dir.description'),
      default: 'force-app',
    }),
    'login-url': Flags.string({
      char: 'l',
      summary: messages.getMessage('flags.login-url.summary'),
      description: messages.getMessage('flags.login-url.description'),
      default: 'https://login.salesforce.com',
      hidden: true,
    }),
    manifest: Flags.boolean({
      char: 'x',
      summary: messages.getMessage('flags.manifest.summary'),
      description: messages.getMessage('flags.manifest.description'),
    }),
    name: Flags.string({
      char: 'n',
      summary: messages.getMessage('flags.name.summary'),
      description: messages.getMessage('flags.name.description'),
      required: true,
    }),
    namespace: Flags.string({
      char: 's',
      summary: messages.getMessage('flags.namespace.summary'),
      description: messages.getMessage('flags.namespace.description'),
      default: '',
    }),
    'output-dir': Flags.directory({
      char: 'd',
      summary: messages.getMessage('flags.output-dir.summary'),
      description: messages.getMessage('flags.output-dir.description'),
      default: '.',
    }),
    template: Flags.string({
      char: 't',
      summary: messages.getMessage('flags.template.summary'),
      description: messages.getMessage('flags.template.description'),
      default: 'standard',
      options: ['standard', 'empty', 'analytics'],
    }),
  };

  public async run(): Promise<CreateOutput> {
    const { flags } = await this.parse(GenerateProject);

    const options = {
      defaultpackagedir: flags['default-package-dir'],
      loginurl: flags['login-url'],
      manifest: flags.manifest ?? false,
      ns: flags.namespace,
      outputdir: flags['output-dir'],
      projectname: flags.name,
      template: flags.template,
    };

    options.outputdir = await this.createOutputDir(flags['output-dir']);

    return await this.runGenerator(ProjectGenerator, options);
  }

  private async createOutputDir(outputDir: string): Promise<string> {
    let dir = outputDir;
    if (dir === '.') {
      return dir;
    }
    if (path.isAbsolute(dir)) {
      return dir;
    }
    if (dir.startsWith('~')) {
      dir = path.join(os.homedir(), dir.slice(1));
    }
    const resolvedPath = path.resolve(dir);
    await fs.promises.mkdir(resolvedPath, { recursive: true });
    return resolvedPath;
  }
}
