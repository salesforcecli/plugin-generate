/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';

import { use as chaiUse, expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as yeoman from 'yeoman-environment';
import * as yeomanGenerator from 'yeoman-generator';

import { ConfigAggregator, Messages } from '@salesforce/core';
import { SfCommand } from '@salesforce/sf-plugins-core';
import { Log } from '@salesforce/templates/lib/utils';
import { CreateOutput } from '@salesforce/templates/lib/utils/types';
import { spyMethod, stubMethod } from '@salesforce/ts-sinon';

import { defaultApiVersion } from '../../src/constants';
import { TemplateCommand } from '../../src/utils/templateCommand';

chaiUse(sinonChai);

describe('./src/utils/templateCommand.ts', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('template command', () => {
    class test extends TemplateCommand {
      public async run(): Promise<CreateOutput> {
        return {} as CreateOutput;
      }
    }

    let createEnvSpy: sinon.SinonSpy;
    let createCASpy: sinon.SinonSpy;

    let getCleanOutputFGAStub: sinon.SinonStub;
    let getMessageStub: sinon.SinonStub;
    let getOutputFGAStub: sinon.SinonStub;
    let getPropValueCAStub: sinon.SinonStub;
    let logStub: sinon.SinonStub;
    let pathResolveStub: sinon.SinonStub;
    let registerStubStub: sinon.SinonStub;
    let runStub: sinon.SinonStub;

    beforeEach(() => {
      createEnvSpy = spyMethod(sandbox, yeoman, 'createEnv');
      createCASpy = spyMethod(sandbox, ConfigAggregator, 'create');

      getCleanOutputFGAStub = stubMethod(sandbox, Log.prototype, 'getCleanOutput');
      getMessageStub = stubMethod(sandbox, Messages.prototype, 'getMessage');
      getOutputFGAStub = stubMethod(sandbox, Log.prototype, 'getOutput');
      getPropValueCAStub = stubMethod(sandbox, ConfigAggregator.prototype, 'getPropertyValue');
      logStub = stubMethod(sandbox, SfCommand.prototype, 'log');
      pathResolveStub = stubMethod(sandbox, path, 'resolve');
      registerStubStub = stubMethod(sandbox, yeoman.prototype, 'registerStub');
      runStub = stubMethod(sandbox, yeoman.prototype, 'run');

      runStub.resolves();

      pathResolveStub.returns('an/awesome/path');
      getMessageStub.returns('an awesome message');
      getOutputFGAStub.returns('awesome output');
      getCleanOutputFGAStub.returns('awesome clean output');
    });

    it('should generate a template', async () => {
      const options = { apiversion: 1, outputdir: 'an/awesome/dir' };
      const result = await test.prototype.runGenerator({} as yeomanGenerator.GeneratorConstructor, options);

      expect(createEnvSpy).to.have.been.calledOnce;
      expect(logStub).to.have.been.calledTwice;
      expect(getOutputFGAStub).to.have.been.calledTwice;
      expect(getCleanOutputFGAStub).to.have.been.calledOnce;

      expect(registerStubStub).to.have.been.calledOnceWith({}, 'generator');
      expect(runStub).to.have.been.calledOnceWith('generator', options);
      expect(pathResolveStub).to.have.been.calledWith(options.outputdir);
      expect(getMessageStub).to.have.been.calledOnceWith('TargetDirOutput', ['an/awesome/path']);
      expect(logStub.firstCall.firstArg).to.equal('an awesome message');
      expect(logStub.secondCall.firstArg).to.equal('awesome output');

      expect(result).to.deep.equal({
        outputDir: 'an/awesome/path',
        created: 'awesome clean output',
        rawOutput: 'target dir = an/awesome/path\nawesome output',
      });
    });

    it('should fallback to the default apiversion', async () => {
      await test.prototype.runGenerator({} as yeomanGenerator.GeneratorConstructor, {});

      expect(runStub).calledWith('generator', {
        apiversion: defaultApiVersion,
      });
    });

    it("shouldn't log readable output if json options is passed in", async () => {
      const options = { json: true };
      await test.prototype.runGenerator({} as yeomanGenerator.GeneratorConstructor, options);

      expect(logStub).to.not.have.been.called;
    });

    it('should return Config apiversion if it exists', async () => {
      getPropValueCAStub.returns(1);

      const result = await test.getApiVersion();

      expect(createCASpy).to.have.been.calledOnce;
      expect(getPropValueCAStub).to.have.been.calledOnceWith('org-api-version');

      expect(result).to.equal(1);
    });

    it('should return default apiversion if ConfigAggregator errors', async () => {
      getPropValueCAStub.throws();
      const result = await test.getApiVersion();

      expect(result).to.equal(defaultApiVersion);
    });
  });
});
