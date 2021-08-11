import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser, login } from '../store/actions.js/userActions';

class _Login extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  state = {
    user: { name: '' },
  };
  onLogin = (ev) => {
    ev.preventDefault();
    console.log(this.state);
    this.props.login(this.state.user);
    this.props.history.push('/');
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, [field]: value },
    }));
  };
  render() {
    const { user } = this.state;
    return (
      <section onSubmit={this.onLogin}>
        <h2>Log in to see your transactions!</h2>
        <form className="login-form">
          <label htmlFor="name">
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder="Username"
              value={user.name}
            />
          </label>
          {/* <input type="password" placeholder=Password" /> */}
          <button>Login</button>
        </form>
        <p>
          {' '}
          Not a user yet? click <Link to="/signup">here</Link> to sign up!
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userModule.users,
  };
};

const mapDispatchToProps = {
  setUser,
  login,
};

// Connects the store with the component, injects it to the props
export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
