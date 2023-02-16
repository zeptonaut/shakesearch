import Mark from "mark.js/dist/mark.js";
import { useLayoutEffect, useRef } from "react";

export default function SearchResults({ query, results }) {
  const resultsTableRef = useRef();

  useLayoutEffect(() => {
    const instance = new Mark(resultsTableRef.current);
    instance.mark(query, {
      separateWordSearch: false,
    });
  }, [query, results]);

  return (
    <div className="max-w-48">
      <table
        ref={resultsTableRef}
        className="table table-zebra table-fixed w-full"
      >
        <tbody>
          {results.map((result) => (
            <tr key={result}>
              <td className="whitespace-pre">{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
