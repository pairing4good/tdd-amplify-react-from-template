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
