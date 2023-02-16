import { Link } from "react-router-dom";

const EXAMPLES = ["To be, or not to be", "Hamlet", "scoundrel"];

export default function SearchExamples() {
  return (
    <div>
      <div className="divider text-gray-400 uppercase tracking-wide font-bold">
        Try a few
      </div>
      <div className="flex space-x-2">
        {EXAMPLES.map((example) => (
          <Link
            to={"?" + new URLSearchParams({ q: example }).toString()}
            className="btn btn-outline normal-case btn-secondary"
          >
            {example}
          </Link>
        ))}
      </div>
    </div>
  );
}
