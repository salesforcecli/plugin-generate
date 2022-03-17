/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';

import { expect } from 'chai';
import * as assert from 'yeoman-assert';

import { TestSession, execCmd } from '@salesforce/cli-plugins-testkit';
import { Env } from '@salesforce/kit';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';
import { rm } from 'shelljs';
import { defaultApiVersion } from '../../../src/constants';

let testSession: TestSession;
let testDir: string;
let files: string[];
let manifestFile: string;

describe('generate project NUTs', () => {
  const env = new Env();
  env.setString('TESTKIT_EXECUTABLE_PATH', path.join(process.cwd(), 'bin', 'dev'));

  before('prepare session and ensure environment variables', async () => {
    testSession = await TestSession.create({ authStrategy: 'NONE' });
    testDir = path.basename(testSession.dir);

    const osPath = (p: string): string => path.join(testDir, p);

    files = [
      osPath('testProj/config/project-scratch-def.json'),
      osPath('testProj/README.md'),
      osPath('testProj/sfdx-project.json'),
      osPath('testProj/.husky/pre-commit'),
      osPath('testProj/.vscode/extensions.json'),
      osPath('testProj/.vscode/launch.json'),
      osPath('testProj/.vscode/settings.json'),
      osPath('testProj/force-app/main/default/lwc/.eslintrc.json'),
      osPath('testProj/force-app/main/default/aura/.eslintrc.json'),
      osPath('testProj/scripts/soql/account.soql'),
      osPath('testProj/scripts/apex/hello.apex'),
      osPath('testProj/.eslintignore'),
      osPath('testProj/.forceignore'),
      osPath('testProj/.gitignore'),
      osPath('testProj/.prettierignore'),
      osPath('testProj/.prettierrc'),
      osPath('testProj/jest.config.js'),
      osPath('testProj/package.json'),
    ];

    manifestFile = osPath('testProj/manifest/package.xml');
  });

  afterEach(() => {
    rm('-rf', path.join(testSession.dir, 'testProj'));
  });

  after(async () => {
    await testSession?.clean();
  });

  it('should create a standard project with defaults', () => {
    const command = `generate project -n testProj -d ${testSession.dir}`;
    const shellOutput = execCmd<CreateOutput>(command, { cli: 'sf', ensureExitCode: 0 }).shellOutput;

    // This recreates the expected human readable output for the `sf generate project` command
    // and normalizes the file paths for whatever OS this test runs on
    const output = `target dir = ${testSession.dir}\n${files.reduce(
      (acc, file) => acc.concat(`   create ${file}\n`),
      ''
    )}\n`;

    expect(shellOutput.stdout).to.equal(output);

    // This asserts that all the files we expect to be created actually exist
    // and contain the appropriate content
    files.forEach((file) => {
      assert.file(file);

      switch (file) {
        case files[2]: // sfdx-project.json
          assert.fileContent(file, '"path": "force-app"');
          assert.fileContent(file, '"namespace": ""');
          assert.fileContent(file, '"name": "testProj"');
          assert.fileContent(file, '"sfdcLoginUrl": "https://login.salesforce.com"');
          assert.fileContent(file, `"sourceApiVersion": "${defaultApiVersion}"`);
          break;
        case file[13]: // .gitignore
          assert.fileContent(file, '.sf/\n.sfdx/\n.localdevserver/\ndeploy-options.json');
          break;
      }
    });
  });

  it('should create a project with a manifest', () => {
    const command = `generate project -n testProj -d ${testSession.dir} -x`;
    const shellOutput = execCmd<CreateOutput>(command, { cli: 'sf', ensureExitCode: 0 }).shellOutput;

    expect(shellOutput).to.include(`   create ${manifestFile}`);
    assert.file(manifestFile);
  });

  it('should create a project with a custom login url', () => {
    const command = `generate project -n testProj -d ${testSession.dir} -l awesomeLoginUrl`;
    execCmd<CreateOutput>(command, { cli: 'sf', ensureExitCode: 0 }).shellOutput;

    assert.fileContent(files[2], '"sfdcLoginUrl": "awesomeLoginUrl"');
  });

  it('should create an empty project', () => {
    const command = `generate project -n testProj -d ${testSession.dir} -t empty`;
    execCmd<CreateOutput>(command, { cli: 'sf', ensureExitCode: 0 }).shellOutput;

    files.forEach((file, index) => {
      if (index === 0 || index === 1 || index === 2 || index === 12) {
        assert.file(file);
      } else {
        assert.noFile(file);
      }
    });
  });

  it('should fail to create a project when not given a name', () => {
    const command = 'generate project';
    const shellOutput = execCmd<CreateOutput>(command, { cli: 'sf', ensureExitCode: 1 }).shellOutput;

    expect(shellOutput.stderr).to.include('Error: Missing required flag:\n -n, --name NAME');
    expect(shellOutput.stderr).to.include('Name of the generated project.');
  });
});
