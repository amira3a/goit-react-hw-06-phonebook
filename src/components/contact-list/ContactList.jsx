import ContactListItem from '../contact-list-item/ContactListItem';
import style from '../contact-list/style.module.css';
function ContactList({ contacts, handleDelete }) {
  return (
    <ul  className={style.contactList}>
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} handleDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default ContactList;