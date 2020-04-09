## react-chrome-extension
![Alt text](./react-chrome-extension.png?raw=true "Optional Title")

This is the first in a series of React boilerplate projects to help web developers learn and understand React. This project actually came about as I was creating my latest project, [StyleStash - Save Your favorite CSS Styles](https://stylestash.dev).

## Video Code Walkthrough

If you're more of a visual learner, I've recorded a [20 minute video walkthrough of this project](https://www.youtube.com/watch?v=4x0lQu1TOCQ).

### Local Testing

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Testing Inside Chrome

This project needs to be built in order to take advantage of the Chrome Extension API, such as using the Content script to get the extension's ID, or using the Chrome Storage API. These features cannot be used when running this project locally.

To load as a developer extension inside of Chrome:

1. `npm run build` <br>
2. Navigate to `chrome://extensions/` in your browser <br>
3. Toggle the `Developer mode` switch on in the top right hand corner <br>
4. Click the `Load unpacked` button in the top left corner <br>
5. Select the `build` folder inside of this project folder <br>

Builds the app for Chrome to the `build` folder.<br>

