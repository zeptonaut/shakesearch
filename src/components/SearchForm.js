/**
 * @param onSubmit A function called when a new query has been submitted.
 *   The function must accept the query string.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchForm({ onSubmit }) {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(Object.fromEntries(new FormData(e.target)).query);
  };

  return (
    <form id="form" onSubmit={onFormSubmit}>
      <div className="form-control max-w-lg mx-r-auto mb-8">
        <label className="input-group flex">
          <input
            className="input input-bordered flex-1"
            placeholder="To be, or not to be"
            type="text"
            id="query"
            name="query"
          />
          <button className="btn" type="submit">
            Find the quote
          </button>
        </label>
      </div>
    </form>
  );
}
