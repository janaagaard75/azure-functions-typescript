# Azure Function in TypeScript

Demo of a [Microsoft Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) written in [TypeScript](https://www.typescriptlang.org/).

I am writing an article series [Azure Function in TypeScript](https://janaagaard.com/blog/2019-06-12-azure-functions-in-typescript) documenting the creation of this repo.

## Prerequisites

### LTS version of Node.js

Azure Functions require a long term support (LTS) version of Node.js - that's a version where the major version number is even. Node 10 currently the newest LTS version.

    brew install node@10
    brew link node@10 --force --overwrite

### Yarn

Yarn is a better npm. I am especially a fan of the really fast installs on a system that is up to date, because this allows you to always run `yarn install` before building, making sure that you are using the correct versions of the Node modules.

    brew install yarn

## Running the Code

Start a local Azure Functions host. This will make HTTP endpoints available at <http://localhost:7071/api/...>.

    yarn start
