// Replace this with your actual API key
const API_KEY = "AIzaSyCsBZPYwOIs4TRTccVUyHUbNxA7vFrfxu0";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "Clarity",
    title: "Clarity",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "Clarity" && info.selectionText) {
    generateResponse(info.selectionText)
      .then((response) => {
        // Ensure content script is loaded before sending message
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          () => {
            // Now send the message
            chrome.tabs.sendMessage(tab.id, {
              action: "showAlert",
              text: response,
            });
          }
        );
      })
      .catch((error) => {
        console.error("Error generating response:", error);
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(tab.id, {
              action: "showAlert",
              text:
                "An error occurred while generating the response: " +
                error.message,
            });
          }
        );
      });
  }
});

async function generateResponse(text) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          // parts: [{ text: "Give me five subcategories of jazz?" }],
          parts: [{ text: `Explain: ${text} in one sentence` }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${JSON.stringify(
        errorData
      )}`
    );
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
