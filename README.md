#Visual test submission#
##Leanne Tite##

### Installation ###
- The app runs off a Node / Express server. To run the app you need to have NodeJS [http://nodejs.org/] installed.
- The app uses MongoDB as a persistence layer, so MongoDB [http://www.mongodb.org/downloads] should also be installed. You may need to do some additional Mongo configuration, such as adding a data folder to your system's root directory [http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/].
- Run npm install and bower install


### Start up ###
- On the command line, start up mongo with ```mongod```
- Next, navigate to the app's server directory
- Run ```node server```
- If everything has been properly installed, you should see the app running on ```http://localhost:3001/``` in your browser


### Features ###
- The app is progressively enhanced. The user can still create events with JS disabled, via a synchronous form submission.
- CSS3 features are intended to gracefully degrade as none are essentional to basic usage of the app. The app will not look as polished in IE8 as the latest Chrome, but it will still be functional**. Ideally this could be corrected in the small number if cases needed with an IE8-only style sheet.
- The app uses Backbone as an MVC framework, and Backbone's dependencies [jQuery and underscore] are also utilised. Because all these libraries work in IE8+ I have not made use of any feature detection library like Modernizr.
- The app uses AMD modules via requireJS. This allows for easy portability of the app. If the app were part of a wider site, requireJS means the app's dependencies will be targetted only to the pages that need them so keeping the page payload minimized. There are 2 http requests for JS, one in the document head, required for setting a JS class on the html element prior to page render, and require JS's main JS file at the end of the body element.
- GruntJS is used to automate build tasks.
- There is one minified CSS file. All images have been optimised. Background images have been collated into a sprite. There is an additional http request for the site logo, so an image is available for search engine use.
- The app uses accessibility practices including ARIA specs.
- The app layout is responsive, using a mobile-first approach, implemented with hand-rolled media queries.

### What's missing ###
Lack of time meant the following features were omitted:

- JS unit tests 
- ReuireJS optimizer has not been implemeted so JS assets are not minified  
- The app has not been x-browser tested

