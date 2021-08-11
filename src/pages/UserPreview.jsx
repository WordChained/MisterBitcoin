import React, { Component } from 'react';

export default class UserPreview extends Component {
  render() {
    const { user, rate } = this.props;
    return (
      <section className="user-preview">
        <h3>Hello {user.name}!</h3>
        <h3>
          {' '}
          <img src="./img/coins.png" alt="btc-icon"></img> Coins: {user.coins}
        </h3>
        <h3>
          {' '}
          <img src="./img/btc.png" alt="btc-icon"></img> BTC: {rate}
        </h3>
      </section>
    );
  }
}
