import React from 'react';

export default function ContactPreview({
  contact,
  contactDetails,
  removeContact,
}) {
  return (
    <ul className="contact-preview">
      <img src="./img/user.png" alt="contact-img"></img>
      <li
        onClick={() => {
          contactDetails(contact._id);
        }}
      >
        {contact.name}
      </li>
      <img
        className="remove-contact"
        onClick={() => removeContact(contact._id)}
        src="./img/delete.png"
        alt="remove-contact"
      />
    </ul>
  );
}
