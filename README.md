This project is made possible by the countless hours I've spent (and continue to spend) building StyleStash. A browser extension that allows you to inspect, edit, and save your favorite CSS styles!

If you're a web developer (you likely are if you've stumbled across this project), I'd really appreciate it if you could spare 2 minutes of your busy schedule to check out StyleStash. I honestly think you'll find it really useful.

## react-chrome-extension

![Alt text](./react-chrome-extension.png?raw=true "Optional Title")

## Video Tutorials

This is a passion project of mine, therefore I've decided to give away a large chunk of code for free -- as well as perform a code walkthrough of sorts available here.

### Local Testing

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Testing Inside Chrome

You need to build this project before you use add it to Chrome as a developer extension and to test Chrome specific features like using the Content script and getting the extension ID or using the Chrome Storage API, for example.

To load as a developer extension inside of Chrome:

1. `npm run build` <br>
2. Navigate to `chrome://extensions/` in your browser <br>
3. Toggle the `Developer mode` switch on in the top right hand corner <br>
4. Click the `Load unpacked` button in the top left corner <br>
5. Select the `build` folder inside of this project folder <br>

Builds the app for Chrome to the `build` folder.<br>

