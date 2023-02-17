import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// Copied from https://stackoverflow.com/a/74566476/371067.
//
// Automatically scrolls to the top of the page any time the route changes
// in react-router. The default behavior is for the scroll location to stay
// the same.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView();
  }, [pathname, searchParams]);

  return null;
}
