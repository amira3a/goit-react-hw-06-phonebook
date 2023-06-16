import style from "../contact-list-item/style.module.css";

function ContactListItem({ contact, handleDelete }) {
  return (
    <li  className={style.contactListItem}>
      <span>
       (Name: {contact.name}) - (Number: {contact.number})
      </span>
      <button className={style.contactDeleteButton}  onClick={() => handleDelete(contact.id)}>Delete</button>
    </li>
  );
}

export default ContactListItem;