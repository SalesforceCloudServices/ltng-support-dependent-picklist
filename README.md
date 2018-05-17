# INTERNAL NOTES

Wait, what is this?

This is meant to be a simple starting point for creating Lightning demo projects



# Structure of the project

* doc - documentation resources
  * images - images for documentation
* data - data used in demo
  * queries - queries used in extracting data for demos
  * trees - data trees used for demos
* dx - salesforce dx project
* mdapi - mdapi version of dx project

# How do I use this?

**If using windows: We're in the middle of migrating to a salesforce cli plugin shortly. Please see the How do I use this manual steps below**

**1.** Download the raw shellscript here:
[https://github.com/SalesforceCloudServices/ltng-support-demo-template/blob/createTemplateProject/createTemplateProject.sh](https://github.com/SalesforceCloudServices/ltng-support-demo-template/blob/createTemplateProject/createTemplateProject.sh)

Place it in a folder that you'll want to store your templates. (The template will be cloned and checked out in the same folder)

**2.** Create a github project within the [SalesforceCloudServices Github](https://github.com/SalesforceCloudServices/) <br />
with a name similar to: `ltng-support-NAME_OF_DEMO` <br />
(for example: ltng-support-url-hack)

And copy your new project name.

**(The script will clone the project for you, and populate master for you)**
	
**3.** Run the Shellscript and follow the prompts

	./createTemplateProject.sh
	
	... yadda yadda - remember to make a repo ...
	
	What is the name of the new repository? (ex: ltng-support-url-hack)
	ltng-support-my-project-name
	
	
	The git repository URL is expected to be:
	git@github.com:SalesforceCloudServices/ltng-support-my-project-name.git
	Is this correct? [Y/N]
	y
	
	
	This repository already seems to exist.
	Should we continue? [Y/N]
	y
	
	...
	
	Cloning into 'ltng-support-lds-responsive'...
	
	...
	
	renaming and adding origins
	
	...
	
	pushing project master
	
	...
	
	creating the dx project
	
	...	
	
	-- Your project  has been created
	
	
# How do I use this: Manual Steps

We're in the middle of transitioning from shellscript to a salesforce cli plugin that will accomplish the same as the shellscript.

The manual steps below do the same as the shellscript.

**1.** clone this repository where you will keep your templates:

	git clone git@github.com:SalesforceCloudServices/ltng-support-demo-template.git
	
**2.** import to your demo repo of a similar name: ltng-support-NAME_OF_DEMO

**3.** Create a Salesforce DX project in the 'dx' folder

	//-- newRepositoryName would be the ltng-support-NAME_OF_DEMO
	//-- ex: newRepositoryName="ltng-support-bootstrap"
	sfdx force:project:create --projectname "${newRepositoryName}" -d dx
	
**4.** Rename the org in `dx/config/project-scratch-def.json`
	Change "orgName" value in the JSON to a better name of your scratch org (such as ltng-support-NAME_OF_DEMO)

**5.** Create a scratch org to prepare and store your demo

	// -a [[How you would like to identify the org]]
	// -s [[make the project a default
	// -v [[name of the alias of the lightning support org]]
	// -d [[duration - in days]]
	// -f /path/to/project-scratch-def.json
	
	sfdx force:org:create -a SOME_ALIAS -s -v lightningSupport -d 20 -f dx/config/project-scratch-def.json
	
**6.** CLEANUP: Add `**.profiles` within dx/.forceignore, to ensure we do not track profiles (only permission sets)

# Quick Help:

**How do I create a dx project?** <br />
[sfdx force:project:create](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_project.htm#cli_reference_force_project)

**How do I run a script after installation?** <br />
[Create an Apex Class that implements InstallHandler](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/apex_post_install_script_create.htm)

**How do I convert the dx source to metadata api (mdapi folder)?**

	sfdx force:source:convert -r force-app -d ../mdapi

**How do I create a package?**

Be careful, you need to specify the --containeroptions/-o as Unlocked when you create it (and this cannot be changed)

--containeroptions/-o Unlocked
--name/-n Name of the package
--description/-d Description of the package
--targetdevhubusername/-v Alias of the Dev Hub

	ex:
	sfdx force:package2:create -o Unlocked -n ltng-support-url-hack -d "Demos of how to replace URL Hack Buttons in Lightning" -v lightningSupport
	
[See Here for more](https://trailhead.salesforce.com/en/modules/unlocked-packages-for-customers/units/build-your-first-unlocked-package)

**Then update the `sfddx-project.json` file**

Add the following to the `packageDirectories` element in that file:

	{
	  "packageDirectories": [ 
	    {
	      "path": "force-app",
	      "default": true,
	      -- add these items below
	      "id": "0Ho_xxx", -- your package2 ID (not subscriber)
	      "versionName": "Version 1.0",
	      "versionNumber": "1.0.0.NEXT"
	      -- add the items above
	    }
	  ],
	  "namespace": "",
	  "sfdcLoginUrl": "https://login.salesforce.com",
	  "sourceApiVersion": "42.0"
	}
	
**THEN you need to create a package version**

sfdx force:package2:version:create --directory force-app/ --wait 10

**How do I get my password again?**

sfdx force:user:display -u USERNAME

**How do I create a scratch org?**

	// -a [[How you would like to identify the org]]
	// -s [[make the project a default
	// -v [[name of the alias of the lightning support org]]
	// -d [[duration - in days]]
	// -f /path/to/project-scratch-def.json
	
	sfdx force:org:create -s -v lightningSupport -d 20 -f dx/config/project-scratch-def.json -a SOME_ALIAS


# DELETE EVERYTHING ABOVE WHEN READY

-----
-----
------
------
------
------
------


# Overview

Overview_of_what_the_project_represents

**Please note: sample code (metadata api and dx formats) are available in the [mdapi](./mdapi) and [dx](./dx) folders above**

# Record Edit Demo

![Gif Demo](doc/images/recordEditDemo.gif)

The [recommended workaround](https://success.salesforce.com/issues_view?id=a1p3A0000008gNBQAY) at the moment is to leverage [force:recordEdit](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/aura_compref_force_recordEdit.htm?search_text=force:recordEdit) components to provide dependent picklists (based on record types)

This provides dependent picklists that work with record types using the standard page layout - edit screens for that record.

# How

* Create a `force:recordEdit` component
  * Specify the record id
  * Specify a controller handler for `onSaveSuccess`
  * ex: <br />`<force:recordEdit aura:id="edit-form" ` <br /> ` recordId="{!v.recordId}"` <br /> ` onSaveSuccess="{!c.handleSaveSuccess}"` <br /> ` />`
* Create a button to initiate the save
  * `<lightning:button label="Save" onclick="{!c.handleSave}" />`
* Create a component controller
  * To handle the button click / start the save
      * `handleSave : function(component){` <br /> ` component.find("edit-form").get("e.recordSave").fire();` <br /> `}`
  * To handle the save completion
      * `handleSaveSuccess : function(component){` <br /> `$A.get('e.force:refreshView').fire();` <br /> `$A.get('e.force:closeQuickAction').fire();` <br /> `}`

**Note: this only specifies the record - and uses the current user's page layout.**

---

# Demo code overview

The metadata for this example can be found under the [mdapi](./mdapi) folder.

The Salesforce CLI version of this code can be found under the [dx](./dx) folder.

This can also be installed using Unlocked Packages (previously known as Developer Controlled Packages) in sandboxes using this url:

[url](url)

## Installing via the Salesforce CLI

This assumes you have already installed the [Salesforce CLI]() and [Connected the Salesforce CLI to your org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm).

However, the Salesforce CLI can be used with any org and does not require Salesforce DX to be enabled. (Although enabling the DX / Dev Hub would give some great benefits, and would only require care of [certain object permissions: Scratch Org Info, ActiveScratchOrg, NamespaceRegistry](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_add_users.htm) - as they are not available in all orgs)

**1.** Run the following command:

	sfdx force:mdapi:deploy -d mdapi -u [[orgAlias]] -w

**2.** Add the permission set to your user

	sfdx force:user:permset:assign -n DependentPicklistDemoParticipant -u [[orgAlias]]
	
**3.** Upload the data

	sfdx force:data:tree:import -f data/tree/ltng_DependentPicklistBase__c.json -u [[orgAlias]]
	
...

Thats it, you can now open the org, and find the 'ticket' object in the 'all tabs' search.

	sfdx force:org:open -u [[orgAlias]]

# Bit more detail...

More_detail_on_how_this_was_done

## Component

What_about_the_component

	sample code
	
