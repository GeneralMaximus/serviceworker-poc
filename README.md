# serviceworker-poc

serviceworker-poc is a simple application that demonstrates the ServiceWorker
API. It lets you list a user's GitHub repositories, and caches the results
for offline access.


## Running

First, clone this repository:

	$ git clone https://github.com/GeneralMaximus/serviceworker-poc

Then, `cd` into the project directory and install all the dependencies:

	$ npm i

Finally, run the application:

	$ npm start


## Demonstration

1. With the server still running, open http://localhost:3000 in your browser.
2. Enter a valid GitHub username in the search box and click "search". The
   application will display a list of repositories belonging to the user.
3. Repeat step 2 for as many users as you like. Each time you look for a new
   user, the application caches the result for offline viewing.
4. Disable the network connection on your computer.
5. Now, go back and search for the same usernames you searched for in
   steps 2 and 3. Despite the lack of a network connection, the application
   still shows you the cached search results.
