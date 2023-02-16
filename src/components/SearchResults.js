import Mark from "mark.js/dist/mark.js";
import { useLayoutEffect, useRef } from "react";
import { CSSTransitionGroup } from "react-transition-group";

export default function SearchResults({ query, results }) {
  const resultsTableRef = useRef();

  useLayoutEffect(() => {
    const instance = new Mark(resultsTableRef.current);
    instance.mark(query, {
      separateWordSearch: false,
      caseSensitive: true,
    });
  }, [query, results]);

  return (
    <div id="results" key={query} className="max-w-48">
      <h2 className="mb-4">
        Showing {results.length} results for <em>"{query}"</em>
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
            {results.map((result) => (
              <tr key={result}>
                <td className="whitespace-pre font-mono text-sm">{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CSSTransitionGroup>
    </div>
  );
}
