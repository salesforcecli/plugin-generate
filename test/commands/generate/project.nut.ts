/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as path from 'path';
import { rm } from 'shelljs';
import { execCmd, TestSession } from '@salesforce/cli-plugins-testkit';
import { expect } from 'chai';
import { Env } from '@salesforce/kit';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';

let testSession: TestSession;

describe('generate project NUTs', () => {
  const env = new Env();
  env.setString('TESTKIT_EXECUTABLE_PATH', path.join(process.cwd(), 'bin', 'dev'));

  before('prepare session and ensure environment variables', async () => {
    testSession = await TestSession.create({ authStrategy: 'NONE' });
  });

  after(async () => {
    await testSession?.clean();
  });

  afterEach(() => {
    const testProjDir = path.join(process.cwd(), 'testProj');
    rm('-rf', testProjDir);
  });

  it('generate a project', () => {
    const command = 'generate project -n testProj';
    const stdout = execCmd<CreateOutput>(command, { cli: 'sf', ensureExitCode: 0 }).shellOutput.stdout;

    expect(stdout).to.match(/create testProj/);
  });
});
