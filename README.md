# azure-functions-typescript

Demo of a [Microsoft Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) written in [TypeScript](https://www.typescriptlang.org/).

According to the documentation, TypeScript is ["supported through transpiling to JavaScript"](https://docs.microsoft.com/en-us/azure/azure-functions/supported-languages#languages-in-runtime-1x-and-2x), but there is no official information about how to do this. This repository shows one way to do it.

The path chosen here is to compile the TypeScript to JavaScript using [Webpack](https://webpack.js.org/). Webpack not only compiles the files, but it also imports all the referenced Node modules in the file output files. This means that there is no need to install any Node modules on Azure, so `package.json` is not distributed along with the compile code.

## Prerequisites

### LTS version of Node.js

Azure Functions require and LTS version of Node.js, that is a version with an even major version number. Node 10 currently the newest LTS version.

    brew install node@10
    brew link node@10 --overwrite --force

### Yarn

Yarn is a better npm. I am especially a fan of the really fast installs on a system that is up to date, because this allows you to always run `yarn install` before building, making sure that you are using the correct versions of the Node modules.

    brew install yarn

### Azure Function Core Tools

The `func` command.

    brew install azure-functions-core-tools

## Running

Fire up a local Azure Functions environment. This will make the `greet` endpoint available at <http://localhost:7071/api/greet>.

    yarn start

TODO: Explain the following commands:

    yarn build
    yarn clean
    yarn test

## Repository Structure

TODO

- Mention `src` and `dist`.
- Explain how files are transformed from one folder structure to the other.
- Explain the requirement from Azure's about how to structure the project.
- Explain how it could be necessary to include `package.json` and why everything is in `devDependency`.

## Adding a New Function

- Add the folder with the `function.json` file.
- Add the function to `webpack.config.js`.

## To Do

- Prettier.
- TSLint.
- Move some logic to an external file.
- Continuous deployment to Azure through CircleCI.
- Use a Node module.
- Better type definition for the functions. (HttpResponse is missing.)
- Protect the master branch?
- Rollup?
- Husky?
- Danger?