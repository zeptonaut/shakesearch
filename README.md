# ShakeSearch

Welcome to the Pulley Shakesearch Take-home Challenge! In this repository,
you'll find a simple web app that allows a user to search for a text string in
the complete works of Shakespeare.

You can see a live version of the app at
https://pulley-shakesearch.onrender.com/. Try searching for "Hamlet" to display
a set of results.

In it's current state, however, the app is in rough shape. The search is
case sensitive, the results are difficult to read, and the search is limited to
exact matches.

## Running locally
```shell
# Build the go application
yarn build
# Start the API server
heroku local

# In another terminal, start the frontend
yarn start
```

## Improvements
- **Made results linkable.** It seemed like the main use case for an app like
this is to look up a particular quote in order to share it with others or to
say "look at how much Shakespeare used this particular phrase". In that spirit,
not having shareable results was a real drawback. I made the results shareable
by making the Frontend a React app and having the client-side routing controlled
by React Router.
- **Add visual separation between results.** Where one result ended and the next
began was hard to discern: putting the results in a zebra-striped table helped
with this.
- **Add visual feedback that a search occurred.** I noticed myself constantly
wondering "did that search actually happen?" and looking for visual feedback in
the results table, which is a sign that more feedback was necessary to indicate
that a query had been made that returned new results. To remedy this, I added
a subtle animation when new results were returned. I also indicated the search string
that was used to give the current results along with the total number of 
results found, which is a number that you can easily anchor on to see that new
results are available.
- **Highlighted search string within results.** This makes it much easier to 
scan to the relevant section of each result. I used mark.js for this.
- **Added sample queries.**: This provides a lightweight jumping off point into 
using the tool without having to supply awkward/lengthy explanations.
- **Fixed a bug where the query would fail when the match occurred too early or late in the texts.** We weren't bounds checking before indexing into the texts array: see [the issue](https://github.com/zeptonaut/shakesearch/issues/7#issuecomment-1434039036) for more details.
- **Added pagination.**: Server results for very common phrases (e.g. "or") were returning
quickly but the actual result table was taking a long time to be added to the DOM.
The page was also unresponsive after the results were added. To fix this, I added
simple client-side pagination with "Previous page" and "Next page" buttons and 
the page saved into the route.
- **Added basic styling.** Used DaisyUI (a Tailwind component library) to make
things look a little nicer.

## Known issues and next steps
- **Make case sensitivity optional.** In my experience, people _mostly_ don't want
case sensitivity. You can make it optional by having a query parameter controlled
by a frontend checkbox (e.g. `&case_sensitive=true`) that indicates whether a particular
query should be case sensitive. On the server, you can store two `SuffixArrays` in `main.go`:
one where the texts maintain their original case and a second where we run a 
lower case function on the entire text before reading it into the `SuffixArray`.
The query parameter just dictates which `SuffixArray` you run your query against: 
if it's a case insensitive query, you can lowercase your query and run it against
the lowercased `SuffixArray`.
- **Add "whole word" match.** If you're searching for a query that commonly
occurs within other words (e.g. "a"), then this tool is mostly useless. This
could be another option implemented using a similar frontend option as case
sensitivity. I have less clarity about how you could implement this on the
backend, but I think that you could probably use a combination of `SuffixArray`
to find the matches and then checking that the first character before the beginning
of the match and the last character after the end of the match aren't "word"
characters, using a similar technique that Regexp word boundaries use
(see documentation [here](https://www.rexegg.com/regex-boundaries.html#:~:text=The%20word%20boundary%20%5Cb%20matches,string%20or%20a%20space%20character)).
- **You shouldn't have to build the `dist/` folder locally before pushing to `master`.**
This is currently necessary because Render either expects a Node app (required to 
build frontend) or a Go app (required to build backend), but has no default 
image that can build both as far as I can tell. This could be solved by creating
a Render blueprint file with two web processes: a static site (that can build
the React frontend) and a Go app (that can build the backend). Then you can use
redirect rules ([as described here](https://render.com/docs/deploy-create-react-app#using-client-side-routing))
to do some sort of routing for the static site where calls to `/api` are redirected to the API server.
My goal here was "get this working on Render" and having a slightly clunky
build process to do so seemed OK for now.
- **Make it responsive.** Right now, the page looks downright silly on mobile.
To make it responsive, you have to identify the pixel widths at which it starts
to look silly. In Tailwind, you can then add classes with the breakpoint prefix
that reduce/enlarge the corresponding elements appropriately. I've done this 
many times before (see [my blog here](https://www.zeptonaut.com/posts/find-your-blind-spots/), which is responsive),
but it undoubtedly takes a good chunk of time and attention to detail.
- **Add some frontend and backend tests.** The default go unit testing library
works for the server and I'd probably use Cypress for the frontend tests.
- **Add ability to see the results in context and link to a particular passage.**: 
As it stands, I suspect that this app would be much more useful if you could
click a link next to a query result to see the result in the context of the 
broader work and potentially select multiple lines, a la Github code search.
I suspect that sometimes people may want to link to the actual query results,
but it seems like the largest point of search is to find a particular passage
that you can then link to in order to win an argument with a friend.
- **Actually test it with people.** Before you do many of the above, you probably
want to just this in front of a few people and ask them to achieve some basic tasks
with it. What might they use this tool for? Is it clear how to use it from the
landing page? What do they struggle with?

### Deploying
New deploys happen automatically upon new commits to the `master` branch. 
Before committing, you _must_ rebuild the frontend `dist/` folder with `yarn build`.
(See "Known issues and next steps" for a suggested fix to this awkward workflow.)

## Your Mission

Improve the app! Think about the problem from the **user's perspective**
and prioritize your changes according to what you think is most useful.

You can approach this with a back-end, front-end, or full-stack focus.

## Evaluation

We will be primarily evaluating based on how well the search works for users. A search result with a lot of features (i.e. multi-words and mis-spellings handled), but with results that are hard to read would not be a strong submission.

## Submission

1. Fork this repository and send us a link to your fork after pushing your changes.
2. Render (render.com) hosting, the application deploys cleanly from a public url.
3. In your submission, share with us what changes you made and how you would prioritize changes if you had more time.
