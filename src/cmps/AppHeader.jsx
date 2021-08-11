import { connect } from 'react-redux';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function _AppHeader({ loggedinUser }) {
  return (
    <header className="main-header">
      <Link to="/">
        <img className="logo" src="./img/bitcoin.png" alt="logo"></img>
      </Link>
      <nav className="main-nav">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        <NavLink to="/statistics">Statistics</NavLink>
      </nav>
      <div className="header-user-greet">
        {loggedinUser ? (
          <>
            {/* <button>Logout</button> */}
            <p>Hello {loggedinUser.name}!</p>
          </>
        ) : (
          <p>Hello Guest!</p>
        )}
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedinUser: state.userModule.loggedinUser,
  };
};
export const AppHeader = connect(mapStateToProps)(_AppHeader);
