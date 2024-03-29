# TDD AWS Amplify React App

![Security Checks](https://github.com/pairing4good/tdd-amplify-react-from-template/actions/workflows/codeql-analysis.yml/badge.svg)
![React Tests](https://github.com/pairing4good/tdd-amplify-react-from-template/actions/workflows/node.js.yml/badge.svg)

In this tutorial we will [test drive](https://en.wikipedia.org/wiki/Test-driven_development) a [React](https://reactjs.org/) app which will use [AWS Amplify](https://aws.amazon.com/amplify) to set up authentication and the backend API.
 
## Approach
Test driving an application often starts at the bottom of the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html) in [unit tests](https://en.wikipedia.org/wiki/Unit_testing). Unit tests focus on testing small units of code in isolation. However, this tutorial will start at the top of the pyramid with user interface (UI) testing. This approach is often called [Acceptance Test Driven Development](https://en.wikipedia.org/wiki/Acceptance_test%E2%80%93driven_development) (ATDD).

There are a few benefits of starting at the top of the testing pyramid:

1. Quick Feedback: Demonstrate a working system to the customer faster
1. Customer Focus: Low level code clearly ties to high level customer value
1. System Focus: The architecture evolves and expands on green.


<details>
  <summary>Set Up</summary>
  
## Set Up

- Download and install [Visual Studio Code](https://code.visualstudio.com/)
- Open VS Code and set up the ability to [launch VS Code from the terminal](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)
- Install [Node Version Manager](https://github.com/nvm-sh/nvm). `nvm` allows you to quickly install and use different versions of node via the command line.
- Run `nvm install node` to install the latest version of node
- Run `nvm use node` to use the latest version of node

- If you haven't already, [create](https://docs.github.com/en/github/getting-started-with-github/signing-up-for-github/signing-up-for-a-new-github-account) a GitHub account

- Use the [pairing4good/tdd-react-18-template](https://github.com/pairing4good/tdd-react-18-template) template.

- Click the `Use this template` button on the top right of [pairing4good/tdd-react-18-template](https://github.com/pairing4good/tdd-react-18-template)
- Click on `Settings > Code security and analysis` on your new repository
  - Enable `Dependabot alerts`
  - Enable `Dependabot security updates`
- Update badges at the top of the `README.md` to point to your new repositories GitHub Action results

```
![Security Checks](https://github.com/{username}/{repository}/actions/workflows/codeql-analysis.yml/badge.svg)
![React Tests](https://github.com/{username}/{repository}/actions/workflows/node.js.yml/badge.svg)
![Cypress Tests](https://github.com/{username}/{repository}/actions/workflows/cypress.yml/badge.svg)
```

- Update the `name` of your application in the `package.json` file in the root of your repository

- [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) your new repository

</details>

<details>
  <summary>Big & Visible</summary>
 
## Big & Visible Progress

Create a new [Project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project) and [add it to your repository](https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-your-project/adding-your-project-to-a-repository).  Select the `Board` [layout](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/quickstart-for-projects#adding-a-board-layout).  As you add stories,  each story will be moved accross the board from `ToDo` to `In Progress` to `Done`.  We show this progress so that anyone inside or outside the team can quickly see the progress that we are making.
 
## README
The `README.md` file is the first thing anyone sees when they open this repository.  It's important to update your readme to include the following:
 1. Title
 1. Description of your product
 1. Install and run instructions
 
</details>
 
<details>
  <summary>First Test</summary>

## First Test

### Why: User Story

```
As a team member
I want to capture a note
So that I can refer back to it later
```

### What: User Acceptance Criteria

```
Given that no notes are entered
When nothing is saved
Then no notes should be listed
```

```
Given that one note exists
When a note is saved
Then two notes should be listed
```

```
Given a note exists
When the application is opened
Then a note is listed
```
 
### Add Story to Kanban Board
Add this story to your [Kanban board](https://en.wikipedia.org/wiki/Kanban).  
- Click the `+ Add item` link at the bottom of the `Todo` column
- Enter the short description of `Capture Note`
- Type `Enter`
- Click on the story name `Capture Note`
- Click the `Edit` link within the `description` section
- Add the `As a`, `I want`, `So that` user story above
- After the user story add an acceptance criteria section with the heading `Acceptance Criteria:`
- Below that title add the `Given`, `When`, `Then` criteria
- Click the `Update comment` button
- Click the `x` button on the top right
- Drag this new story from the `Todo` column into the `In Progress` column
 
 This provides big and visible progress for everyone inside and outside the team.  Teams meet around this board [daily](https://en.wikipedia.org/wiki/Stand-up_meeting#Three_questions) to align, formulate a plan for the day, and make any impediments big and visible.

### Red - Acceptance Test

The user story and acceptance criteria above describe a desired customer outcome. The user acceptance test will link this narrative with a high level how. For this tutorial our first application will be a [web application](https://en.wikipedia.org/wiki/Web_application) built with [React](https://reactjs.org). The testing framework use to test this will be [Cypress](https://www.cypress.io)

Since we are starting at the top of the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html) and working our way down let's delete the `src/App.test.js` test and we will add relevant tests later in the tutorial.

- Rename `cypress/e2e/app.cy.js` to `cypress/e2e/note.cy.js`
- Open the `cypress/e2e/note.cy.js` file
- Replace the contents of this file with the following

```js
beforeEach(() => {
  cy.visit('/');
});

describe('Note Capture', () => {
  it('should create a note when name and description provided', () => {
    cy.get('[data-testid=note-name-field]').type('test note');
    cy.get('[data-testid=note-description-field]').type('test note description');
    cy.get('[data-testid=note-form-submit]').click();

    cy.get('[data-testid=test-name-0]').should('have.text', 'test note');
    cy.get('[data-testid=test-description-0]').should('have.text', 'test note description');
  });
});
```

- Run `npm install`
- Run `npm run cypress:test`

- These commands are looking for elements on a webpage that contains a `data-testid` attribute with the value that follows the `=`. We now have a failing acceptance test.

```
Timed out retrying after 4000ms: Expected to find element: [data-testid=note-name-field], but never found it.
```

- Our objective now is to make this test go green (pass) in as few steps as possible. The goal is not to build a perfectly designed application but rather to make this go green and then [refactor](https://en.wikipedia.org/wiki/Code_refactoring) the architecture through small incremental steps.

### Green - Acceptance Test

The first step to making this failing test go green is adding an element with one of the `data-testid`'s to the `src/App.js` file.

```js
import './App.css';

function App() {
  return (
    <div className="App">
      <input data-testid="note-name-field" />
    </div>
  );
}

export default App;
```

- Now the Cypress test fails on the second field

```
Timed out retrying after 4000ms: Expected to find element: [data-testid=note-description-field], but never found it.
```

- Add the next `input` field and rerun the test
- Now the Cypress test fails on the submit button

```
Timed out retrying after 4000ms: Expected to find element: [data-testid=note-form-submit], but never found it.
```

- Add the `button` element with the expected `data-testid`

```js
<input data-testid="note-name-field"/>
<input data-testid="note-description-field"/>
<button data-testid="note-form-submit" type="button">
    Submit
</button>
```

- Now the Cypress test fails on the missing list of created notes

```
Timed out retrying after 4000ms: Expected to find element: [data-testid=test-name-0], but never found it.
```

In test driven development we do the simplest thing possible to make a test go green. Once it is green then and only then do we go back and refactor it. In this case, the simplest thing that we can do is hard-code the expected values on the screen.

```js
<input data-testid="note-name-field"/>
<input data-testid="note-description-field"/>
<button data-testid="note-form-submit" type="button">
    Submit
</button>
<p data-testid="test-name-0">test note</p>
```

- Now the Cypress test fails on the note description

```
Timed out retrying after 4000ms: Expected to find element: [data-testid=test-description-0], but never found it.
```

- Add the final element for `test-description-0`

```js
import './App.css';

function App() {
  return (
    <div className="App">
      <input data-testid="note-name-field" />
      <input data-testid="note-description-field" />
      <button data-testid="note-form-submit" type="button">
        Submit
      </button>
      <p data-testid="test-name-0">test note</p>
      <p data-testid="test-description-0">test note description</p>
    </div>
  );
}

export default App;
```

- While this is far from a useful application, this application can be:
  1. refactored on green
  2. used to get feedback from the customer

### Refactor - Acceptance Test

> Refactoring is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior. - Martin Fowler

The key to refactoring is to not change its "external behavior". In other words, after every change we make the test must remain green.

One "internal structure" change that could help, is pulling this form out into a [react component](https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) so that we can drive these changes independently. Eventually `App.js` will have several components:

```js
<div className="App">
  <Header />
  <NoteForm />
  <NoteList />
  <Footer />
</div>
```

So let's pull out a `NoteForm` component.

- Create a new file called `NoteForm.js` in the `src` directory

```js
function NoteForm() {
  return <div>//your form goes here</div>;
}

export default NoteForm;
```

- This is a [React functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components)
- The `export default` is the way to [export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) only one object in [ES6](https://en.wikipedia.org/wiki/ECMAScript)

- Copy the form from `App.js` and paste it into the `div` in `NoteForm.js`

```js
<div>
  <input data-testid="note-name-field" />
  <input data-testid="note-description-field" />
  <button data-testid="note-form-submit" type="button">
    Submit
  </button>
  <p data-testid="test-name-0">test note</p>
  <p data-testid="test-description-0">test note description</p>
</div>
```

- Replace the form contents in `App.js` with `<NoteForm />` and add an import for the `NoteForm`

```js
import './App.css';
import NoteForm from './NoteForm';

function App() {
  return (
    <div className="App">
      <NoteForm />
    </div>
  );
}

export default App;
```

- Rerun you Cypress test and it is green

Congratulations, you've successfully made an internal structural change "without changing its external behavior" (Refactoring).

</details>

<details>
  <summary>NoteForm Test</summary>

## NoteForm Test

Now that we have a high-level Cypress test in place, let's move down the testing pyramid into a component test. This test will use the React Testing Library's [render](https://testing-library.com/docs/react-testing-library/cheatsheet/) function to render the `NoteForm` component and assert its contents.

Before we show this new form to our customer we need to test drive:

- the button's name
- helpful input descriptions

- First create a `test` directory in the `src` directory
- Create a file called `NoteForm.test.js` in the new `test` directory

### Button Test

- In this new test file add a test that will drive the button name

```js
test('should display a create note button', () => {});
```

- The test name should be conversational and intent revealing. It should avoid technical words like "render", "component", and the like. We want a new team member to be able to read this test and understand the customer value. The body of the test will provide the technical HOW but the test name should point to the customer's WHY and WHAT.

- Now we will add a test that renders the component and asserts that the button is labeled "Create Note". For more information on the React Testing Library visit https://testing-library.com/docs

```js
import { render, screen } from '@testing-library/react';
import NoteForm from '../NoteForm';

test('should display a create note button', () => {
  render(<NoteForm />);
  const button = screen.getByTestId('note-form-submit');

  expect(button).toHaveTextContent('Create Note');
});
```

- Run `npm run test` and one test will fail

```
Expected element to have text content:
  Create Note
Received:
  Submit
```

- In order to make this pass add the expected text content to the button

```js
<button data-testid="note-form-submit" type="button">
  Create Note
</button>
```

- The test automatically reruns once the change is saved. This is accomplished through jest's [watch](https://jestjs.io/docs/cli) mode.
- **Be sure to always commit on green**. We value working code. `Green Code = Working Code`

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/6f0a5f6fc23f032f8ce8e548b56ba3d4bb769e4f)

### Name Input Test

- Test drive the label for the name input.

```js
test('should display the name placeholder', () => {
  render(<NoteForm />);
  const input = screen.getByTestId('note-name-field');

  expect(input).toHaveAttribute('placeholder', 'Note Name');
});
```

- Make this red test go green

```js
<input data-testid="note-name-field" placeholder="Note Name" />
```

- Commit on Green. And always be looking for ways to refactor your code. Small improvements over time are easier to make than large changes when your code is a mess.

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/24fbaf7fc4ded7daa4af169961853abbebaa82f2)

### Description Input Test

- Test drive the label for the description input.

```js
test('should display the description placeholder', () => {
  render(<NoteForm />);
  const input = screen.getByTestId('note-description-field');

  expect(input).toHaveAttribute('placeholder', 'Note Description');
});
```

- Make this red test go green

```js
<input data-testid="note-description-field" placeholder="Note Description" />
```

- Commit on Green.

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/ea1861b8ca295103312db32cc5667111b531d9ba)

### Refactor

Every test starts with `render(<NoteForm />)`. Let's extract this duplicated set up code and place it in the test setup.

```js
beforeEach(() => {
  render(<NoteForm />);
});

test('should display a create note button', () => {
  const button = screen.getByTestId('note-form-submit');

  expect(button).toHaveTextContent('Create Note');
});
```

- We added a [beforeEach](https://reactjs.org/docs/testing-recipes.html#setup--teardown) set up function.
- Green!
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/7fcbf5cd73f1f7b0895c5df680eee4c42eeabe48)

</details>

<details>
  <summary>Saving A Note</summary>

## Saving A Note

So far we've only test driven the notes form and the ability to display a note.  Now let's test drive the ability to save notes.

### User Acceptance Criteria

```
Given that no notes are entered
When nothing is saved
Then no notes should be listed
```

```
Given that one note exists
When a note is saved
Then two notes should be listed
```

```
Given a note exists
When the application is opened
Then a note is listed
```

These three user acceptance criteria will drive the need to actually save notes. While this can be achieved through component tests, let's add this to our high-level UI test. These tests are often called end-to-end tests because they follow a few paths through the application. These tests are at the top of the testing pyramid because they tend to be slower and more brittle than tests that are lower in the pyramid. This translates into these end-to-end tests tending to cost more to build, run and maintain. Consequently, we try to limit their number to only a few tests that follow the most common paths through the system.

- Let's start with the first acceptance criteria. To achieve this we need to add an initial check, in `note.cy.js`, to verify that no notes are listed prior to entering a note.

```js
it('should create a note when name and description provided', () => {
  cy.get('[data-testid=test-name-0]').should('not.exist');
  cy.get('[data-testid=test-description-0]').should('not.exist');

  cy.get('[data-testid=note-name-field]').type('test note');
  cy.get('[data-testid=note-description-field]').type('test note description');
  cy.get('[data-testid=note-form-submit]').click();

  cy.get('[data-testid=test-name-0]').should('have.text', 'test note');
  cy.get('[data-testid=test-description-0]').should('have.text', 'test note description');
});
```

- Run `npm run cypress:test`
- Now we have a failing test to drive new functionality

There are a number of ways that we could make this go green but React [State Hooks](https://reactjs.org/docs/hooks-state.html) are one of the simplest ways to achieve this outcome.

- Import the `useState` hook at the top of `App.js`

```js
import React, { useState } from 'react';
```

- Initialize an empty list of notes inside the `App` function

```js
function App() {
  const [notes] = useState([]);

  return (
    <div className="App">
      <NoteForm />
    </div>
  );
}
```

- Pass the notes as a property to the `NoteForm` component

```js
return (
  <div className="App">
    <NoteForm notes={notes} />
  </div>
);
```

- Now in `NoteForm.js` use the notes property that was passed to it to list the existing notes

```js
import PropTypes from 'prop-types';

function NoteForm(props) {
  const { notes } = props;

  return (
    <div>
      <input data-testid="note-name-field" placeholder="Note Name" />
      <input data-testid="note-description-field" placeholder="Note Description" />
      <button data-testid="note-form-submit" type="button">
        Create Note
      </button>
      {notes.map((note, index) => (
        <div>
          <p data-testid={`test-name-${index}`}>{note.name}</p>
          <p data-testid={`test-description-${index}`}>{note.description}</p>
        </div>
      ))}
    </div>
  );
}

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default NoteForm;
```

_Note: [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) is a recommended practice for components that take parameters. As your app grows, typechecking will help prevent alot of issues._

While this satisfied the first acceptance criteria, now the second acceptance criteria fails.

```
expected [data-testid=test-name-0] to have text test note, but the text was ''
```

- In order to save notes you must

1. Save the note name and description form data when each field is changed
2. Save the form data once the `Create Note` button is clicked

- To achieve this we will need to add more state hooks

```js
const [notes, setNotes] = useState([]);
const [formData, setFormData] = useState({ name: '', description: '' });
```

- Now we need to pass these hooks to the `NoteForm` component

```js
<div className="App">
  <NoteForm
    notes={notes}
    formData={formData}
    setFormDataCallback={setFormData}
    setNotesCallback={setNotes}
  />
</div>
```

Using these variables and callback functions can be a bit overwhelming so we will look at each element in the `NoteForm` component one at a time.

- Add an `onChange` attribute to the `note-name-field` element

```js
import PropTypes from 'prop-types';

function NoteForm(props) {
  const { notes, setFormDataCallback, formData } = props;

  return (
    <div>
      <input
        data-testid="note-name-field"
        onChange={(e) =>
          setFormDataCallback({
            ...formData,
            name: e.target.value
          })
        }
        placeholder="Note Name"
      />
      ...
    </div>
  );
}

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired,
  setFormDataCallback: PropTypes.func.isRequired,
  formData: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }).isRequired
};

export default NoteForm;
```

- **When `...` is on a line by itself, in a code example, it means that I have not provided all of the code from that file. Please be careful to copy each section that is separated by `...`'s and use them in the appropriate part of your files.**

- The `onChange` function is called every time the name is changed.

  - The `e` is the event which is used to get the target element which contains the value that the user entered.
  - The [=>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) is an arrow function expression which is an alternative to a traditional javascript function expression.
  - The rest of the function is a call to the `setFormData` hook that we passed to the `NoteForm` component. If this were not spread across 3 lines it would read more like this `setFormDataCallback({'name': 'some value'})`. Granted there is one more thing happening in this call, the existing form data is being [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) with the `...` syntax. Simply put we are creating a new javascript object by opening and closing with curly braces. Add all of the existing form data prior to the change. And finally add the new `name` value which will overwrite the form data that was spread. There is a lot going on in this small function.

- Add an `onChange` attribute to the `note-description-field` element

```js
<input
  data-testid="note-description-field"
  onChange={(e) =>
    setFormDataCallback({
      ...formData,
      description: e.target.value
    })
  }
  placeholder="Note Description"
/>
```

- This is exactly the same as the name `onChange` function with the exception of the target value's field name `'description'`.

- Add an `onClick` attribute to the `note-form-submit` element

```js
import PropTypes from 'prop-types';

function NoteForm(props) {
  const { notes, setFormDataCallback, formData, setNotesCallback } = props;

  return (
    <div>
      ...
      <button
        data-testid="note-form-submit"
        type="button"
        onClick={() => setNotesCallback([...notes, formData])}>
        Create Note
      </button>
      ...
    </div>
  );
}

NoteForm.propTypes = {
  ...
  setNotesCallback: PropTypes.func.isRequired,
  ...
};

export default NoteForm;
```

- The `onClick` function is called every time the `Create Note` button is clicked
  - The `setNotesCallback` callback is called with a new [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) that contains all of the existing notes pulse the note that we just entered.
- Rerun the Cypress test and it is Green.

- However if you run `npm run test` the non-UI tests are failing.

```
TypeError: Cannot read property 'map' of undefined
```

- The `NoteForm.test.js` component test does not pass any parameters to the component so the `notes` is [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined). In order to fix this test we must pass an array of `notes` to the `NoteForm` component.

```js
beforeEach(() => {
  render(<NoteForm notes={[]} />);
});
```

- The simplest thing that you can do is pass an empty array to `NoteForm`. And the tests pass.

- All of our tests are Green!
- Don't forget to commit your changes

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/919e8f43902e04922035b5be20ecdc0f02d32598)

</details>

<details>
  <summary>Refactor - Single Responsibility</summary>

## Refactor - Single Responsibility

> The [Single Responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle) Principle (SRP) states that each software module should have one and only one reason to change. - Robert C. Martin

Now it's clear that the `NoteForm` component has more than one responsibility:

```js
function NoteForm(props) {
  return (
    <div>
      // 1. Note Creation
      <input
        data-testid="note-name-field"
        onChange={(e) =>
          setFormDataCallback({
            ...formData,
            name: e.target.value
          })
        }
        placeholder="Note Name"
      />
      <input
        data-testid="note-description-field"
        onChange={(e) =>
          setFormDataCallback({
            ...formData,
            description: e.target.value
          })
        }
        placeholder="Note Description"
      />
      <button data-testid="note-form-submit" onClick={() => setNotesCallback([...notes, formData])}>
        Create Note
      </button>
      // 2. Note Listing
      {notes.map((note, index) => (
        <div>
          <p data-testid={'test-name-' + index}>{note.name}</p>
          <p data-testid={'test-description-' + index}>{note.description}</p>
        </div>
      ))}
    </div>
  );
}
```

If you go up to the `App` component the call to the `NoteForm` component takes 4 arguments. This is a [smell](https://en.wikipedia.org/wiki/Code_smell) indicating that this component is doing too many things.

```js
<NoteForm
  notes={notes}
  formData={formData}
  setFormDataCallback={setFormData}
  setNotesCallback={setNotes}
/>
```

> Functions should have a small number of arguments. No argument is best, followed by one, two, and three. More than three is very questionable and should be avoided with prejudice. - Robert C. Martin

While components don't look like functions, they are. React uses [JSX](https://reactjs.org/docs/introducing-jsx.html) which is interpreted into [JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

### Note List Component

Let's pull out a `NoteList.js` component in order to separate these responsibilities.

- Create a new file called `NoteList.js` under the `src` directory.

```js
function NoteList(props) {

  return (

  );
}

export default NoteList;
```

- Cut the JSX, that lists notes in the `NoteForm` component, and paste it into the new component.

```js
import PropTypes from 'prop-types';

function NoteList(props) {
  const { notes } = props;

  return (
    <div>
      {notes.map((note, index) => (
        <div>
          <p data-testid={`test-name-${index}`}>{note.name}</p>
          <p data-testid={`test-description-${index}`}>{note.description}</p>
        </div>
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired
};

export default NoteList;
```

- Now instead of adding the `NoteList` component back into the `NoteForm` component, bring it up a level and place it in the `App` component. This prevents unnecessary [coupling](<https://en.wikipedia.org/wiki/Coupling_(computer_programming)>) between the `NoteForm` component and the `NoteList` component.

```js
import React, { useState } from 'react';
import './App.css';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  return (
    <div className="App">
      <NoteForm
        notes={notes}
        formData={formData}
        setFormDataCallback={setFormData}
        setNotesCallback={setNotes}
      />
      <NoteList notes={notes} />
    </div>
  );
}

export default App;
```

- Run all of your tests including Cypress.
- It's Green!

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/3485fe154dd94dd7393a133812153fb912112b79)

</details>

<details>
  <summary>Testing NoteList Component</summary>

## Testing NoteList Component

As we refactor, we need to remember what level of testing we have written within the testing pyramid. While we have a few far reaching tests at the top of the pyramid, don't think that they adequately test the behavior of each component. The bottom of the testing pyramid is wide because it provides broad test coverage.

Now that `NoteList` is broken out into its own focused component it will be much easier to test.

- Create a new `NoteList.test.js` under the `src/test/` directory.

### Test No Notes

- Write a test that verifies that no notes are rendered when no notes are provided

```js
import { render, screen } from '@testing-library/react';
import NoteList from '../NoteList';

test('should display nothing when no notes are provided', () => {
  render(<NoteList notes={[]} />);
  const firstNoteName = screen.queryByTestId('test-name-0');

  expect(firstNoteName).toBeNull();
});
```

- Write a test that verifies that one note is rendered

```js
test('should display one note when one notes is provided', () => {
  const note = { name: 'test name', description: 'test description' };
  render(<NoteList notes={[note]} />);

  const firstNoteName = screen.queryByTestId('test-name-0');
  expect(firstNoteName).toHaveTextContent('test name');

  const firstNoteDescription = screen.queryByTestId('test-description-0');
  expect(firstNoteDescription).toHaveTextContent('test description');
});
```

- Write a test that verifies that multiple notes are rendered

```js
test('should display multiple notes when more than one notes is provided', () => {
  const firstNote = { name: 'test name 1', description: 'test description 1' };
  const secondNote = { name: 'test name 1', description: 'test description 1' };
  render(<NoteList notes={[firstNote, secondNote]} />);

  const firstNoteName = screen.queryByTestId('test-name-0');
  expect(firstNoteName).toHaveTextContent('test name');

  const firstNoteDescription = screen.queryByTestId('test-description-0');
  expect(firstNoteDescription).toHaveTextContent('test description');

  const secondNoteName = screen.queryByTestId('test-name-1');
  expect(secondNoteName).toHaveTextContent('test name');

  const secondNoteDescription = screen.queryByTestId('test-description-1');
  expect(secondNoteDescription).toHaveTextContent('test description');
});
```

- Write a test that verifies an exception is thrown when a list is not provided.

This may seem unnecessary but it's important to test negative cases too. Tests not only provide accountability and quick feedback loops for the [application under test](https://en.wikipedia.org/wiki/System_under_test) but it also provides [living documentation](https://en.wikipedia.org/wiki/Living_document) for new and existing team members.

```js
test('should throw an exception the note array is undefined', () => {
  expect(() => {
    render(<NoteList />);
  }).toThrow();
});
```

- All of your non-UI tests are Green.
- Don't forget to rerun your Cypress tests. Green!
- Commit on Green.

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/103591f86e885ea97c272d7645bee746c921337a)

</details>

<details>
  <summary>Usability</summary>

## Usability

Customers rarely ask explicitly for a usable product. In this application rich world, that we live in, it's assumed that applications will be delivered with common sense [usability](https://en.wikipedia.org/wiki/Usability) baked-in. When I look at the application as it stands, a few things pop out at me.

1. Header - there's no heading telling you what this application does
1. Form Validation - there's no form field validation
1. Reset Form - after a note is created the form fields are not reset

### Header

- Create a new file `Header.js` in the `src` directory

```js
function Header() {

  return (

  );
}

export default Header;
```

- Let's test drive this component
- Create a new file `Header.test.js` in the `src/test` directory

```js
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('should display header', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent('My Notes App');
});
```

- We have a failing test.
- Let's make it pass

```js
function Header() {
  return <h1>My Notes App</h1>;
}

export default Header;
```

- It's Green!
- Commit your code!

### Hook Up Header

Even though the component is test driven and ready to be used, we have not used it yet outside the test. Let's drive this change through the Cypress test.

- Add a test that asserts the header

```js
it('should have header', () => {
  cy.get('h1').should('have.text', 'My Notes App');
});
```

- It fails
- Add the component to the `App` component

```js
return (
  <div className="App">
    <Header />
    <NoteForm
      notes={notes}
      formData={formData}
      setFormDataCallback={setFormData}
      setNotesCallback={setNotes}
    />
    <NoteList notes={notes} />
  </div>
);
```

- It's Green!
- Commit!

You will notice that in the TDD testing cycle we commit very small bits of working code. We commit all the time. While this may seem like overkill, here are some benefits.

1. Our commit messages tell a focused, step-by-step story that explains why we made each change.
1. We are preserving working code. ["Working software is the primary measure of progress."](https://agilemanifesto.org/principles.html)
1. We can [revert](<https://en.wikipedia.org/wiki/Reversion_(software_development)>) our changes back to a known working state without losing very many changes.

This last benefit is worth expounding upon. The TDD testing cycle keeps us laser focused on writing small pieces of working functionality. In fact, the [3 Laws of TDD](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) prevent us from writing more code than is necessary to satisfy a focused test.

#### Three Laws of TDD

1. You must write a failing test before you write any production code.
1. You must not write more of a test than is sufficient to fail, or fail to compile.
1. You must not write more production code than is sufficient to make the currently failing test pass.

These tight feedback loops help software developers avoid going down rabbit holes that lead to [over-engineering](https://en.wikipedia.org/wiki/Overengineering).

### Form Validation

Let's assume that the note's name and description are both required fields. While you want the customer driving decisions about your product, one way to gather customer feedback is to launch-and-learn. Your customers will tell you if they don't like your decision. As software developers we must be obsessed with our customers. Set up a regular cadence to meet with your customers and demonstrate a working application. Make space for them to let you know what they think.

In order to test drive validation we need to determine where in the testing pyramid to write this test. Remember that the highest-level tests are slow and expensive, so limit these tests to between 3 to 5 tests that walk through the most common user experiences. In order to adequately test all of the combinations of good and bad fields, these tests would not be well suited for UI testing.

#### Name and Description Blank

- Add a test to `NoteForm.test.js`

```js
import { render, screen, fireEvent } from '@testing-library/react';
...
const setNotesCallback = jest.fn();
const formData = { name: '', description: '' };

beforeEach(() => {
  render(<NoteForm notes={[]} setNotesCallback={setNotesCallback} formData={formData} />);
});

...

test('should require name and description', () => {
  const button = screen.getByTestId('note-form-submit');

  fireEvent.click(button);

  expect(setNotesCallback.mock.calls.length).toBe(0);
});
```

- This test checks to see if the jest [mock function](https://jestjs.io/docs/mock-functions) was called. In this test the note's name and description are blank so a new note should not be created and added to the list of notes.
- We have a failing test.

```js
function NoteForm(props) {
  ...
  function createNote() {
    if (!formData.name || !formData.description) return;
    setNotesCallback([...notes, formData]);
  }

  return (
    <div>
      ...
      <button data-testid="note-form-submit" type="button" onClick={createNote}>
        Create Note
      </button>
    </div>
  );
}
```

- Green!
- Rerun your Cypress tests.
- Commit!

#### Name And Description Required

- Add the following tests to `NoteForm.test.js`

```js
test('should require name when description provided', () => {
  formData.description = 'test description';
  formData.name = '';

  const button = screen.getByTestId('note-form-submit');

  fireEvent.click(button);

  expect(setNotesCallback.mock.calls.length).toBe(0);
});

test('should require description when name provided', () => {
  formData.description = '';
  formData.name = 'test name';

  const button = screen.getByTestId('note-form-submit');

  fireEvent.click(button);

  expect(setNotesCallback.mock.calls.length).toBe(0);
});

test('should add a new note when name and description are provided', () => {
  formData.description = 'test description';
  formData.name = 'test name';

  const button = screen.getByTestId('note-form-submit');

  fireEvent.click(button);

  expect(setNotesCallback.mock.calls.length).toBe(1);
});
```

- All of these tests go green with no additional production code changes.
- Rerun your Cypress tests.
- Commit!

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/a16de75f8e6db1ca57a4f08b798141a31e6e42e2)

</details>

<details>
  <summary>Reset Form</summary>

## Reset Form

When a note is saved the name and description fields should be reset to empty strings.

- Add a test to `NoteForm.test.js`

```js
test('should reset the form after a note is saved', () => {
  formData.name = 'test name';
  formData.description = 'test description';

  const button = screen.getByTestId('note-form-submit');

  fireEvent.click(button);

  expect(formData.name).toBe('');
  expect(formData.description).toBe('');
});
```

- Make this failing test go Green

```js
function createNote() {
  if (!formData.name || !formData.description) return;
  setNotesCallback([...notes, formData]);
  formData.name = '';
  formData.description = '';
}
```

- Green
- Run the Cypress tests and it's **Red**.

What happened? Well, while this approach worked for a lower level component test it doesn't work when React is managing its own [state](https://reactjs.org/docs/state-and-lifecycle.html). React clearly warns us that we should [not modify state directly](https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly). Instead you should use the [setState](https://reactjs.org/docs/hooks-state.html) callback hook.

- Let's update the test to use the `setFormDataCallback` callback.

```js
const setNotesCallback = jest.fn();
const setFormDataCallback = jest.fn();
const formData = { name: '', description: '' };

beforeEach(() => {
  render(
    <NoteForm
      notes={[]}
      setNotesCallback={setNotesCallback}
      setFormDataCallback={setFormDataCallback}
      formData={formData}
    />
  );
});
...
test('should reset the form after a note is saved', () => {
  formData.name = 'test name';
  formData.description = 'test description';

  const button = screen.getByTestId('note-form-submit');

  fireEvent.click(button);

  expect(setFormDataCallback).toHaveBeenCalledWith({
    name: '',
    description: ''
  });
});
```

- This red test drives these code changes

```js
function createNote() {
  if (!formData.name || !formData.description) return;
  setNotesCallback([...notes, formData]);
  setFormDataCallback({ name: '', description: '' });
}
```

- Green!
- The Cypress test is now Green!
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/96c4204b28a6ab5d8e178f7dd83e0b6bdbc7382c)

</details>

<details>
  <summary>Demo Your Application To Your Customer</summary>

## Demo Your Application To Your Customer

Be sure to start up your application and walk through it with your customers. When I was doing this, I noticed that the form is not resetting after a note is created. This is very annoying. In order to test drive this behavior I will add two additional assertions to the end of the UI test to verify that the form is reset.

```js
describe('Note Capture', () => {
  it('should create a note when name and description provided', () => {
    ...
    cy.get('[data-testid=note-form-submit]').click();

    cy.get('[data-testid=note-name-field]').should('have.value', '');
    cy.get('[data-testid=note-description-field]').should('have.value', '');

    cy.get('[data-testid=test-name-0]').should('have.text', 'test note');
    ...
  });

  ...
});
```

- This test now fails with

```
get [data-testid=note-name-field]
assert expected <input> to have value '', but the value was test note
```

- To make this pass we need to connect the name and description fields to the form data in `NoteForm.js`

```js
<input
  data-testid="note-name-field"
  ...
  value={formData.name}
  ...
/>
<input
  data-testid="note-description-field"
  ...
  value={formData.description}
  ...
/>
```

- Green! Commit!

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/ed91bcd31b2e613698456d345cf467934ecef9fe)

</details>

<details>
  <summary>Saving Notes For Real</summary>

## Saving Notes For Real

React creates a [single page web application](https://en.wikipedia.org/wiki/Single-page_application). This means that the React state does not [persist](<https://en.wikipedia.org/wiki/Persistence_(computer_science)>) beyond a web page refresh. In other words, if you refresh your browser page you will lose all of the notes you created.

Since Cypress tests the application in a browser, this is the most logical place to test this user expectation.

```js
it('should load previously saved notes on browser refresh', () => {
  cy.reload();

  cy.get('[data-testid=test-name-0]').should('have.text', 'test note');
  cy.get('[data-testid=test-description-0]').should('have.text', 'test note description');
});
```

- We now have a failing test. In order to save notes between page reloads we will use [localforage](https://www.npmjs.com/package/localforage).

- Run `npm install localforage`
- Add a callback function to `App.js` that will look up notes that are saved in `localforage`

```js
...
import localForage from 'localforage';
...
function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchNotesCallback = () => {
    localForage
      .getItem('notes')
      .then((savedNotes) => {
        if (savedNotes) return setNotes(savedNotes);
        return setNotes([]);
      })
      .catch((error) => {
        process.error('failed to setNotes', error.message);
      });
  };
  ...
```

- The `if` check determines if there are any saved notes in `localforage` and sets the `notes` accordingly.

- Add a callback function to `App.js` that will save newly created notes to `localforage`

```js
const createNote = () => {
  const updatedNoteList = [...notes, formData];
  setNotes(updatedNoteList);
  localForage.setItem('notes', updatedNoteList);
};
```

- Update the `NoteForm` component in `App.js` to take the new `createNote` callback function instead of calling the `setNotes` hook directly.

```js
<NoteForm
  notes={notes}
  formData={formData}
  setFormDataCallback={setFormData}
  setNotesCallback={createNote}
/>
```

- To load the saved notes when the application is loaded, add the [useEffect](https://reactjs.org/docs/hooks-effect.html#example-using-hooks) hook and call the `fetchNotesCallback` in `App.js`.

```js
import React, { useState, useEffect } from 'react';
...
useEffect(() => {
  fetchNotesCallback();
}, []);
```

- Lastly, make sure you clean up the persisted notes after the Cypress test is run.

```js
import localForage from 'localforage';
...
after(() => {
  localForage
    .clear()
    .then(() => true)
    .catch((error) => process.error('failed to clean up', error.message));
});
```

- All the tests are Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/302f32875ffb3a853489f000fe3eea05290a2ffb)

</details>

<details>
  <summary>Refactor To Repository</summary>

## Refactor To Repository

The `App` component now has two concerns. React [state management](https://en.wikipedia.org/wiki/State_management) and [persistence](<https://en.wikipedia.org/wiki/Persistence_(computer_science)>). [State management](https://en.wikipedia.org/wiki/State_management) is concerned with frontend values, where [persistence](<https://en.wikipedia.org/wiki/Persistence_(computer_science)>) is a backend concern. Persistence and data access concerns are often extracted into a [repository](https://makingloops.com/why-should-you-use-the-repository-pattern).

- Create a `NoteRepository.js` file in the `src` directory.
- Move all the `localForage` calls to this new file.

```js
import localForage from 'localforage';

export async function findAll() {
  return localForage.getItem('notes');
}

export async function save(note) {
  const notes = await localForage.getItem('notes');
  if (notes) await localForage.setItem('notes', [...notes, note]);
  else await localForage.setItem('notes', [note]);
}
```

- Update `App.js` to use the new `NoteRepository` functions

```js
import { findAll, save } from './NoteRepository';
...
const fetchNotesCallback = async () => {
  const retrievedNotes = await findAll();
  if (retrievedNotes) setNotes(retrievedNotes);
  else setNotes([]);
};

const createNote = async () => {
  const updatedNoteList = [...notes, formData];
  setNotes(updatedNoteList);
  await save(formData);
};
```

- Run all of the tests.
- Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/351c613e734c882d10966010d9ed3ea657e044d7)

</details>

<details>
  <summary>Set Up AWS Amplify</summary>

## Set Up AWS Amplify

We now have a fully functioning task creation application. When we showed this to our customer they provided some feedback. They would like:

- to secure this application with a user login
- notes to show up on their mobile phone browser too

While `localForage` provided a quick way to save notes and get valuable customer feedback, it isn't designed for secure, cross-device persistence. [Amazon Web Services](https://aws.amazon.com) does provide services that solve both of these [use cases](https://en.wikipedia.org/wiki/Use_case) and positions our React app for additional possibilities like [notifications](https://aws.amazon.com/sns), backend processing, storing note attachments, and much more. [AWS Amplify](https://aws.amazon.com/amplify) provides a set of tools that significantly simplify connection web and mobile applications to an AWS backend.

- Install the [Install the Amplify CLI](https://docs.amplify.aws/cli/start/install)
- Run `amplify init` at the root of the project

```
Project information
| Name: tddamplifyreact
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

Select the authentication method you want to use: AWS profile
Please choose the profile you want to use: default
```

- This command created the `amplify/` directory which contains Amplify configuration files.
- This command created the following resources on AWS
  - UnauthRole AWS::IAM::Role
  - AuthRole AWS::IAM::Role
  - DeploymentBucket AWS::S3::Bucket
  - amplify-tddamplifyreact-dev-12345

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/9354538c703ef519fa9de249637d63b9b01fc6b7)

</details>

<details>
  <summary>Add Authentication</summary>

## Add Authentication

- Run `npm install aws-amplify @aws-amplify/ui-react`
- Run `amplify add auth` at the root of your project

```
Do you want to use the default authentication and security configuration? Default configuration
How do you want users to be able to sign in? Username
Do you want to configure advanced settings? No, I am done.
```

- Run `amplify push --y`

- This command updated the following resources on AWS
  - amplify-tddamplifyreact-dev-x… AWS::CloudFormation::Stack
- This command created the following resources on AWS

  - authtddamplifyreactxxxxxxxx AWS::CloudFormation::Stack
  - UserPool AWS::Cognito::UserPool
  - UserPoolClientWeb AWS::Cognito::UserPoolClient
  - UserPoolClient AWS::Cognito::UserPoolClient
  - UserPoolClientRole AWS::IAM::Role
  - UserPoolClientLambda AWS::Lambda::Function
  - UserPoolClientLambdaPolicy AWS::IAM::Policy
  - UserPoolClientLogPolicy AWS::IAM::Policy
  - UserPoolClientInputs Custom::LambdaCallout
  - IdentityPool AWS::Cognito::IdentityPool
  - IdentityPoolRoleMap AWS::Cognito::IdentityPoolRoleAttachment

- Add the following just under the imports in the `src/index.js` file

```js
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);
```

- Add the following to the `App` component

```js
import { Authenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

function App() {
  ...
  return (
    <Authenticator>
      <div className="App">
        ...
      </div>
    </Authenticator>
  );
}

export default App;
```

While `import '@aws-amplify/ui-react/styles.css';` is required for the login screen to display correctly, the [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/blob/v2.26.0/docs/rules/no-unresolved.md) plugn lists it as unresolved. As a rule of thumb, avoid disabling any [ESLint](https://eslint.org/) rules. They almost always lead you to better code. However, this [Amplify UI component](https://docs.amplify.aws/ui/q/framework/react/) does not have a solution that I was able to find. In this rare circumstance, only disable a sigle line of code with `// eslint-disable-next-line import/no-unresolved`. That way [ESLint](https://eslint.org/) rules will be applied to the rest of the file.

- Run `npm start`

- Open http://localhost:3000
- Click the `Create account` link
- Create and Verify your new account
- Login to your App

- Run all your tests
- While the non-UI tests pass, the Cypress tests are **Red**.

### Cypress Login

The Cypress tests now need to log in to the notes app.

- Run `npm install cypress-localstorage-commands`
- Add the following to the bottom of the `cypress/support/commands.js` file

```js
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */

import 'cypress-localstorage-commands';

const { Auth } = require('aws-amplify');

const username = Cypress.env('username');
const password = Cypress.env('password');
const userPoolId = Cypress.env('userPoolId');
const clientId = Cypress.env('clientId');

const awsconfig = {
  aws_user_pools_id: userPoolId,
  aws_user_pools_web_client_id: clientId
};

Auth.configure(awsconfig);

Cypress.Commands.add('signIn', () => {
  cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
    const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;

    const makeKey = (name) => `CognitoIdentityServiceProvider
        .${cognitoUser.pool.clientId}
        .${cognitoUser.username}.${name}`;

    cy.setLocalStorage(makeKey('accessToken'), accessToken);
    cy.setLocalStorage(makeKey('idToken'), idToken);
    cy.setLocalStorage(
      `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
      cognitoUser.username
    );
  });
  cy.saveLocalStorage();
});
```

- Create a new file at the root of your project named `cypress.env.json` with the following content

```json
{
  "username": "[Login username you just created]",
  "password": "[Login password you just created]",
  "userPoolId": "[The `aws_user_pools_id` value found in your `src/aws-exports.js`]",
  "clientId": "[The `aws_user_pools_web_client_id` value found in your `src/aws-exports.js`]"
}
```

- Update the `cypress.env.json` values with your own values.
- Add the `cypress.env.json` to `.gitignore` so that it will not be committed and pushed to GitHub

```
...
# cypress
cypress/screenshots
cypress/videos
cypress.env.json
...
```

- Add the following setups and teardowns to `cypress/integration/note.cy.js`

```js
before(() => {
  cy.signIn();
});

after(() => {
  cy.clearLocalStorageSnapshot();
  cy.clearLocalStorage();
  localForage.clear();
});

beforeEach(() => {
  cy.restoreLocalStorage();
  cy.visit('/');
});

afterEach(() => {
  cy.saveLocalStorage();
});
```

- Rerun all of your tests.
- Green!
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/1f88ec2a2ddceb5161ef64a04b9cbceacc0a7855)

</details>

<details>
  <summary>Fix Continuous Integration Build</summary>
  
  ## Failing Continuous Integration Build

While all the tests pass locally, on my machine, the Cypress tests are breaking on GitHub with the following error

```
Module not found: Error: Can't resolve './aws-exports' in '/home/runner/work/tdd-amplify-react-from-template/tdd-amplify-react-from-template/src'
```

The `aws-exports` file was created and added to the `.gitignore` file in the `Set Up AWS Amplify` section of this tutorial. Once we added `import config from './aws-exports';` to the `src/index.js` file we required `aws-exports` for testing. Since we added this file to `.gitignore` it was not committed or pushed up to [GitHub](https://github.com/). As a result, the [GitHub Action](https://docs.github.com/en/actions) tests are failing.

In order for these tests to pass [GitHub Action](https://docs.github.com/en/actions) would need access to Amplify, configure Amplify on the build machine and have the ability to deploy the backend to Amplify. Instead of setting up this tight coupling from [GitHub](https://github.com/) to [AWS Amplify](https://aws.amazon.com/amplify), we will utilize the [build process](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html) provided within [Amplify](https://aws.amazon.com/amplify). This will be set up in the next section.

For now, let's remove the [Cypress]() tests from [GitHub Actions](https://docs.github.com/en/actions) and the build badge from the `README.md` file.

- Delete the `.github/workflows/cypress.yml` file
- Remove `![Cypress Tests](https://github.com/pairing4good/tdd-amplify-react-from-template/actions/workflows/cypress.yml/badge.svg)` from the top of the `README.md` file.

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/5788564a7b9aaad1a44b54c9ec4551a18f548443)

</details>

<details>
  <summary>Notes App Deployment</summary>

## Notes App Deployment

Amplify provides the ability to [deploy](https://docs.amplify.aws/guides/hosting/git-based-deployments/q/platform/js), build, run tests and host your application ([Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery))

- Be sure to [push](https://docs.github.com/en/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line) your local changes up to your GitHub account

- Log In to your http://console.aws.amazon.com
- Open `AWS Amplify`
- Open the backend that you just pushed up (`amplify push --y`).
- Open the `Hosting environments` tab
- Select `GitHub` and `Connect branch`
- Connect Amplify with your GitHub account
- Select the GitHub repository where your code is stored
- Complete the set up, save and deploy.

- **In order for the Cypress tests to work in the Amplify build you will need to add the same properties that you added to the `cypress.env.json` file because you did not push that file up since you added it to the `.gitignore` file.**
- Each environment variable has a prefix of `cypress_`

  - cypress_username
  - cypress_password
  - cypress_userPoolId
  - cypress_clientId

- On the left navigation within your AWS Amplify Application, select `Environment variables`
- Click the `Manage variables` button
- Click the `Add variable` button
- Type `cypress_username` in the field labeled `Enter variable here`
- Type the corresponding value from your `cypress.env.json` in the field labeled `Enter value here`
- Repeat the previous three steps for `cypress_password`, `cypress_userPoolId`, and `cypress_clientId`
- Click the `Save` button

### Adding Tests to Amplify Build

- Add a new file named `amplify.yml` to the root of your repository with the following content

```yml
version: 1
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*

test:
  phases:
    preTest:
      commands:
        - npm ci
        - npm install mocha@5.2.0 mochawesome mochawesome-merge mochawesome-report-generator
    test:
      commands:
        - npm test -- --watchAll=false
        - npx start-test http://127.0.0.1:3000 'cypress run --reporter mochawesome --reporter-options "reportDir=cypress/report/mochawesome-report,overwrite=false,html=false,json=true,timestamp=mmddyyyy_HHMMss"'
    postTest:
      commands:
        - npx mochawesome-merge cypress/report/mochawesome-report/mochawesome*.json > cypress/report/mochawesome.json
  artifacts:
    baseDirectory: cypress
    configFilePath: '**/mochawesome.json'
    files:
      - '**/*.png'
      - '**/*.mp4'
```

This file overrides the default build setting provided by Amplify. However, to display the `Test` green or red circle in the build status timeline, you must update the default build settings.

- On the left navigation within your AWS Amplify Application, select `Build settings`
- Click the `Edit` button in the `App build specification` section
- At the bottom of the `Edit` window add the following

```
...
  cache:
    paths:
      - node_modules/**/*

test:
```

- Click the `Save` button

By adding `test:`, the `Test` circle will now display in the build status timeline. Nevertheless, the build instructions will be read from the root of your repository and will override the content of the default build settings.

- Commit your local changes and [push](https://docs.github.com/en/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line) them up to your GitHub account

- Amplify will: provision, build, test, deploy and verify your application
- The `Test` step in the build should pass (Green).

So what does this Amplify build actually do?

- Provision
  - Provisions a [docker image](https://docs.docker.com/get-started/overview) where our React application can be built.
- Build
  - [Clones](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository) your GitHub repository
  - Builds your backend AWS services with the [CloudFormation](https://aws.amazon.com/cloudformation) scripts that Amplify generated for you.
  - Builds your frontend React application using `npm` commands provided through your `amplify.yml`
- Test
  - Starts the application locally within the Docker image and Tests your application.
- Deploy
  - If the tests pass it [deploys](https://en.wikipedia.org/wiki/Software_deployment) your React application to a public URL where anyone can access it. **Important: This step automatically prevents broken software from being released to your customers. We value working software and we bake it into our [Deployment Pipeline](https://martinfowler.com/bliki/DeploymentPipeline.html)**
- Verify

  - Generates screenshots of your application's home page to ensure your app renders well on different mobile resolutions.

- This deployment pipeline kicks off every time you push your code up to GitHub.

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/156482d532e70a9e7d7d4c03bd9706f0e7fbd544)

</details>

<details>
  <summary>Log Out</summary>

## Log Out

While users can now log into the notes application they can't log back out.

- Add a Cypress test that will drive the production code changes

```js
it('should have an option to sign out', () => {
  cy.get('[data-testid=sign-out]').click();
  cy.get('[data-amplify-authenticator]').should('exist');
});
```

- Run all the tests
- Red

- Add the following [properties](https://reactjs.org/docs/components-and-props.html) to the `App.js` component that come from the [Authenticator](https://ui.docs.amplify.aws/react/connected-components/authenticator#3-add-the-authenticator). Pass the `signOut` and `user` properties to the `Header` component.

```js
<Authenticator>
  {({ signOut, user }) => (
    <div className="App">
      <Header signOut={signOut} user={user} />
      ...
    </div>
  )}
</Authenticator>
```

- Test drive the `Header.js` component by adding the following to the `src/test/Header.test.js` file

```js
import { render, screen } from '@testing-library/react';
import Header from '../Header';

const signOut = jest.fn();
const user = { username: 'testUserName' };

beforeEach(() => {
  render(<Header signOut={signOut} user={user} />);
});

test('should display header', () => {
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent('My Notes App');
});

test('should display username', () => {
  const greeting = screen.getByTestId('username-greeting');
  expect(greeting).toHaveTextContent('Hello testUserName');
});

test('should display sign out', () => {
  const signOutButton = screen.getByTestId('sign-out');
  expect(signOutButton).toHaveTextContent('Sign out');
});
```

- Add the following to the `Header.js` component

```js
import PropTypes from 'prop-types';

function Header(props) {
  const { signOut, user } = props;

  return (
    <div>
      <div>
        <span data-testid="username-greeting">Hello {user.username} &nbsp;</span>
        <button data-testid="sign-out" type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
      <h1>My Notes App</h1>
    </div>
  );
}

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({ username: PropTypes.string }).isRequired
};

export default Header;
```

- Run all the tests
- Green!
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/20206dd5505929555a8e7173c38b9eb7ac394087)

</details>

<details>
  <summary>Backend API</summary>

## Backend API

Now that we have user authentication hooked up, we need to add the ability for customers to get their "notes to show up on their mobile phone browser too". This means that we can't use local storage on the user's computer anymore. Instead we need to build a backend [API](https://en.wikipedia.org/wiki/API) that will store notes independently from the frontend code.

- Run `amplify add api` at the root of your project

```
Select from one of the below mentioned services: GraphQL
Here is the GraphQL API that we will create. Select a setting to edit or continue Continue
Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)
```

- [GraphQL](https://graphql.org/) is an alternative to [REST](Representational state transfer). GraphQL APIs are more flexible than REST APIs.
- This command created

  - `amplify/backend/api/`
  - `amplify/backend/backend-config.json`

- Update the contents of the `amplify/backend/api/tddamplifyreact/schema.graphql` file with

```
input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!

type Note @model {
  id: ID!
  name: String!
  description: String
}
```

`input AMPLIFY { globalAuthRule: AuthRule = { allow: public } }` allows you to get started quickly without worrying about authorization rules. Review the [Authorization rules](https://docs.amplify.aws/cli/graphql/authorization-rules/) section to setup the appropriate access control for your GraphQL API. (https://docs.amplify.aws/cli/graphql/overview/#creating-your-first-table)

- Run `amplify push --y`

- This command created/updated the following resources on AWS

  - amplify-tddamplifyreact-dev-8… AWS::CloudFormation::Stack
  - apitddamplifyreact AWS::CloudFormation::Stack
  - authtddamplifyreact414f1c62 AWS::CloudFormation::Stack
  - GraphQLAPI AWS::AppSync::GraphQLApi
  - GraphQLAPITransformerSchema3C… AWS::AppSync::GraphQLSchema
  - GraphQLAPIDefaultApiKey215A6D… AWS::AppSync::ApiKey
  - GraphQLAPINONEDS95A13CF0 AWS::AppSync::DataSource
  - Note AWS::CloudFormation::Stack
  - CustomResourcesjson AWS::CloudFormation::Stack

- If you would like to explore the backend, take a look at [Amplify Studio](https://docs.amplify.aws/console/).

### Cut Over Repository To Use GraphQL

Now that we have a GraphQL API that is storing our notes in a [DynamoDB](https://aws.amazon.com/dynamodb) table, we can replace `localforage` calls with GraphQL API calls.

- Replace `localforage` calls in the `NoteRepository` with GraphQL API calls

```js
import { API } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation } from './graphql/mutations';

export async function findAll() {
  const apiData = await API.graphql({ query: listNotes });
  return apiData.data.listNotes.items;
}

export async function save(note) {
  const apiData = await API.graphql({
    query: createNoteMutation,
    variables: { input: note }
  });
  return apiData.data.createNote;
}
```

- We do need to call the `save` function first in the `createNote` callback function in the `App` component because when [GraphQL](https://graphql.org/) saves a note, it generates a unique `ID` that we want to have access to in our `note` array.

```js
const createNote = async () => {
  const newNote = await save(formData);
  const updatedNoteList = [...notes, newNote];
  setNotes(updatedNoteList);
};
```

- The final place that we need to remove `localforage` is in the `note.cy.js` Cypress test. GraphQL does not provide an equivalent API endpoint to delete all of the notes so we will not be able to simply replace the `localforage.clear()` function call with a GraphQL one. In a separate commit we will add the ability to delete notes by `ID` through the UI. This is a [mutation](https://graphql.org/learn/queries/#mutations) that GraphQL provides. But for now we will just remove the clean up in the Cypress test.

```js
describe('Note Capture', () => {
  before(() => {
      cy.signIn();
  });

  after(() => {
      cy.clearLocalStorageSnapshot();
      cy.clearLocalStorage();
  });
  ...
```

- Finally remove `localforage` by running `npm uninstall localforage`

- Rerun all of the tests
- Green!
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/00fc9b7a97c3f3fcc6200fffac7b4f30c051c864)

</details>

<details>
  <summary>Add Note Deletion</summary>

## Add Note Deletion

In order to add note deletion, let's drive this from the Cypress test. This will help in cleaning up notes that were created during the UI test.

- Add a deletion test to the Cypress test

```js
it('should delete note', () => {
  cy.get('[data-testid=test-delete-button-0]').click();

  cy.get('[data-testid=test-name-0]').should('not.exist');
  cy.get('[data-testid=test-description-0]').should('not.exist');
});

it('should have an option to sign out', () => {
...
```

Now that we've removed `localForage` and the `localForage.clear();` from the Cypress test we need to provide a way to remove any notes that were added outside of the test.

- Add notes clean up before the Cypress tests are run

```js
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

before(() => {
  cy.intercept('**/graphql').as('notesApi');

  cy.signIn();
  cy.visit('/');

  cy.wait('@notesApi');
  cy.get('div').then(() => {
    cy.wait('@notesApi');
    Cypress.$('[data-testid^="test-delete-button-').each(() => {
      cy.get('[data-testid="test-delete-button-0"]').click();
    });
    return true;
  });
});
```
Here's a break down of what is being done in `before`:
  - Cypress tests are run [asynchronously](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous). In order to run the `Cypress.$('[data-testid^="test-delete-button-')` command, which returns a list of deletion buttons, you must wrap that command inside a [.then()](https://docs.cypress.io/api/commands/then) function.
  - Cypress [then](https://docs.cypress.io/api/commands/then) is similar to a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) but it does not have a [catch](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#You-cannot-add-a-catch-error-handler-to-a-failed-command) function. This is why you need to add `/* eslint-disable promise/catch-or-return */` to the top of the test in order to ignore the [ESLint](https://github.com/eslint-community/eslint-plugin-promise) error.
  - Cypress [then](https://docs.cypress.io/api/commands/then) is similar to a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) but it can not return a value to satisfy the [ESLint](https://github.com/eslint-community/eslint-plugin-promise) error.  This is why you need to add `/* eslint-disable promise/always-return */` to the top of the test.
  - Cypress [intercept](https://docs.cypress.io/api/commands/intercept) provides the ability to [wait](https://docs.cypress.io/api/commands/wait) for [GraphQL](https://docs.cypress.io/guides/end-to-end-testing/working-with-graphql) to return a list of notes.
  - Cypress [\$](https://docs.cypress.io/api/utilities/$) allows you to look for [HTML elements](https://www.w3schools.com/html/html_elements.asp) without failing if the element is not found.


- Run the Cypress test and verify that it Fails
- To make it go green, add a new deletion function to `NoteRepository.js`

```js
...
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation
} from './graphql/mutations';

...

export async function deleteById(id) {
  return API.graphql({ query: deleteNoteMutation, variables: { input: { id } } });
}
```

- Create a new deletion callback function in `App.js`

```js
import { findAll, save, deleteById } from './NoteRepository';
...
const deleteNoteCallback = async (id) => {
  const newNotesArray = notes.filter((note) => note.id !== id);
  setNotes(newNotesArray);
  await deleteById(id);
};
```

- Pass the `deleteNoteCallback` callback function parameter to the `NoteList` component.

```js
<NoteList notes={notes} deleteNoteCallback={deleteNoteCallback} />
```

- Add a deletion button to the `NoteList` component

```js
import PropTypes from 'prop-types';

function NoteList(props) {
  const { notes, deleteNoteCallback } = props;

  return (
    <div>
      {notes.map((note, index) => (
        <div>
          <p data-testid={`test-name-${index}`}>{note.name}</p>
          <p data-testid={`test-description-${index}`}>{note.description}</p>
          <button
            type="button"
            data-testid={`test-delete-button-${index}`}
            onClick={() => deleteNoteCallback(note.id)}>
            Delete note
          </button>
        </div>
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired,
  deleteNoteCallback: PropTypes.func.isRequired
};

export default NoteList;
```

- Run all the tests
- Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/9c699811322f08173656e680bf5a8026e371620c)

</details>

<details>
  <summary>Note List Component Testing</summary>

## Note List Component Testing

Since we started at the top of the testing pyramid we need to make sure, once we are on green, that we work our way down to lower level tests too.

- Add a test to `NoteList.test.js` to verify the deletion behavior of the `NoteList` component.

```js
import { render, screen, fireEvent } from '@testing-library/react';
import NoteList from '../NoteList';

const mockDeleteNoteCallback = jest.fn();

const defaultProps = {
  notes: [],
  deleteNoteCallback: mockDeleteNoteCallback
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const { notes, deleteNoteCallback } = setupProps;
  return render(<NoteList notes={notes} deleteNoteCallback={deleteNoteCallback} />);
};

test('should display nothing when no notes are provided', () => {
  setup();
  ...
});

test('should display one note when one notes is provided', () => {
  const note = { name: 'test name', description: 'test description' };
  setup({ notes: [note] });
  ...
});

test('should display multiple notes when more than one notes is provided', () => {
  const firstNote = { name: 'test name 1', description: 'test description 1' };
  const secondNote = { name: 'test name 1', description: 'test description 1' };
  setup({ notes: [firstNote, secondNote] });
  ...
});

...

test('should delete note when clicked', () => {
  const note = {
    id: 1,
    name: 'test name 1',
    description: 'test description 1'
  };
  setup({ notes: [note] });
  const button = screen.getByTestId('test-delete-button-0');

  fireEvent.click(button);

  expect(mockDeleteNoteCallback.mock.calls.length).toBe(1);
  expect(mockDeleteNoteCallback.mock.calls[0][0]).toStrictEqual(1);
});
```

- I added a mock function for the `deleteNoteCallback` and a `setup` function that has properties that can be overridden for specific test cases. This is a pattern that is often used in this style of tests.

- Run all of the tests
- Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/8f11c4485cd565a638f25be2c5201c606e2886c9)

</details>

<details>
  <summary>Unit Testing Note Repository</summary>

## Unit Testing Note Repository

[Unit testing](https://en.wikipedia.org/wiki/Unit_testing) is the lowest level testing that tests out a single function in complete isolation. For the `NoteRepository` this means that amplify and GraphQL imports will need to be [mocked](https://en.wikipedia.org/wiki/Mock_object) out so that we do not hit AWS during our testing.

- Create a new test called `NoteRepository.test.js` file under the `src/test/` directory.

```js
import { API } from 'aws-amplify';
import { save, findAll, deleteById } from '../NoteRepository';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation
} from '../graphql/mutations';
import { listNotes } from '../graphql/queries';

const mockGraphql = jest.fn();
const id = 'test-id';

beforeEach(() => {
  mockGraphql.mockReturnValueOnce({
    data: {
      createNote: {},
      listNotes: {
        items: {}
      }
    }
  });
  API.graphql = mockGraphql;
});

afterEach(() => {
  jest.clearAllMocks();
});

it('should create a new note', () => {
  const note = { name: 'test name', description: 'test description' };

  save(note);

  expect(mockGraphql.mock.calls.length).toBe(1);
  expect(mockGraphql.mock.calls[0][0]).toStrictEqual({
    query: createNoteMutation,
    variables: { input: note }
  });
});

it('should findAll notes', () => {
  const note = { name: 'test name', description: 'test description' };

  findAll(note);

  expect(mockGraphql.mock.calls.length).toBe(1);
  expect(mockGraphql.mock.calls[0][0]).toStrictEqual({ query: listNotes });
});

it('should delete note by id', () => {
  deleteById(id);

  expect(mockGraphql.mock.calls.length).toBe(1);
  expect(mockGraphql.mock.calls[0][0]).toStrictEqual({
    query: deleteNoteMutation,
    variables: { input: { id } }
  });
});
```

- In the `beforeEach` function the real `API.graphql` function is replaced with a mock function. This enables us to test this script in complete isolation. We can determine how many times the mock function was called and what parameters were passed to that function. This also keeps this test from trying to call AWS. This would make the test much slower and more fragile. Remember that unit tests are tests at the bottom of the testing pyramid which are faster and easier to maintain.

- Run all of your tests
- Green!
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/8ab209ffd68b068c58719028d5c2af059b1fc00c)

</details>

<details>
  <summary>Refactor Project Structure</summary>

## Refactor Project Structure

It's best to organize your code into a logical [folder structure](https://reactjs.org/docs/faq-structure.html) so that it's easier to understand and navigate.

- Move all of the components into a `note` folder in `src`

- note/

  - App.js
  - Header.js
  - NoteForm.js
  - NoteList.js

- Move the `NoteRepository` component to a `common` folder in `src`

- common/

  - NoteRepository.js

- Run all the tests
- Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/2c4afaeeadc2f45569fe55b582c32ab710bf894a)

</details>

<details>
  <summary>Styling The App</summary>

## Styling The App

Right now this Notes Application is functional but it is not very pretty. The [Bootstrap](https://getbootstrap.com) library not only provides a simple way to provide a consistent look-and-feel, it also provides a [responsive web](https://en.wikipedia.org/wiki/Responsive_web_design) experience right out-of-the-box.

- Run `npm install react-bootstrap bootstrap` at the root of your project
- The [React Bootstrap](https://react-bootstrap.github.io) library combines [Bootstrap Components](https://getbootstrap.com/docs/5.0/customize/components) with React Components.

- Add the [Cascading Style Sheet](https://en.wikipedia.org/wiki/CSS) provided by Bootstrap's [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) to the `index.js` file.

```js
ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossOrigin="anonymous"
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

- Remove all of the contents of `App.css` because it will no longer be used in the application.

- Add a Bootstrap React [Grid System](https://react-bootstrap.github.io/layout/grid) to `App.js`
```js
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

...

return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container>
          <Row>
            <Col md={6}>
              <Header signOut={signOut} user={user} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <NoteForm
                notes={notes}
                formData={formData}
                setFormDataCallback={setFormData}
                setNotesCallback={createNote}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <NoteList notes={notes} deleteNoteCallback={deleteNoteCallback} />
            </Col>
          </Row>
        </Container>
      )}
    </Authenticator>
  );
}
```

- Add a Bootstrap React [Form](https://react-bootstrap.github.io/components/forms) to `NoteForm.js`
```js
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

...

return (
    <Form>
      <Form.Group>
        <Form.Control
          data-testid="note-name-field"
          onChange={(e) =>
            setFormDataCallback({
              ...formData,
              name: e.target.value
            })
          }
          value={formData.name}
          placeholder="Note Name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          data-testid="note-description-field"
          onChange={(e) =>
            setFormDataCallback({
              ...formData,
              description: e.target.value
            })
          }
          value={formData.description}
          placeholder="Note Description"
        />
      </Form.Group>
      <Form.Group>
        <Button data-testid="note-form-submit" type="button" onClick={createNote}>
          Create Note
        </Button>
      </Form.Group>
    </Form>
  );
}
```

- Add a Bootstrap React [Card](https://react-bootstrap.github.io/components/cards) to `NoteList.js`
```js
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

...

return (
    <div>
      {notes.map((note, index) => (
        <div key={`note-${note.id}`}>
          <Card>
            <Card.Header data-testid={`test-name-${index}`}>{note.name}</Card.Header>
            <Card.Body>
              <Card.Text data-testid={`test-description-${index}`}>{note.description}</Card.Text>
              <Button
                variant="secondary"
                data-testid={`test-delete-button-${index}`}
                onClick={() => deleteNoteCallback(note.id)}>
                Delete note
              </Button>
            </Card.Body>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}
```

- Run all of the tests
- Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/e8b1fa451b4bb747c3f99275c0fc781ccb5973f4)

</details>

<details>
  <summary>Launch and Learn</summary>

## Launch and Learn

We value customer feedback.  We demonstrate working software to our customers and plug their feedback into our product.  In addition to person-to-person feedback, we bake feedback loops into our software applications.  This enables us to validate what customers say they want with what they actually do.  We value making data-driven-decisions through tight [build-measure-learn](http://theleanstartup.com/principles) loops. 

In the [build-measure-learn](http://theleanstartup.com/principles) cycle we start with what we want to learn.  

In the case of our application...

**Learn:**
Are users creating notes?

**Measure:**
Record when users `sign up`, `sign in`, and `note creation`

**Build:**
Add [Amplify analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/) to record when users `sign up`, `sign in`, and `note creation`

This [customer journey](https://en.wikipedia.org/wiki/User_journey) from `sign up` to `note creation` is called a [conversion funnel](https://en.wikipedia.org/wiki/Purchase_funnel#Conversion_funnel).  We want to know if customers that sign up for our application decide to save their notes in our application.  [Amplify analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/) saves user interactions in [Amazon Pinpoint](https://docs.aws.amazon.com/pinpoint/latest/userguide/welcome.html).  One feature within [Amazon Pinpoint](https://docs.aws.amazon.com/pinpoint/latest/userguide/welcome.html) is the ability to creat [funnel charts](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-funnels.html) that visualize the conversion rate of customers from one step in the funnel to the next step.

Let's get started by adding [Amplify analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/) to our product.

- Run `amplify add analytics`

```
Select an Analytics provider Amazon: Pinpoint
Provide your pinpoint resource name: tddamplifyreact
```

- Add the following to the `src/index.js` file

```js
import { Amplify, Hub, Analytics } from 'aws-amplify';
...
Hub.listen('auth', async (data) => {
  switch (data.payload.event) {
    case 'signIn':
      Analytics.record({
        name: 'signIn',
        attributes: { username: data.payload.data.username }
      });
      break;
    case 'signUp':
      Analytics.record({
        name: 'signUp',
        attributes: { username: data.payload.data.username }
      });
      break;
    default:
  }
});
```
[Hub](https://docs.amplify.aws/lib/utilities/hub/q/platfor) provides a simple way to record common events within [Amplify](https://aws.amazon.com/amplify/) applications.  [Analytics](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/#configure-your-app) records [events](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/#recording-an-event) to [Amazon Pinpoint](https://docs.aws.amazon.com/pinpoint/latest/userguide/welcome.html).

- Add the following to the `src/note/App.js` file

```js
...
function App() {
  ...
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container>
          ...
          <Row>
            <Col md={6}>
              <NoteForm
                ...
                username={user.username}
              />
            </Col>
          </Row>
          ...
        </Container>
      )}
    </Authenticator>
  );
}
...
```

- Add the following to the `src/note/NoteForm.js` file

```js
...
import { Analytics } from 'aws-amplify';

function NoteForm(props) {
  const { notes, setFormDataCallback, formData, setNotesCallback, username } = props;

  const createNote = () => {
    if (!formData.name || !formData.description) return;
    ...
    Analytics.record({
      name: 'createNote',
      attributes: { username }
    });
  };

 ...

NoteForm.propTypes = {
  ...
  username: PropTypes.string.isRequired
};
...
```

- Add the following to the `src/test/NoteForm.test.js` file

```js
...
import { Analytics } from 'aws-amplify';
...

beforeEach(() => {
  Analytics.record = jest.fn().mockImplementation(() => {});

  render(
    <NoteForm
      ...
      username="testUsername"
    />
  );
});

test('should display a create note button', () => {
...
});
...
```

The [Analytics.record](https://docs.amplify.aws/lib/analytics/record/q/platform/js/) function must be mocked out in order to prevent a real call to [Amazon Pinpoint](https://docs.aws.amazon.com/pinpoint/latest/userguide/welcome.html) during this test.

- Run `amplify push`

- Run all of the tests
- Green
- Commit

[Code for this section](https://github.com/pairing4good/tdd-amplify-react-from-template/commit/463063f30f40144e77bb0c562ce4b11266e3a255)

</details>

<details>
  <summary>Team Member Workflow</summary>

## Team Member Workflow

### Forking Repository
Team members will not commit directly to the Amplify React application repository.  Instead this repository will have limited access and deploy changes to higher environments.  Each team member will create a [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) of the application repository, make changes on their fork, run tests in isolation and submit changes through [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).  This style of development is called a [forking workflow](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html).  Since Amplify kicks off a build every time code is pushed to the GitHub repository, it's best to lock down the primary repository and force team members to work on personal forks instead.

- Navigate to the primary repository
- Click the `Fork` button on the top right of the page
- Click the `Create fork` button

- [Clone](https://github.com/git-guides/git-clone) your new forked repository
- Set up the [upstream](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork) url

- Log into AWS Amplify
- Click on the `Build an app > Get started` button
- Provide an `App name`
- Click `Confirm deployment`

- Click on the newly created application
- Click on `GitHub`
- Click on `Connect branch`
- Select a repository
- Click `Next`
- Create an environment
- Select a Role
- Click `Next`
- Click `Save and Deploy`

- Wait for your application's `Backend` to `Build`
- It will fail the tests because Cypress test's login environment variables are not set up yet

- Navigate to your application
- Select the `Backend environments` tab
- Click on the `Local setup instructions` arrow
- Copy the Amplify CLI `pull` command

- Run the `pull` command at the root of your cloned repo

```
Opening link: https://us-east-2.admin.amplifyapp.com/admin/xxxx/main/verify/?loginVersion=1
⠙ Confirm login in the browser or manually paste in your CLI login key:
✔ Successfully received Amplify Studio tokens.
Amplify AppID found: d1bwpz9lmtu5sw. Amplify App name is: test-app
Backend environment main found in Amplify Console app: test-app
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you plan on modifying this backend? Yes
```

- Run `npm install`
- Run `npm start`
- Click `Create Account`
- Create and verify a new account
- Stop the server `Ctrl-c`

- Create a new file at the root of your project named `cypress.env.json` with the following content

```json
{
  "username": "[Login username you just created]",
  "password": "[Login password you just created]",
  "userPoolId": "[The `aws_user_pools_id` value found in your `src/aws-exports.js`]",
  "clientId": "[The `aws_user_pools_web_client_id` value found in your `src/aws-exports.js`]"
}
```

- Run `npm test`
- Run  `npm run cypress:test`

- Green

- Add the properties to AWS Amplify.
- Each environment variable has a prefix of `cypress_`

  - cypress_username
  - cypress_password
  - cypress_userPoolId
  - cypress_clientId

- On the left navigation within your AWS Amplify Application, select `Environment variables`
- Click the `Manage variables` button
- Click the `Add variable` button
- Type `cypress_username` in the field labeled `Enter variable here`
- Type the corresponding value from your `cypress.env.json` in the field labeled `Enter value here`
- Repeat the previous three steps for `cypress_password`, `cypress_userPoolId`, and `cypress_clientId`
- Click the `Save` button

- Navigate to your Amplify application
- Click on the failing test circle icon
- Click the `Redeploy this version` button

- Green

[Previews](https://docs.aws.amazon.com/amplify/latest/userguide/pr-previews.html) offer a way to preview changes before merging a pull request.
- On the left navigation, click `Previews`
- Click the `Enable previews` button
- Click the `Install GitHub app` button and follow the instructions
- Click on the radio button beside the your selected branch name
- Click the `Manage` button
- Toggle the `Disable` button
- Click the `Confirm` button

**Please make sure your repository is private.**  Amplify recommends that your repositories be private so that not just anyone can open a PR and consequently create a full-stack preview.  **This can result in unexpected AWS charges.**

When you push new changes to your fork, your unit tests will be run along with other checks.  When you create a pull request the same checks will be made plus the Amplify preview will be created.  The preview build will run the Cypress tests.

To block PR's from being merged when code checks fail, set up [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

</details>
