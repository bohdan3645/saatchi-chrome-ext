chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('paintingNumber', (result) => {
    console.log(`Input value: ${result.paintingNumber}`);
  });
  
});