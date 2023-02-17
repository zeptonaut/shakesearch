import Pagination from "/src/components/Pagination";
import Mark from "mark.js/dist/mark.js";
import { useLayoutEffect, useRef } from "react";
import { CSSTransitionGroup } from "react-transition-group";

const RESULTS_PER_PAGE = 20;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * getFilteredResults takes the entire result set and returns an array
 * containingjust just the active page's worth of results.
 */
const getFilteredResults = (results, activePage) => {
  const startIndex = clamp(
    (activePage - 1) * RESULTS_PER_PAGE,
    0,
    results.length
  );
  const endIndex = clamp(activePage * RESULTS_PER_PAGE, 0, results.length);

  return {
    startIndex,
    endIndex,
    data: results.slice(startIndex, endIndex),
    totalPages: Math.ceil((results.length * 1.0) / RESULTS_PER_PAGE),
  };
};

export default function SearchResults({ query, results, activePage }) {
  const resultsTableRef = useRef();

  useLayoutEffect(() => {
    const instance = new Mark(resultsTableRef.current);
    instance.mark(query, {
      separateWordSearch: false,
      caseSensitive: true,
    });
  }, [query, results]);

  const filteredResults = getFilteredResults(results, activePage);
  return (
    <div id="results" key={query} className="max-w-48">
      <h2 className="mb-4">
        {results.length > 0 ? (
          <>
            Showing results {filteredResults.startIndex + 1}-
            {filteredResults.endIndex} of {results.length} for{" "}
            <em>"{query}"</em>
          </>
        ) : (
          <>No results found.</>
        )}
      </h2>
      <CSSTransitionGroup
        transitionName="results"
        transitionAppear={true}
        transitionLeave={false}
      >
        <table
          ref={resultsTableRef}
          className="table table-zebra table-fixed w-full shadow-lg border border-gray-100 br-4"
        >
          <tbody>
            {filteredResults.data.map((result) => (
              <tr key={result}>
                <td className="whitespace-pre font-mono text-sm">{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CSSTransitionGroup>
      <Pagination
        query={query}
        totalPages={filteredResults.totalPages}
        activePage={activePage}
      />
    </div>
  );
}
