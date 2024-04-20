import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = new FormData(event.target);
    const query = values.get("query") as string | null;
    const trimmedQuery = query?.trim() || "";

    if (!trimmedQuery) {
      toast.error("Enter the query string")
      return;
    }
    onSubmit(trimmedQuery);
    event.target.elements.query.value = ""
  };

  return (
    <header>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.formField}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </form>
  
    </header>
  );
};
