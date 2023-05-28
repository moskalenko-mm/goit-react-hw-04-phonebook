import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(
    localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      return alert(`Contact "${name}" is already in contacts list`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    return setContacts(prevContact => [contact, ...prevContact]);
  };

  const handleSearch = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleClick = id => {
    return setContacts(prevContact =>
      prevContact.filter(item => item.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter handelSearch={handleSearch} />
      <ContactList contacts={filteredContacts} handleClick={handleClick} />
    </Container>
  );
};

export default App;
