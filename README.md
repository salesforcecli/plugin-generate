> See https://github.com/salesforcecli/plugin-templates for the `project:generate` command

# :stop_sign: This plugin is deprecated.

### Use the [lerna template](https://github.com/salesforcecli/lerna-template) if you need a library and plugin

### This template is useful if the library is already in another repository or the plugin is a wrapper around an API.

# plugin-&lt;REPLACE ME&gt;

[![NPM](https://img.shields.io/npm/v/@salesforce/plugin-generate.svg?label=@salesforce/plugin-generate)](https://www.npmjs.com/package/@salesforce/plugin-generate) [![Downloads/week](https://img.shields.io/npm/dw/@salesforce/plugin-generate.svg)](https://npmjs.org/package/@salesforce/plugin-generate) [![License](https://img.shields.io/badge/License-BSD%203--Clause-brightgreen.svg)](https://raw.githubusercontent.com/salesforcecli/plugin-generate/main/LICENSE.txt)

Change above to <REPLACE_ME> before finalizing

&lt;REPLACE ME DESCRIPTION START&gt;

This repository provides a template for creating a plugin for the Salesforce CLI. To convert this template to a working plugin:

1. Clone this repo
2. Delete the .git folder
3. Replace filler values
   a) Every instance of `<REPLACE_ME>` can be directly substitued for the name of the new plugin. However beware, things like github paths are for the salesforcecli Github organization
   b) Search for case-matching `REPLACE` to find other filler values, such as for the plugin description
4. Use `git init` to set up the desired git information
5. Follow the getting started steps below until the `sfdx hello:org` commmand is functioning

&lt;REPLACE ME DESCRIPTION END&gt;

## Learn about the plugin-generate

Salesforce CLI plugins are based on the [oclif plugin framework](<(https://oclif.io/docs/introduction.html)>). Read the [plugin developer guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_architecture_sf_cli.htm) to learn about Salesforce CLI plugin development.

This repository contains a lot of additional scripts and tools to help with general Salesforce node development and enforce coding standards. You should familiarize yourself with some of the [node developer packages](https://github.com/forcedotcom/sfdx-dev-packages/) used by Salesforce. There is also a default circleci config using the [release management orb](https://github.com/forcedotcom/npm-release-management-orb) standards.

Additionally, there are some additional tests that the Salesforce CLI will enforce if this plugin is ever bundled with the CLI. These test are included by default under the `posttest` script and it is recommended to keep these tests active in your plugin, regardless if you plan to have it bundled.

# Everything past here is only a suggestion as to what should be in your specific plugin's description

This plugin is bundled with the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli). For more information on the CLI, read the [getting started guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm).

We always recommend using the latest version of these commands bundled with the CLI, however, you can install a specific version or tag if needed.

## Install

```bash
sfdx plugins:install <REPLACE_ME>@x.y.z
```

## Issues

Please report any issues at https://github.com/forcedotcom/cli/issues

## Contributing

1. Please read our [Code of Conduct](CODE_OF_CONDUCT.md)
2. Create a new issue before starting your project so that we can keep track of
   what you are trying to add/fix. That way, we can also offer suggestions or
   let you know if there is already an effort in progress.
3. Fork this repository.
4. [Build the plugin locally](#build)
5. Create a _topic_ branch in your fork. Note, this step is recommended but technically not required if contributing using a fork.
6. Edit the code in your fork.
7. Write appropriate tests for your changes. Try to achieve at least 95% code coverage on any new code. No pull request will be accepted without unit tests.
8. Sign CLA (see [CLA](#cla) below).
9. Send us a pull request when you are done. We'll review your code, suggest any needed changes, and merge it in.

### CLA

External contributors will be required to sign a Contributor's License
Agreement. You can do so by going to https://cla.salesforce.com/sign-cla.

### Build

To build the plugin locally, make sure to have yarn installed and run the following commands:

```bash
# Clone the repository
git clone git@github.com:salesforcecli/plugin-<REPLACE_ME>

# Install the dependencies and compile
yarn install
yarn build
```

To use your plugin, run using the local `./bin/dev` or `./bin/dev.cmd` file.

```bash
# Run using local run file.
./bin/dev <REPLACE_ME>
```

There should be no differences when running via the Salesforce CLI or using the local run file. However, it can be useful to link the plugin to do some additional testing or run your commands from anywhere on your machine.

```bash
# Link your plugin to the sfdx cli
sfdx plugins:link .
# To verify
sfdx plugins
```

## Commands

<!-- commands -->

- [`sf generate project`](#sf-generate-project)

## `sf generate project`

Generate a Salesforce DX project.

```
USAGE
  $ sf generate project -n <value> [--json] [-p <value>] [-x] [-s <value>] [-d <value>] [-t standard|empty|analytics]

FLAGS
  -d, --output-dir=<value>           [default: .] Directory to store the newly created project files.
  -n, --name=<value>                 (required) Name of the generated project.
  -p, --default-package-dir=<value>  [default: force-app] Default package directory name.
  -s, --namespace=<value>            Project associated namespace.
  -t, --template=<option>            [default: standard] Template to use to create the project.
                                     <options: standard|empty|analytics>
  -x, --manifest                     Generate a manifest (package.xml) for change-set based development.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Generate a Salesforce DX project.

  A Salesforce DX project has a specific structure and a configuration file (sfdx-project.json) that identifies the
  directory as a Salesforce DX project. This command generates the basic scaffolding to get you started.

  By default, the generated sfdx-project.json file sets the sourceApiVersion property to the default API version
  currently used by Salesforce CLI. To specify a different version, set the apiVersion configuration variable. For
  example:

  sf config set apiVersion=53.0 --global

EXAMPLES
  Generate a project called MyProject:
  ​
  $ sf generate project --name MyProject
  ​

  Generate the minimum number of files and directories:
  ​
  $ sf generate project --name MyProject --template empty
  ​

  Generate the project in /Users/jdoe/sf-projects rather than the current directory:
  ​
  $ sf generate project --name MyProject --template empty --output-dir /Users/jdoe/sf-projects

FLAG DESCRIPTIONS
  -d, --output-dir=<value>  Directory to store the newly created project files.

    The location can be an absolute path or relative to the current working directory.

  -n, --name=<value>  Name of the generated project.

    Creates a project directory with this name. Also sets the "name" property in the sfdx-project.json file to this
    name.

  -p, --default-package-dir=<value>  Default package directory name.

    The default package directory name. Metadata items such as classes and Lightning bundles are placed inside this
    folder.

  -s, --namespace=<value>  Project associated namespace.

    The namespace associated with this project and any connected scratch orgs.

  -t, --template=standard|empty|analytics  Template to use to create the project.

    The template determines the sample configuration files and directories that this command generates. For example, the
    empty template provides these files and directory to get you started.

    - .forceignore
    - config/project-scratch-def.json
    - sfdx-project.json
    - package.json
    - force-app (basic source directory structure)

    The standard template provides a complete force-app directory structure so you know where to put your source. It
    also provides additional files and scripts, especially useful when using Salesforce Extensions for VS Code. For
    example:

    - .gitignore: Use Git for version control.
    - .prettierrc and .prettierignore: Use Prettier to format your Aura components.
    - .vscode/extensions.json: When launched, Visual Studio Code, prompts you to install the recommended extensions for
    your project.
    - .vscode/launch.json: Configures Replay Debugger.
    - .vscode/settings.json: Additional configuration settings.

    The analytics template provides similar files and the force-app/main/default/waveTemplates directory.

  -x, --manifest  Generate a manifest (package.xml) for change-set based development.

    Generates a default manifest (package.xml) for fetching Apex, Visualforce, Lightning components, and static
    resources.
```

<!-- commandsstop -->
