# azure-functions-typescript

Demo of a [Microsoft Azure Function](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) written in [TypeScript](https://www.typescriptlang.org/).

According to the documentation, TypeScript is ["supported through transpiling to JavaScript"](https://docs.microsoft.com/en-us/azure/azure-functions/supported-languages#languages-in-runtime-1x-and-2x), but there is no official information about how to do this. This repository shows one way to do it.

The path chosen here is to compile the TypeScript to JavaScript using [Webpack](https://webpack.js.org/). Webpack not only compiles the files, but it also imports all the referenced Node modules in the file output files. This means that there is no need to install any Node modules on Azure, so `package.json` is not distributed along with the compile code.

## Prerequisites

### LTS version of Node.js

Azure Functions require and LTS version of Node.js, that is a version where the major version number is even. Node 10 currently the newest LTS version.

    brew install node@10
    brew link node@10 --overwrite --force

### Yarn

Yarn is a better npm. I am especially a fan of the really fast installs on a system that is up to date, because this allows you to always run `yarn install` before building, making sure that you are using the correct versions of the Node modules.

    brew install yarn

### Azure Function Core Tools

The `func` command.

    brew install azure-functions-core-tools

## Running

Fire up a local Azure Functions environment. This will make the `greet` endpoint available at <http://localhost:7071/api/greet>. It is possible to debug the code within Visual Studio Code from the Debug view.

    # Host the functions locally.
    yarn start

Run the local tests. The tests are compiled on the fly, so it is not necessary to build the project first. Adding the `:ci` postfix runs the tests in continuous integration mode, saving the results of the tests in the `/test-results` folder.

    # Run the local tests.
    yarn test:local
    # Run the local tests in continuous integration mode.
    yarn test:local:ci

Run the Azure tests. These tests require that the code has been published to Azure, e.g. because they are verifying that the endpoint works. Note that these tests are executed after the code has been deployed in `config.yml`.

    # Run the Azure tests.
    yarn test:local
    # Run the Azure tests in continuous integration mode.
    yarn test:local:ci

Build, lint and prettify the solution. In order to make the builds deterministic the output directory is deleted and dependencies are installed before building. Linting and prettifying the code is handled automatically by the recommended extensions for VSCode.

    # Build the code.
    yarn build
    # Lint the code.
    yarn lint
    # Prettify the code.
    yarn prettify

## TODO: Repository Structure

- Mention `src` and `dist`.
- Explain how files are transformed from one folder structure to the other.
- Explain the requirement from Azure's about how to structure the project.
- Explain how it could be necessary to include `package.json` and why everything is in `devDependency`.

## Adding a New Function

- Add the folder with the `function.json` file.
- Add the function to `webpack.config.js`.

## TODO

- Move some logic to an external file as a proof of concept.
- Use a Node module or two as a proof of concept.
- Better type definitions for the functions. (HttpResponse is missing.)
- Set the main branch to `production`.
- Protect the main branch. This can only be done once the project has become public.
- Pre-commit for Prettier? See <https://prettier.io/docs/en/precommit.html>.
- Document the solution.
- Validate the branch names since they are used for naming the resource group.
- Organize `config.yml` by splitting into multiple jobs.

## Documentation

- Remember `sourceMap: true` in `tsconfig.json`.
- A note about the recommended extensions.
- Something about setting up Azure?
- Configuring Jest.
