import React, { Component } from 'react';
import contactService from '../services/contactService';
import { Link } from 'react-router-dom';

export default class ContactEditPage extends Component {
  state = {
    contact: null,
  };
  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const contact = id
        ? await contactService.getContactById(id)
        : contactService.getEmptyContact();
      this.setState({ contact });
    } catch (err) {
      this.setState({ errMsg: 'Cannot Find contact' });
    }
  }
  removeContact = async (contactId) => {
    const contacts = await contactService.deleteContact(contactId);
    this.setState({ contacts });
    this.props.history.push('/contacts');
  };
  handleChange = ({ target }) => {
    console.log(target.name);
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };

  onSaveContact = async (ev) => {
    ev.preventDefault();
    const { contact } = this.state;
    await contactService.saveContact(contact);
    this.props.history.push('/details/' + contact._id);
  };

  render() {
    if (!this.state.contact)
      return <div>{this.state.errMsg || <div className="loader"></div>}</div>;
    const { name, phone, email } = this.state.contact;
    const { id } = this.props.match.params;
    return (
      <section className="contact-edit-container">
        <img
          className="btn-remove-contact"
          onClick={() => this.removeContact(id)}
          src="./img/delete-large.png"
          alt="remove-contact"
        />
        <img src="./img/user-large.png" alt="user-large" />
        <form className="contact-edit">
          <label htmlFor="name">
            Name:
            <input
              value={name}
              name="name"
              type="text"
              placeholder="Enter the contacts name"
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="phone">
            Phone:
            <input
              type="tel"
              value={phone}
              name="phone"
              onChange={this.handleChange}
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="mail"
              value={email}
              name="email"
              onChange={this.handleChange}
              required
            />
          </label>
          <button onClick={this.onSaveContact}>Save</button>
        </form>
        {
          <Link to={id ? `/details/${id}` : '/contacts'}>
            <img className="back" src="./img/back.png" alt="back" />
          </Link>
        }
      </section>
    );
  }
}
