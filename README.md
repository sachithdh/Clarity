# Clarity - Text Analyzer

Clarity is a Chrome extension provides instant detailed information about any selected text on a webpage. Developed using Gemini-Pro-1.5 API, the extension analyzes and returns useful insights related to the selected text.

## Installation

**Create API key**

If you don't already have Gemini API key create a key from [here](https://aistudio.google.com/app/apikey).

- Clone or download this repository.
- Replace [`<API_KEY>`](background.js#L1-L2) in the `background.js` with your API Key.
```js
// Replace this with your actual API key
const API_KEY = "<YOUR_API_KEY>";


```
- Go to `chrome://extensions/` in your Chrome browser.
- Enable **Developer Mode**.
- Click **Load Unpacked** and select the extension directory.
- The extension is now ready to use.


## How It Works
1. Install the extension via developer mode.
2. Highlight any text on a webpage.
3. Right-click and choose the “Clarity” option from the context menu.
4. View detailed insights in a popup.

---

### Screenshots

<img src=Screenshots/ss-2.png/>



<img src=Screenshots/SS-1.png/>
