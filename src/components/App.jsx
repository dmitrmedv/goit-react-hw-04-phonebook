import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] =
    useState(JSON.parse(localStorage.getItem('contacts'))) ?? [];
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterContact = filterName => setFilter(filterName);

  const addContact = newContact => {
    if (contacts.filter(({ name }) => name === newContact.name).length) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = id => {
    const updateContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updateContacts);
  };

  const normalizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filterContact} />
      <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
    </div>
  );
};
