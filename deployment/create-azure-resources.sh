#!/bin/bash

if [[ $# -eq 0 ]] ; then
  echo "Specify the name of the branch as an argument."
  echo "Example: The following command will create the resource group azure-functions-typescript-development."
  echo ""
  echo "    $ create-azure-resources.sh development"
  echo ""
  exit 1
fi

# Create a resource group.
resource_group_name="azure-functions-typescript-$1"
echo "Creating resource group $resource_group_name."
az group create \
  --location "northeurope" \
  --name $resource_group_name

# Create the resources.
script_folder="$( cd "$(dirname ${BASH_SOURCE[0]})"; pwd -P )"
template_file=$script_folder/azure-resources-template.json
now=date +"%Y%m%d-%H%M%S"
echo "Creating resources in resource group $resource_group_name."
az group deployment create \
  --mode Complete \
  --name "CircleCI-$now" \
  --resource-group $resource_group_name \
  --template-file $template_file \
  --verbose
