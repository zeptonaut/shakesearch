# ShakeSearch

This is the Pulley Shakesearch Take-home Challenge, as fixed up by zeptonaut.
You can see this live at https://shakesearch-aw2b.onrender.com/.

You can read along with much of the work I did on the app by reading through 
the Github issues, e.g. #1 and #7.

Sorry for the slow turnaround on this: I took this challenge as an opportunity to 
learn Tailwind and Parcel. I've wanted to use both before, but I hadn't had a 
good opportunity to learn them.

## Running locally
```shell
# Build the go application
yarn build
# Start the API server
heroku local

# In another terminal, start the frontend
yarn start
```

## Architecture
**Frontend:**
- Static React app
- Compiled by Parcel bundler
- Uses Tailwind + DaisyUI for CSS
- Client-side routing handled by `react-router` v6
- Entry animations handled by `TransitionGroup`

**Backend:**
- Go server 
- Routes any `/search` queries to the `handleSearch` function
- Routes any other requests to the `/dist` folder hosting the frontend
- Uses a `SuffixArray` for searching the texts

## Improvements
- **Made results linkable** <br />It seemed like the main use case for an app like this is to look up a particular quote in order to share it with others or to
say "look at how much Shakespeare used this particular phrase". In that spirit,
not having shareable results was a real drawback. I made the results shareable
by making the Frontend a React app and having the client-side routing controlled
by React Router.
- **Add visual separation between results** <br />Where one result ended and the next
began was hard to discern: putting the results in a zebra-striped table helped
with this.
- **Add visual feedback that a search occurred** <br />I noticed myself constantly
wondering "did that search actually happen?" and looking for visual feedback in
the results table, which is a sign that more feedback was necessary to indicate
that a query had been made that returned new results. To remedy this, I added
a subtle animation when new results were returned. I also indicated the search string
that was used to give the current results along with the total number of 
results found, which is a number that you can easily anchor on to see that new
results are available.
- **Highlighted search string within results** <br />This makes it much easier to 
scan to the relevant section of each result. I used mark.js for this.
- **Added sample queries** <br />This provides a lightweight jumping off point into 
using the tool without having to supply awkward/lengthy explanations.
- **Fixed a bug where the query would fail when the match occurred too early or late in the texts** <br />We weren't bounds checking before indexing into the texts array: see [the issue](https://github.com/zeptonaut/shakesearch/issues/7#issuecomment-1434039036) for more details.
- **Added pagination** <br />Server results for very common phrases (e.g. "or") were returning
quickly but the actual result table was taking a long time to be added to the DOM.
The page was also unresponsive after the results were added. To fix this, I added
simple client-side pagination with "Previous page" and "Next page" buttons and 
the page saved into the route. In doing this, I also reset the scroll position
when going to a new page, which isn't the default when using `react-router`.
- **Added basic styling** <br />Used DaisyUI (a Tailwind component library) to make
things look a little nicer.

## Known issues and next steps
- **Make case sensitivity optional** <br />In my experience, people _mostly_ don't want
case sensitivity. You can make it optional by having a query parameter controlled
by a frontend checkbox (e.g. `&case_sensitive=true`) that indicates whether a particular
query should be case sensitive. On the server, you can store two `SuffixArrays` in `main.go`:
one where the texts maintain their original case and a second where we run a 
lower case function on the entire text before reading it into the `SuffixArray`.
The query parameter just dictates which `SuffixArray` you run your query against: 
if it's a case insensitive query, you can lowercase your query and run it against
the lowercased `SuffixArray`.
- **Add "whole word" match** <br />If you're searching for a query that commonly
occurs within other words (e.g. "a"), then this tool is near useless. This
could be another option implemented using a similar frontend option as case
sensitivity. I have less clarity about how you could implement this on the
backend, but I think that you could probably use a combination of `SuffixArray`
to find the matches and then checking that the first character before the beginning
of the match and the last character after the end of the match aren't "word"
characters, using a similar technique that Regexp word boundaries use
(see documentation [here](https://www.rexegg.com/regex-boundaries.html#:~:text=The%20word%20boundary%20%5Cb%20matches,string%20or%20a%20space%20character)).
- **You shouldn't have to build the `dist/` folder locally before pushing to `master`**
<br/>This is currently necessary because Render either expects a Node app (required to 
build frontend) or a Go app (required to build backend), but has no default 
image that can build both as far as I can tell. This could be solved by creating
a Render blueprint file with two web processes: a static site (that can build
the React frontend) and a Go app (that can build the backend). Then you can use
redirect rules ([as described here](https://render.com/docs/deploy-create-react-app#using-client-side-routing))
to do some sort of routing for the static site where calls to `/api` are redirected to the API server.
My goal here was "get this working on Render" and having a slightly clunky
build process to do so seemed OK for now.
- **Make it responsive** <br />Right now, the page looks downright silly on mobile.
To make it responsive, you have to identify the pixel widths at which it starts
to look silly. In Tailwind, you can then add classes with the breakpoint prefix
that reduce/enlarge the corresponding elements appropriately. I've done this 
many times before (see [my blog here](https://www.zeptonaut.com/posts/find-your-blind-spots/), which is responsive),
but it undoubtedly takes a good chunk of time and attention to detail.
- **Add some frontend and backend tests** <br />The default go unit testing library
works for the server and I'd probably use Cypress for the frontend tests.
- **Actually test it with people** <br />Before you do much more work, you probably
want to just get this in front of a few people and ask them to achieve some basic tasks
with it. What might they use this tool for? Is it clear how to use it from the
landing page? What do they struggle with?
- **Add ability to see the results in context and link to a particular passage**: 
<br />As it stands, I suspect that this app would be much more useful if you could
click a link next to a query result to see the result in the context of the 
broader work and potentially select multiple lines, a la Github code search.
I suspect that sometimes people may want to link to the actual query results,
but it seems like the largest point of search is to find a particular passage
that you can then link to in order to win an argument with a friend.
- **Lots of other search features** <br />You can imagine many other search features
particular to Shakespeare - for example, searching by the character that said 
the line (or whether the text appeared in stage direction) or searching by the
work in which the text appeared. You could achieve this by preparsing the texts
and storing the lines in a SQL database that keeps track of who said each line,
what work it appeared in (e.g. Romeo and Juliet), and what section of that work
it appeared in (e.g. Act IV).
- **Displaying additional metadata alongside the results** <br />It would definitely
help add context to the results if instead of just the text result, you saw above
the result "_Romeo and Juliet_, Act IV, said by Romeo".
- **Better error checking / page not found** <br />Right now, if you manually tweak 
the URL parameters (e.g. to a nonexistent reslt page) you can end up in some
weird states. You can fix this with a simple redirect or not found page.
- **Server side rendering**: <br />Right now, many crawlers will have a hard time
understanding the site. This can lead to problems like poor SEO or previews 
for pages not working when you send a friend a link or share a link on social
media. To fix this, you can use a separate prerender server. Any requests with
a user agent identifying them as a bot (e.g. `googlebot`, `slackbot`) are sent
to this prerender server instead of the normal request. This prerender server
uses a headless version of Chrome to render the website, wait until it's 
reached a steady state, and then returns the HTML for that steady state. In that
way, crawlers can index SPAs like normal HTML sites. Because this is such a 
resource-intensive process, it's important to use aggressive cache timelines
on the page results on the prerender server. In the past, I've used An AWS Lambda
function to handle the routing to the appropriate server.

## Architectural suggestions
If I were doing this "for real", I'd probably _not_ make it a SPA and instead opt
to make it a regular ol' server application (e.g. Rails + Hotwire, Django, a 
similar golang framework) with any necessary interactivity sprinkled in by a
lightweight framework like SolidJS, Svelte, or Preact. 

This app definitely doesn't feel interactive enough to justify the generally slow
site speeds and architectural complexity of a full React application. For example,
getting the prerender server up and running to get SEO working on this would be
complex.

I didn't take this route because I definitely know React better than those

## Deploying
New deploys happen automatically upon new commits to the `master` branch. 
Before committing, you _must_ rebuild the frontend `dist/` folder with `yarn build`.
(See "Known issues and next steps" for a suggested fix to this awkward workflow.)

## Submission

1. Fork this repository and send us a link to your fork after pushing your changes.
2. Render (render.com) hosting, the application deploys cleanly from a public url.
3. In your submission, share with us what changes you made and how you would prioritize changes if you had more time.
