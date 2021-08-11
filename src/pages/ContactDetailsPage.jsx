// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function ContactDetailsPage({ contact, onBack }) {
//   return (
//     <section className="contact-details">
//       <img src="./img/user-large.png" alt="user-large" />
//       <ul>
//         <li>Name: {contact.name}</li>
//         <li>phone: {contact.phone}</li>
//         <li>eMail: {contact.email}</li>
//       </ul>
//       <span className="details-actions">
//         <button onClick={onBack}>Back</button>
//         <Link to={'/edit/' + contact._id}>
//           <button>Edit</button>
//         </Link>
//       </span>
//     </section>
//   );
// }

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import contactService from '../services/contactService';
import { TransferFund } from '../cmps/TransferFund';
import { MovesList } from '../cmps/MovesList';
import { connect } from 'react-redux';
export class _ContactDetailsPage extends Component {
  componentDidMount() {
    this.setContact();
  }

  state = {
    contact: null,
  };

  setContact = async () => {
    const id = this.props.match.params.id;
    const contact = await contactService.getContactById(id);
    this.setState({ contact });
  };
  removeContact = async (contactId) => {
    console.log();
    const contacts = await contactService.deleteContact(contactId);
    this.setState({ contacts });
    this.props.history.push('/contacts');
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div className="loader"></div>;
    return (
      <section className="contact-details">
        <img
          className="btn-remove-contact"
          onClick={() => this.removeContact(contact._id)}
          src="./img/delete-large.png"
          alt="remove-contact"
        />
        <img src="./img/user-large.png" alt="user-large" />
        <ul>
          <li>Name: {contact.name}</li>
          <li>phone: {contact.phone}</li>
          <li>eMail: {contact.email}</li>
        </ul>
        <TransferFund contact={contact} />
        <MovesList moves={this.props.loggedinUser.moves} title="Your moves" />
        <span className="details-actions">
          <Link to="/contacts">
            <button>Back</button>
          </Link>
          <Link to={'/edit/' + contact._id}>
            <button>Edit</button>
          </Link>
        </span>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedinUser: state.userModule.loggedinUser,
  };
};

// Connects the store with the component, injects it to the props
export const ContactDetailsPage = connect(mapStateToProps)(_ContactDetailsPage);
