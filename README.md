# azure-functions-typescript

Demo of a [Microsoft Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) written in [TypeScript](https://www.typescriptlang.org/).

According to the documentation, TypeScript is ["supported through transpiling to JavaScript"](https://docs.microsoft.com/en-us/azure/azure-functions/supported-languages#languages-in-runtime-1x-and-2x), but there is no official about how to do this. This repository show one way to do it.

## Prerequisites

### LTS version of Node.js

Azure Functions require and LTS version of Node.js, that is a version with an even major version number. Node 10 currently the newest LTS version.

    brew install node@10
    brew link node@10 --overwrite --force

### Azure Function Core Tools

The `func` command.

    brew install azure-functions-core-tools

## Running

Fire up a local Azure Functions environment. This will make the `greet` endpoint available at <http://localhost:7071/api/greet>.

    func host start