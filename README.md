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

### Accounts at GitHub and Azure

A GitHub account. You can create one for free at <https://github.com/>.

An Azure account. You can create one for free at <https://portal.azure.com/>.

## Building and Running the Code

### `yarn start`

Start a local Azure Functions host. This command also installs Node modules, cleans the distribution folder and builds the code. This will make HTTP endpoints available at <http://localhost:7071/api/...>.

### `yarn test` and `yarn test-e2e`

Run the tests. The TypeScript code is compiled on the fly when running the tests, so it is not necessary to build the code first. There a two types of tests: Local tests and end-to-end tests. The end-to-end tests verifies that the endpoints on Azure works, so they require that the code has been published to Azure.

### `yarn build`

Build the solution. This compiles the TypeScript files in the `src` folder into the JavaScript in the `dist` folder, and copies all `.json` files from `src` to `dist`. The distribution folder is deleted before building to make sure that renamed files are removed.

### `yarn lint`

Lint the code. If you're using VSCode and have the recommended extension installed, errors will be underlined with green squiggly lines.

## Continuous Deployment

Continuous deployment is done with [GitHub Actions](https://docs.github.com/en/actions), and configured in `validate-and-publish.yml`.

The run scripts `test-save-results` and `test-e2e-save-results` run the same tests as their counterparts without the `-save-results` postfix, but stores the result in a `test-results` folder so that the GitHub Action can display a summary.

## Casting to `any` in Tests

The mock library Substitute has a known issue in that it [doesn't work in strict null checking mode](https://github.com/ffMathy/FluffySpoon.JavaScript.Testing.Faking#strict-mode). In order to avoid the compiler error the mocked interfaces are cast to `any` when calling the `returns` method. This makes the code when working with mocked interfaces a bit ugly, but I think this is a better solution than turning off `strickNullChecks`.
