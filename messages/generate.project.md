# summary

Generate a Salesforce DX project.

# description

A Salesforce DX project has a specific structure and a configuration file (sfdx-project.json) that identifies the directory as a Salesforce DX project. This command generates the basic scaffolding to get you started.

By default, the generated sfdx-project.json file sets the sourceApiVersion property to the default API version currently used by Salesforce CLI. To specify a different version, set the apiVersion configuration variable. For example:
sf config set apiVersion=53.0 --global

# examples

- Generate a project called MyProject:
  ​
  <%= config.bin %> <%= command.id %> --name MyProject
  ​
- Generate the minimum number of files and directories:
  ​
  <%= config.bin %> <%= command.id %> --name MyProject --template empty
  ​
- Generate the project in /Users/jdoe/sf-projects rather than the current directory:
  ​
  <%= config.bin %> <%= command.id %> --name MyProject --template empty --output-dir /Users/jdoe/sf-projects

# flags.name.summary

Name of the generated project.

# flags.name.description

Creates a project directory with this name. Also sets the "name" property in the sfdx-project.json file to this name.

# flags.template.summary

Template to use to create the project.

# flags.template.description

The template determines the sample configuration files and directories that this command generates. For example, the empty template provides these files and directory to get you started.

- .forceignore
- config/project-scratch-def.json
- sfdx-project.json
- package.json
- force-app (basic source directory structure)

  The standard template provides a complete force-app directory structure so you know where to put your source. It also provides additional files and scripts, especially useful when using Salesforce Extensions for VS Code. For example:

- .gitignore: Use Git for version control.
- .prettierrc and .prettierignore: Use Prettier to format your Aura components.
- .vscode/extensions.json: When launched, Visual Studio Code, prompts you to install the recommended extensions for your project.
- .vscode/launch.json: Configures Replay Debugger.
- .vscode/settings.json: Additional configuration settings.

  The analytics template provides similar files and the force-app/main/default/waveTemplates directory.

# flags.output-dir.summary

Directory to store the newly created project files.

# flags.output-dir.description

The location can be an absolute path or relative to the current working directory.

# flags.namespace.summary

Project associated namespace.

# flags.namespace.description

The namespace associated with this project and any connected scratch orgs.

# flags.default-package-dir.summary

Default package directory name.

# flags.default-package-dir.description

The default package directory name. Metadata items such as classes and Lightning bundles are placed inside this folder.

# flags.manifest.summary

Generate a manifest (package.xml) for change-set based development.

# flags.manifest.description

Generates a default manifest (package.xml) for fetching Apex, Visualforce, Lightning components, and static resources.

# flags.login-url.summary

Salesforce instance login URL.

# flags.login-url.description

The login URL for the Salesforce instance being used. Normally defaults to https://login.salesforce.com.
