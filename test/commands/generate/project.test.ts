/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { expect, use as chaiUse } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { stubMethod } from '@salesforce/ts-sinon';

import GenerateProject from '../../../src/commands/generate/project';

chaiUse(sinonChai);

describe('./src/commands/generate/project.ts', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();

    // reset process.argv
    process.argv = process.argv.slice(0, 2);
  });

  describe('sf generate project', () => {
    let runGeneratorStub: sinon.SinonStub;

    beforeEach(() => {
      runGeneratorStub = stubMethod(sandbox, GenerateProject.prototype, 'runGenerator');
      runGeneratorStub.resolves();

      // This allows us to simulate running `sf generate project -n testProj` when calling GenerateProject.run() in our tests
      process.argv[2] = '-n';
      process.argv[3] = 'testProj';
    });

    it('should call .runGenerator()', async () => {
      await GenerateProject.run();

      expect(runGeneratorStub).to.have.been.calledOnce;
    });

    it('should call .runGenerator() with the command flags', async () => {
      process.argv[3] = 'theBestProjectEver';
      process.argv[4] = '-d';
      process.argv[5] = 'theBestOutputDirEver';
      process.argv[6] = '-p';
      process.argv[7] = 'theBestPackageDirEver';
      process.argv[8] = '-l';
      process.argv[9] = 'theBestLoginUrlEver';
      process.argv[10] = '-t';
      process.argv[11] = 'empty';
      process.argv[12] = '-x';

      await GenerateProject.run();

      // .args[0][1] corresponds to the first time runGeneratorStub is called and the second argument passed into that call
      expect(runGeneratorStub.args[0][1]).to.deep.equal({
        defaultpackagedir: 'theBestPackageDirEver',
        loginurl: 'theBestLoginUrlEver',
        manifest: true,
        ns: '',
        outputdir: 'theBestOutputDirEver',
        projectname: 'theBestProjectEver',
        template: 'empty',
      });
    });

    it('should set manifest flag to false when not passed in', async () => {
      await GenerateProject.run();

      // .args[0][1] corresponds to the first time runGeneratorStub is called and the second argument passed into that call
      expect(runGeneratorStub.args[0][1]).to.contain({ manifest: false });
    });

    it('should set pass in the namespace flag as ns', async () => {
      process.argv[4] = '--namespace';
      process.argv[5] = 'theBestNamespaceEver';

      await GenerateProject.run();

      // .args[0][1] corresponds to the first time runGeneratorStub is called and the second argument passed into that call
      expect(runGeneratorStub.args[0][1]).to.contain({ ns: 'theBestNamespaceEver' });
      expect(runGeneratorStub.args[0][1]).to.not.haveOwnProperty('namespace');
    });
  });
});
