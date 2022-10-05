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
