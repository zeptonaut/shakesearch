import { Link, useSearchParams } from "react-router-dom";

export default function Pagination({ totalPages, query, activePage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  searchParams.set("page", activePage - 1);
  const prevSearchParams = `?${searchParams}`;
  searchParams.set("page", activePage + 1);
  const nextSearchParams = `?${searchParams}`;

  return (
    <div className="flex mt-4">
      {activePage > 1 && (
        <Link to={prevSearchParams} className="btn btn-outline">
          « Previous page
        </Link>
      )}

      {activePage < totalPages && (
        <Link to={nextSearchParams} className="btn btn-outline ml-auto">
          Next page »
        </Link>
      )}
    </div>
  );
}
