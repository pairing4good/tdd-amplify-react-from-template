# TDD AWS Amplify React App

![Security Checks](https://github.com/pairing4good/react-18-project-template/actions/workflows/codeql-analysis.yml/badge.svg)
![React Tests](https://github.com/pairing4good/react-18-project-template/actions/workflows/node.js.yml/badge.svg)
![Cypress Tests](https://github.com/pairing4good/react-18-project-template/actions/workflows/cypress.yml/badge.svg)


In this tutorial we will [test drive](https://en.wikipedia.org/wiki/Test-driven_development) a react app which will use [AWS Amplify](https://aws.amazon.com/amplify) to set up authentication and the backend API.

<details>
  <summary>Approach</summary>
 
## Approach
Test driving an application often starts at the bottom of the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html) in [unit tests](https://en.wikipedia.org/wiki/Unit_testing). Unit tests focus on testing small units of code in isolation. However, this tutorial will start at the top of the pyramid with user interface (UI) testing. This approach is often called [Acceptance Test Driven Development](https://en.wikipedia.org/wiki/Acceptance_test%E2%80%93driven_development) (ATDD).

There are a few benefits of starting at the top of the testing pyramid:

1. Quick Feedback: Demonstrate a working system to the customer faster
1. Customer Focus: Low level code clearly ties to high level customer value
1. System Focus: The architecture evolves and expands on green.
</details>

<details>
  <summary>Set Up</summary>

- Download and install [Visual Studio Code](https://code.visualstudio.com/)
- Open VS Code and set up the ability to [launch VS Code from the terminal](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) 
- Install [Node Version Manager](https://github.com/nvm-sh/nvm). `nvm` allows you to quickly install and use different versions of node via the command line.
- Run `nvm install node` to install the latest version of node
- Run `nvm use node` to use the latest version of node
- Use the [pairing4good/tdd-react-18-template](https://github.com/pairing4good/tdd-react-18-template) template.  Follow the [Usage](https://github.com/pairing4good/tdd-react-18-template#usage) instructions and name the project `tdd-amplify-react`.
</details>
