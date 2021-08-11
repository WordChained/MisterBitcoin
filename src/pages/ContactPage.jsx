import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import contactService from '../services/contactService';
import ContactList from '../cmps/ContactList';
export default class ContactPage extends Component {
  state = {
    contacts: [],
    filterBy: {
      term: '',
    },
  };
  async componentDidMount() {
    await this.getContacts();
  }

  getContacts = async () => {
    const contacts = await contactService.getContacts(this.state.filterBy);
    this.setState({ contacts });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
  };

  handleChange = async (ev) => {
    this.setState(
      (prevState) => ({
        filterBy: { ...prevState.filterBy, term: ev.target.value },
      }),
      this.getContacts
    );
  };

  contactDetails = async (contactId) => {
    this.props.history.push('/details/' + contactId);
  };
  removeContact = async (contactId) => {
    const contacts = await contactService.deleteContact(contactId);
    this.setState({ contacts });
  };

  render() {
    const { contacts } = this.state;
    return (
      <section className="contact-page">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="term"></label>
          <input
            type="search"
            id="term"
            placeholder="search by name/email/phone"
            onChange={this.handleChange}
            autoComplete="off"
          />
        </form>
        <Link className="link" to="/edit">
          <button className="btn-add-contact">+</button>
          <div className="add-contact-extra">Add Contact</div>
        </Link>
        <ContactList
          removeContact={this.removeContact}
          contacts={contacts}
          contactDetails={this.contactDetails}
        />
      </section>
    );
  }
}
