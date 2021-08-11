import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import bitcoinService from '../services/bitcoinService';
import UserPreview from './UserPreview';
import { loadUsers } from '../store/actions.js/userActions';
import { removeContact } from '../store/actions.js/contactActions';
import { userService } from '../services/userService';
import { MovesList } from '../cmps/MovesList';
class _HomePage extends Component {
  state = {
    user: null,
    rate: null,
  };

  async componentDidMount() {
    this.props.loadUsers();
    const user = await userService.getLoggedinUser();
    this.setState({ user }, () => this.setUserRate(user));
  }

  setUserRate = async (user) => {
    const rate = await bitcoinService.getRate(user.coins);
    this.setState({ rate });
  };

  render() {
    const { loggedinUser } = this.props;
    const { rate } = this.state;
    if (!loggedinUser) return <div className="loader"></div>;
    return (
      <main>
        <UserPreview user={loggedinUser} rate={rate} />
        <MovesList
          moves={loggedinUser.moves.slice(0).slice(-3)}
          title="Your last three moves"
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userModule.users,
    loggedinUser: state.userModule.loggedinUser,
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
  };
};

const mapDispatchToProps = {
  loadUsers,
  removeContact,
};

// Connects the store with the component, injects it to the props
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
