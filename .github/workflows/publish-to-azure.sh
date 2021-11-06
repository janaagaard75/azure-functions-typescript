#!/bin/bash

if [[ $# -eq 0 ]]; then
  echo "Specify the name of the functions app to publish."
  echo ""
  echo "    $ publish-to-azure.sh branch-name"
  echo ""
  exit 1
fi

script_folder="$( cd "$(dirname ${BASH_SOURCE[0]})"; pwd -P )"
root_folder="$script_folder/../.."
cd $root_folder/dist

func_command="$root_folder/node_modules/.bin/func"
resource_group_name="azure-functions-typescript-$1"
resource_group_name=${resource_group_name//[\.\/_]/-}
# There is probably a simpler way to extract functions_name from the returned JSON.
functions_name=`az resource list -g $resource_group_name | grep -o -E '"name": "aft-.*-functions"' | grep -o -E "aft-.*-functions"`
echo "Publishing to $functions_name."
$func_command azure functionapp publish $functions_name
