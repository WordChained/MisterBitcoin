import React, { Component } from 'react';
import { signup, login } from '../store/actions.js/userActions';
import { connect } from 'react-redux';
import { userService } from '../services/userService';

class _SignupPage extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  state = {
    newUser: { name: '' },
  };

  onSignup = (ev) => {
    ev.preventDefault();
    this.props.signup(this.state.newUser);
    const loggedinUser = userService.getLoggedinUser();
    this.props.login(loggedinUser);
    this.props.history.push('/');
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      newUser: { ...prevState.newUser, [field]: value },
    }));
  };
  render() {
    const { newUser } = this.state;
    return (
      <section>
        <form className="signup-form" onSubmit={this.onSignup}>
          <h2>Sign up to start trading!</h2>
          <label htmlFor="username">
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={newUser.name}
              placeholder="Username"
            />
          </label>
          <button>Signup</button>
          {/* <input type="password" placeholder=Password" /> */}
          {/* <input type="password" placeholder="repeat the password" /> */}
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userModule.users,
    loggedinUser: state.userModule.loggedinUser,
  };
};

const mapDispatchToProps = {
  signup,
  login,
};

// Connects the store with the component, injects it to the props
export const SignupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SignupPage);
