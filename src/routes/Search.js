import SearchExamples from "/src/components/SearchExamples";
import SearchForm from "/src/components/SearchForm";
import SearchResults from "/src/components/SearchResults";
import { Link, useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q) {
    return { quotes: null, q: null };
  }
  const response = await fetch(`/search?q=${q}`);
  return { quotes: await response.json(), q };
}

export default function Search() {
  const { quotes: results, q } = useLoaderData();

  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-extrabold mb-1 inline-block">
          <span className="text-primary">Shake</span>Search
        </h1>
      </a>
      <h2 className="font-bold text-gray-400 mb-4 font-normal italic">
        The easiest way to search Shakespeare's texts.
      </h2>

      <SearchForm defaultQuery={q} />
      {results ? (
        <SearchResults query={q} results={results} />
      ) : (
        <SearchExamples />
      )}
    </>
  );
}
