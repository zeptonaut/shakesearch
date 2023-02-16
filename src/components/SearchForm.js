import { Form } from "react-router-dom";

/**
 * @param onSubmit A function called when a new query has been submitted.
 *   The function must accept the query string.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchForm({ defaultQuery }) {
  return (
    <Form id="form" role="search">
      <div className="form-control max-w-lg mx-r-auto mb-8">
        <label className="input-group flex">
          <input
            className="input input-bordered flex-1"
            placeholder="e.g. To be, or not to be"
            type="text"
            name="q"
            defaultValue={defaultQuery}
          />
          <button className="btn" type="submit">
            Find text
          </button>
        </label>
      </div>
    </Form>
  );
}
