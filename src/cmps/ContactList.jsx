import React from 'react';
import ContactPreview from '../cmps/ContactPreview';
export default function ContactList({
  contacts,
  contactDetails,
  removeContact,
}) {
  return (
    <section className="contact-list">
      {contacts &&
        contacts.map((contact) => (
          <ContactPreview
            contactDetails={contactDetails}
            contact={contact}
            removeContact={removeContact}
            key={contact._id}
          />
        ))}
    </section>
  );
}
