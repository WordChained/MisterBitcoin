import React, { Component } from 'react';
import { spendBalance, addMove } from '../store/actions.js/userActions';
import { connect } from 'react-redux';
class _TransferFund extends Component {
  state = {
    transfer: {
      amount: 0,
    },
  };
  onTransfer = (ev) => {
    ev.preventDefault();
    const { amount } = this.state.transfer;
    const { contact } = this.props;
    if (!amount) return;
    this.props.spendBalance(amount);
    this.props.addMove(contact, amount);
  };
  handleChange = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState((prevState) => ({
      transfer: { ...prevState.amount, amount: ev.target.value },
    }));
  };

  render() {
    return (
      <section>
        <form className="transfer-funds-form" onSubmit={this.onTransfer}>
          <label htmlFor="amount">
            {' '}
            Amount:
            <input
              className="transfer-input"
              required
              name="amount"
              type="number"
              value={this.state.transfer.amount}
              onChange={this.handleChange}
              min="0"
            />
          </label>
          <button>Transfer</button>
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
  spendBalance,
  addMove,
};

// Connects the store with the component, injects it to the props
export const TransferFund = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TransferFund);
