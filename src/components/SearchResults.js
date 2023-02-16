export default function SearchResults({ results }) {
  return (
    <div className="max-w-48">
      <table className="table table-zebra table-fixed w-full">
        <tbody>
          {results.map((result) => (
            <tr key={result}>
              <th className="whitespace-pre">{result}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
