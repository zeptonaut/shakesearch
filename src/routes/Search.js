import SearchForm from "/src/components/SearchForm";
import SearchResults from "/src/components/SearchResults";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const response = await fetch(`/search?q=${q}`);
  return { quotes: await response.json(), q };
}

export default function Search() {
  const { quotes: results, q } = useLoaderData();

  return (
    <>
      <SearchForm defaultQuery={q} />
      {results && <SearchResults query={q} results={results} />}
    </>
  );
}
