import ErrorMessage from "/src/components/ErrorMessage";
import ScrollToTop from "/src/components/ScrollToTop";
import SearchExamples from "/src/components/SearchExamples";
import SearchForm from "/src/components/SearchForm";
import SearchResults from "/src/components/SearchResults";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const activePage = url.searchParams.get("page") || 1;

    if (!q) {
      return {};
    }
    const response = await fetch(`/search?q=${q}`);
    return {
      quotes: await response.json(),
      q,
      activePage: parseInt(activePage),
    };
  } catch (err) {
    return {
      error: "Sorry: we encountered a server error. Please try again later.",
    };
  }
}

export default function Search() {
  const { quotes: results, q, activePage, error } = useLoaderData();

  return (
    <>
      <ScrollToTop />
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
        <SearchResults query={q} results={results} activePage={activePage} />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <SearchExamples />
      )}
    </>
  );
}
