![Security Checks](https://github.com/pairing4good/react-18-project-template/actions/workflows/codeql-analysis.yml/badge.svg)
![React Tests](https://github.com/pairing4good/react-18-project-template/actions/workflows/node.js.yml/badge.svg)
![Cypress Tests](https://github.com/pairing4good/react-18-project-template/actions/workflows/cypress.yml/badge.svg)

## Usage

- Click the `Use this template` button on the top right
- Click on `Settings > Code security and analysis`
  - Enable `Dependabot alerts`
  - Enable `Dependabot security updates`
- Update badges at the top of the `README.md` to point to your new repositories GitHub Action results

```
![Security Checks](https://github.com/{username}/{repository}/actions/workflows/codeql-analysis.yml/badge.svg)
![React Tests](https://github.com/{username}/{repository}/actions/workflows/node.js.yml/badge.svg)
![Cypress Tests](https://github.com/{username}/{repository}/actions/workflows/cypress.yml/badge.svg)
```

- [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) your new repository
- Update the `name` of your application in the `package.json` file in the root of your repository
- Run `npm install`

## Approach

This starter template bootstraps your repository with coding standards, industry best practices and detects security vulnerabilities. This template provides fast code analysis and automated testing feedback loops so you can focus on solving problems.

## Code Analysis

This template uses [ESLint](https://eslint.org/) to analyze the code in this repository. [ESLint](https://eslint.org/) is configured in the `.eslintrc.json` file at the root of the repository. This template leverages 7 plugins that provide fast feedback on coding best practices and common pitfalls.

1. The default coding style guide was adopted from [Airbnb](https://github.com/airbnb/javascript)
2. [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
3. [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
4. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
5. [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
6. [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
7. [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)

At the bottom of the `.eslintrc.json` file `"react/react-in-jsx-scope": "off"` is added to the `rules` section. This linting rule was disabled because it is no longer accurate starting in [React v17](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

`"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]` is also added to the `rules` section. This [linting rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) includes the `.js` file extension as a valid extension for JSX files.

To run [ESLint](https://eslint.org/) run the command `npm run lint`. [ESLint](https://eslint.org/) can also automatically fix problems by running `npm run lint:fix`.

If you are using [VSCode](https://code.visualstudio.com/) adding the ESLint (dbaeumer.vscode-eslint) plugin provides live feedback as you are writing code.  Faster feedback loops help team members learn team style guidelines faster and avoid delays while committing.

## Credentials Check

It's all too common for developers to accidentally commit usernames and or passwords into their repository. This can lead to significant security vulnerabilities and even lead to security breaches. [Secretlint](https://github.com/secretlint/secretlint) is a pluggable linting tool that prevents developers from committing their credentials. [Secretlint](https://github.com/secretlint/secretlint) is configured in the `.secretlintrc.json` file at the root of this repository.

To run [Secretlint](https://github.com/secretlint/secretlint) run the command `npm run secretlint`.

## NPM Package Audit

The `npm audit` command checks the dependencies configured in `package.json` for vulnerabilities. In rare circumstances some vulnerabilities need to be temporarily ignored while the open source library community works on a fix. Unfortunately `npm audit` does not provide this ability. However, the [better-npm-audit](https://github.com/jeemok/better-npm-audit) library does. The `.nsprc` file at the root of this repository configures temporary exceptions. If this need arises be sure to use the [expiry](https://github.com/jeemok/better-npm-audit#using-nsprc-file-to-manage-exceptions) field to set a date when this vulnerability will be reevaluated by your team. **Avoid ignoring audit level [critical](https://docs.npmjs.com/cli/v8/commands/npm-audit#audit-level) vulnerabilities. These vulnerabilities should be addressed immediately.**

## Reformatting Code

[ESLint](https://eslint.org/)'s auto fix command reformats your files to fit the configured [ESLint](https://eslint.org/) rules. [Prettier](https://prettier.io/) provides configurable coding style rules. [Prettier](https://prettier.io/) rules are configured in the `.prettierrc` file at the root of this repository. By running the command `npm run lint:fix` the [Prettier](https://prettier.io/) rules will be included in the [ESLint](https://eslint.org/) formatting rules. It's important that teams have clear coding standards and libraries like [Prettier](https://prettier.io/) can help teams configure and adhere to their own standards.

## Testing Pyramid
Products that are [test driven](https://en.wikipedia.org/wiki/Test-driven_development) have lower [defect](https://en.wikipedia.org/wiki/Software_bug) rates.  Teams that distribute test coverage according to the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html) build products that are easier to change.  The `App.test.js` test uses the [React Test Renderer](https://reactjs.org/docs/test-renderer.html) which uses the [React](https://reactjs.org/) framework to render a [Component](https://reactjs.org/docs/react-component.html).  The use of [React Test Renderer](https://reactjs.org/docs/test-renderer.html) [integrates](https://martinfowler.com/bliki/IntegrationTest.html) the framework's rendering capabilities with the plain `App.js` component.  Therefore, this test fits in the middle of the pyramid.  These tests are a bit slower and more costly to maintain than completely isolated [unit tests](https://martinfowler.com/bliki/UnitTest.html) at the bottom of the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html).  

[Cypress](https://www.cypress.io/) tests fit at the top of the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html).  They are the slowest to run and the most expensive to write, run and maintain.  Nevertheless, these tests are vital for the success of any healthy product.  Teams should limit these tests to 5 - 10 of the most common [happy paths](https://en.wikipedia.org/wiki/Happy_path) through the product.  To run [Cypress](https://www.cypress.io/) test open a terminal window and run `npm start` to start the application.  Once the application is started, open a second terminal window and run `npm run cypress:run`.  If you wish to use the [Cypress Launchpad](https://docs.cypress.io/guides/getting-started/opening-the-app) run `npm run cypress:open` instead.

## Code Coverage

Test automation is essential for longterm product health. Each test exercises the application and ensures that it behaves the way that the customer expects. As products grow it's not uncommon to have tens of thousands of [unit tests](https://martinfowler.com/bliki/UnitTest.html) that run in a few milliseconds. Beyond [unit tests](https://martinfowler.com/bliki/UnitTest.html) teams invest in [integration tests](https://martinfowler.com/bliki/IntegrationTest.html) and [user interface testing](https://martinfowler.com/bliki/TestPyramid.html). Teams that are committed to [test driving](https://en.wikipedia.org/wiki/Test-driven_development) code often write thoughtful tests that provide comprehensive product test coverage.

Code coverage verification can be useful for teams to identify test coverage holes within their product. These thresholds simply identify if a line of code was exercised by a test. However, it cannot determine if the test coverage is exercising the code in a meaningful way. Code coverage thresholds only identify test coverage gaps and should not be used as a substitute for a strong team culture of [test driving](https://en.wikipedia.org/wiki/Test-driven_development) code.

This repository uses the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). By default [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is configured to use [Jest](https://jestjs.io/) under the hood. Within [Jest](https://jestjs.io/), [test coverage thresholds](https://jestjs.io/docs/configuration#coveragethreshold-object) are set in the `jest.config.js` file at the root of this repository.

[Cypress](https://www.cypress.io/) tests are not included in code coverage metrics.  End-to-end, full-stack integration tests often touch significant amounts of code without providing the level of coverage that thoughtful unit or integration tests provide lower in the testing pyramid.  While they serve a crucial role in holistic testing, they don't contribute to test coverage calculations.

## Checks Before Committing

This template uses [Husky](https://typicode.github.io/husky) to verify the code before it’s committed to [git](https://git-scm.com/). The `.husky/pre-commit` file is run before a `git commit` is completed. This file configures and runs coding style, test coverage, and security check verifications prior to committing code to git.

[Git](https://git-scm.com/) only commits [staged](https://githowto.com/staging_and_committing) files. If [Husky](https://typicode.github.io/husky) reformatted all files whether they were [staged](https://githowto.com/staging_and_committing), or not, it would frequently change files that were not [staged](https://githowto.com/staging_and_committing).  These unstaged files would fail to be committed. To solve this problem, [Husky](https://typicode.github.io/husky) uses the [lint-staged](https://github.com/okonet/lint-staged) library to only run formatting rules against staged files. The commands that are run with [lint-staged](https://github.com/okonet/lint-staged) library are configured in the `.lintstagedrc.json` file at the root of this repository.

To run [lint-staged](https://github.com/okonet/lint-staged) run the command `npm run lint-staged`.

Before each commit, [Husky](https://typicode.github.io/husky) runs 5 commands:

1. `npm run lint-staged` - automatically fixes all the linting rules that can be auto-resolved and reformatts files with Prettier
2. `npm run test:coverage` - runs all the tests and checks the coverage threshold
3. `npm run lint` - checks the code against all of the linting rules
4. `npm run secretlint` - checks for secrets within the code
5. `npm run audit` - checks for package vulnerabilities

Note: [Cypress](https://www.cypress.io/) tests are not run by [Husky](https://typicode.github.io/husky) prior to a commit because they are slow.  Once your code is pushed up to GitHub, the [Cypress](https://www.cypress.io/) tests will be run as part of the [GitHub Actions](https://docs.github.com/en/actions) [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) build.

## Continuous Integration Builds
This template uses [GitHub Actions](https://docs.github.com/en/actions) to run [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) builds after each push and pull request within GitHub.

- `.github/workflows/codeql-analysis.yml` sets up [code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/configuring-code-scanning) for your repository.
- `.github/workflows/node.js.yml` runs tests against your code.
- `.github/workflows/cypress.yml` runs cypress tests against your code.
