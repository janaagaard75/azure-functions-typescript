#!/bin/bash

if [[ $# -eq 0 ]]; then
  echo "Specify the name of the branch as an argument."
  echo ""
  echo "    $ create-azure-resources.sh branch-name"
  echo ""
  exit 1
fi

# Create a resource group.
resource_group_name="azure-functions-typescript-$1"
resource_group_name=${resource_group_name//[\.\/_]/-}
echo "Creating resource group $resource_group_name."
az group create \
  --location "northeurope" \
  --name $resource_group_name

# Create the resources.
script_folder="$( cd "$(dirname ${BASH_SOURCE[0]})"; pwd -P )"
template_file=$script_folder/azure-resources.json
now=`date +"%Y%m%d-%H%M%S"`
deployment_name="CircleCI-$now"
echo "Creating resources in resource group $resource_group_name with deployment $deployment_name."
az group deployment create \
  --mode Complete \
  --name $deployment_name \
  --resource-group $resource_group_name \
  --template-file $template_file \
  --verbose
