# ProjectDescription

create a Salesforce DX project

# ProjectLongDescription

Creates a Salesforce DX project in the specified directory or the current working directory. The command creates the necessary configuration files and folders.

# ProjectNameFlagDescription

name of the generated project

# ProjectNameFlagLongDescription

The name for the new project. Any valid folder name is accepted.

# OutputDirFlagDescription

folder for saving the created files

# OutputDirFlagLongDescription

The directory to store the newly created files. The location can be an absolute path or relative to the current working directory. The default is the current directory.

# ProjectTemplateFlagDescription

template to use for project creation

# ProjectTemplateFlagLongDescription

The template to use to create the project. Supplied parameter values or default values are filled into a copy of the template.

# ProjectNamespaceFlagDescription

project associated namespace

# ProjectNamespaceFlagLongDescription

The namespace associated with this project and any connected scratch orgs.

# ProjectPackageFlagDescription

default package directory name

# ProjectPackageFlagLongDescription

The default package directory name. Metadata items such as classes and Lightning bundles are placed inside this folder.

# ProjectManifestFlagDescription

generate a manifest (package.xml) for change-set based development

# ProjectManifestFlagLongDescription

Generates a default manifest (package.xml) for fetching Apex, Visualforce, Lightning components, and static resources.

# ProjectLoginUrlDescription

Salesforce instance login URL

# ProjectLoginUrlLongDescription

The login URL for the Salesforce instance being used. Normally defaults to https://login.salesforce.com.

# HelpDefaults

If not supplied, the apiversion, template, and outputdir use default values.

# HelpOutputDirRelative

The outputdir can be an absolute path or relative to the current working directory.

# HelpOutputDirRelativeLightning

If you don’t specify an outputdir, we create a subfolder in your current working directory with the name of your bundle. For example, if the current working directory is force-app and your Lightning bundle is called myBundle, we create force-app/myBundle/ to store the files in the bundle.

# HelpExamplesTitle

Examples:

# TargetDirOutput

target dir = %s
