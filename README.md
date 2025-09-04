# Weather App

Uses everything learned so far to create a weather forecast site using the [Visual Crossing API](https://www.visualcrossing.com/).

## Requirements

- Search for and display weather for a specific location. ✅
- Toggle information between farenheit and celcius. ✅
- Look of the page should change depending on the weather. ✅
- Uses async/await. ✅
- Mobile first design. ⛔️

## Enhancements

- Search bar displays options for cities based on user input. e.g. typing the first 3 characters of the city such as 'New' would display all available cities starting with 'New'.

## Steps

- Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
- Set up a form that will let users input their location and will fetch the weather info (still just console.log() it).
- While you don’t have to, if you wish to display weather icons then there can be a lot of them to import, so have a look at the dynamic import() function. Unlike plain template strings without an import, Webpack can read dynamic imports and still bundle all the relevant assets.
- Add any styling you like!
- Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to simulate network speeds.

### Bugs

- API not loading chance of rain correctly. FIXED ✅
- Cursor not remaining in link state when hovering over a link FIXED ✅

## UI Mockups

### Mobile

![Alt text](src/resources/images/mob-ui.png)

## Webpack-Template

Template for future projects using webpack created by me.

#### Useful Commands

| Command                                      |              Function              |
| -------------------------------------------- | :--------------------------------: |
| npm install                                  | init dist and node_modules folders |
| npm start                                    |         npx webpack serve          |
| npm run build                                |          production build          |
| tree -I node_modules > project-structure.txt |         project structure          |

#### GitIgnore Config

node_modules

dist

project-structure.txt

#### Useful Links

[github md cheatsheet](https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet)

Deployment

Let’s deploy your project to GitHub pages! This is a little more work than it has been for previous projects, because GitHub Pages tries to look for an index.html in the root of your project, but yours is inside dist! We will need to do a few steps to push the contents of your dist directory to its own branch on GitHub, which will then have a root-level index.html for GitHub pages to serve.

You don’t need to know exactly what all the commands do - as long as you follow the instructions below carefully you should be fine. You can use these instructions to deploy your project initially, and also redeploy it again if you make more changes to your project later.

- Make a new branch to deploy from by running git branch gh-pages. You only need to do this the first time you deploy. The rest of the steps should be done every time you deploy or redeploy your project.
- Make sure you have all your work committed. You can use git status to see if there’s anything that needs committing.
- Run git checkout gh-pages && git merge main --no-edit to change branch and sync your changes from main so that you’re ready to deploy.
- Now let’s bundle our application into dist with your build command. For now, that’s npx webpack.

- Now there are a few more commands. Run each of these in order:

  git add dist -f && git commit -m "Deployment commit"
  git subtree push --prefix dist origin gh-pages
  git checkout main

Recall that the source branch for GitHub Pages is set in your repository’s settings. Get this changed to the gh-pages branch. That should be everything!

✅❌⛔️
