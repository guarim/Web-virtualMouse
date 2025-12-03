// Service Worker pour gérer les messages et les commandes

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'executeShortcut') {
        executeShortcut(request.shortcut);
    } else if (request.action === 'moveMouse') {
        // Le mouvement de souris est géré par le content script
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'moveCursor',
                    x: request.x,
                    y: request.y
                });
            }
        });
    } else if (request.action === 'click') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'simulateClick'
                });
            }
        });
    }
    return true;
});

async function executeShortcut(shortcut) {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    if (!tabs[0]) return;

    const tabId = tabs[0].id;

    switch(shortcut) {
        case 'copy':
            chrome.tabs.sendMessage(tabId, { action: 'keyPress', key: 'c', ctrl: true });
            break;
        case 'paste':
            chrome.tabs.sendMessage(tabId, { action: 'keyPress', key: 'v', ctrl: true });
            break;
        case 'save':
            chrome.tabs.sendMessage(tabId, { action: 'keyPress', key: 's', ctrl: true });
            break;
        case 'find':
            chrome.tabs.sendMessage(tabId, { action: 'keyPress', key: 'f', ctrl: true });
            break;
        case 'refresh':
            chrome.tabs.reload(tabId);
            break;
        case 'undo':
            chrome.tabs.sendMessage(tabId, { action: 'keyPress', key: 'z', ctrl: true });
            break;
        case 'redo':
            chrome.tabs.sendMessage(tabId, { action: 'keyPress', key: 'y', ctrl: true });
            break;
        case 'newTab':
            chrome.tabs.create({});
            break;
        case 'closeTab':
            chrome.tabs.remove(tabId);
            break;
        case 'zoomIn':
            chrome.tabs.getZoom(tabId, (zoomFactor) => {
                chrome.tabs.setZoom(tabId, zoomFactor + 0.1);
            });
            break;
    }
}

// Écouter l'installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Contrôle par Gestes installée');
});
