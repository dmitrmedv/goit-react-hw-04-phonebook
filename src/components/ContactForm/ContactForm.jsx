import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const idName = nanoid();
  const idNumber = nanoid();

  const handleSetValue = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const addContact = event => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    event.preventDefault();
    onSubmit(newContact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactForm} onSubmit={addContact}>
      <label htmlFor={idName}>Name</label>
      <input
        id={idName}
        onChange={handleSetValue}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
      />
      <label htmlFor={idNumber}>
        Number
        <label />
        <input
          id={idNumber}
          onChange={handleSetValue}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </label>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};
