import toast, { Toaster } from 'react-hot-toast';
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import css from './SearchBar.module.css'


const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  
  
  const handleSubmit = event => {
    event.preventDefault();
    if (!query.trim()) {
      return createMessage();
    }
    onSubmit(query);
    setQuery('');
  };
  const createMessage = () => toast("Please, enter something in the searching field!");
  
  const handleChange = event => {
    setQuery(event.target.value);
  };
  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button className={css.searchBtn} type="submit">
          <IoIosSearch  size={'20px'} />
        </button>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 3000,
            style: {
              border: '1px solid #EF4040',
              background: '#EF4040',
              color: '#FAFAFB',
            },
          }}
        />
      </form>
    </header>
  );
};

export default SearchBar;

