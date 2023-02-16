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
an animation when new results were returned. I also indicated the search string
that was used to give the current results.
- **Highlighted search string within results.** This makes it much easier to 
scan to the relevant section of each result. I used mark.js for this.
- **Added sample queries.**: This provides a lightweight jumping off point into 
using the tool without having to supply awkward/lengthy explanations.


## Known issues and next steps
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
- **Add pagination**
- **Make it responsive.**

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
