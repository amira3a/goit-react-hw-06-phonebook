import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../contact-form/ContactForm';
import ContactList from '../contact-list/ContactList';
import Filter from '../filter/Filter';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactSlice';


function PhonebookApp() {

    const dispatch = useDispatch();

  const [state, setState] = useState({
    contacts: [],
    filter: '',
  });
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setState(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state));
  }, [state]);

  function handleNameChange (event)  {
    setState({ ...state, name: event.target.value });
  };

  function handleNumberChange  (event)  {
    setState({ ...state, number: event.target.value });
  };

  function handleFilterChange  (event)  {
    setState({ ...state, filter: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const existingContactName = state.contacts.find(
      (contact) => contact.name.toLowerCase() === state.name.toLowerCase() 
    )
    const existingContactNumber = state.contacts.find(
      (contact) => contact.number === state.number 
    );
    if (existingContactName) {
      alert(`${state.name} is already in the phonebook!`);
      return;
    }
    if (existingContactNumber) {
      alert(`${state.number} is already in the phonebook!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: state.name,
      number: state.number,
    };
    setState({
      ...state,
      contacts: [...state.contacts, newContact],
      name: '',
      number: '',
    });
    dispatch(addContact(newContact));

    event.target.reset();

  };

  function handleDelete  (id)  {
    setState({
      ...state,
      contacts: state.contacts.filter((contact) => contact.id !== id),
    });
  };

  const filteredContacts = state.contacts
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((contact) =>
    contact.name.toLowerCase().includes(state.filter.toLowerCase())
||  contact.number.toLowerCase().includes(state.filter.toLowerCase())
  );
  

  return (
    <div>
      <h1>Contact Book</h1>
      <ContactForm
        name={state.name}
        number={state.number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Contacts</h2>
      <Filter value={state.filter} handleChange={handleFilterChange} />
      <ContactList contacts={filteredContacts}   handleDelete={handleDelete} />
    </div>
  );
}

export default PhonebookApp;