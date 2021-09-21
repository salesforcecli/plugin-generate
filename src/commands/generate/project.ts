/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { Flags } from '@oclif/core';
import ProjectGenerator from '@salesforce/templates/lib/generators/projectGenerator';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';
import { AnyJson } from '@salesforce/ts-types';

import { MessageUtil, TemplateCommand } from '../../utils';

export default class GenerateProject extends TemplateCommand {
  public static summary = MessageUtil.get('ProjectDescription');
  public static examples = [
    '$ sfdx force:project:create --projectname mywork',
    '$ sfdx force:project:create --projectname mywork --defaultpackagedir myapp',
    '$ sfdx force:project:create --projectname mywork --defaultpackagedir myapp --manifest',
    '$ sfdx force:project:create --projectname mywork --template empty',
  ];
  public static description = MessageUtil.get('ProjectLongDescription');

  public static flags = {
    projectname: Flags.string({
      char: 'n',
      summary: MessageUtil.get('ProjectNameFlagDescription'),
      description: MessageUtil.get('ProjectNameFlagLongDescription'),
      required: true,
    }),
    template: Flags.string({
      char: 't',
      summary: MessageUtil.get('ProjectTemplateFlagDescription'),
      description: MessageUtil.get('ProjectTemplateFlagLongDescription'),
      default: 'standard',
      options: ['standard', 'empty', 'analytics'],
    }),
    outputdir: Flags.string({
      char: 'd',
      summary: MessageUtil.get('OutputDirFlagDescription'),
      description: MessageUtil.get('OutputDirFlagLongDescription'),
      default: '.',
    }),
    namespace: Flags.string({
      char: 's',
      summary: MessageUtil.get('ProjectNamespaceFlagDescription'),
      description: MessageUtil.get('ProjectNamespaceFlagLongDescription'),
      default: '',
    }),
    defaultpackagedir: Flags.string({
      char: 'p',
      summary: MessageUtil.get('ProjectPackageFlagDescription'),
      description: MessageUtil.get('ProjectPackageFlagLongDescription'),
      default: 'force-app',
    }),
    manifest: Flags.boolean({
      char: 'x',
      summary: MessageUtil.get('ProjectManifestFlagDescription'),
      description: MessageUtil.get('ProjectManifestFlagLongDescription'),
    }),
    loginurl: Flags.string({
      char: 'l',
      summary: MessageUtil.get('ProjectLoginUrlDescription'),
      description: MessageUtil.get('ProjectLoginUrlLongDescription'),
      default: 'https://login.salesforce.com',
      hidden: true,
    }),
  };

  public async run(): Promise<CreateOutput | AnyJson> {
    const { flags } = await this.parse(GenerateProject);

    const options = {
      ...flags,
      ns: flags.namespace,
    };

    // namespace is a reserved keyword for the generator
    delete options.namespace;

    return this.runGenerator(ProjectGenerator, options);
  }
}
