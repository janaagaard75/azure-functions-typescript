#!/bin/bash

if [[ $# -eq 0 ]] ; then
  echo "Specify the name of the functions app to publish."
  echo ""
  echo "    $ publish-to-azure.sh development"
  echo ""
  exit 1
fi

script_folder="$( cd "$(dirname ${BASH_SOURCE[0]})"; pwd -P )"
cd $script_folder/../dist

func_command="$script_folder/../node_modules/.bin/func"
resource_group_name="azure-functions-typescript-$1"
functions_name=`az resource list -g $resource_group_name | grep -o -E '"name": "aft-.*-functions"' | grep -o -E "aft-.*-functions"`
echo "Publishing to $functions_name."
$func_command azure functionapp publish $functions_name
