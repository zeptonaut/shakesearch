import { useState } from "react";

import SearchForm from "/src/components/SearchForm.js";
import SearchResults from "/src/components/SearchResults";

const App = () => {
  const [results, setResults] = useState();

  const onQuerySubmit = async (newQuery) => {
    const response = await fetch(`/search?q=${newQuery}`);
    setResults(await response.json());
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <SearchForm onSubmit={onQuerySubmit} />
      {results && <SearchResults results={results} />}
    </div>
  );
};

export default App;
