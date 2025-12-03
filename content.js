// Content script - S'exécute dans le contexte de la page web

// Créer un curseur personnalisé pour visualiser le contrôle
let customCursor = null;

function createCustomCursor() {
    if (!customCursor) {
        customCursor = document.createElement('div');
        customCursor.id = 'hand-gesture-cursor';
        customCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(0, 255, 0, 0.6);
            border: 2px solid rgba(0, 255, 0, 1);
            pointer-events: none;
            z-index: 999999;
            display: none;
            transform: translate(-50%, -50%);
            transition: all 0.05s ease;
        `;
        document.body.appendChild(customCursor);
    }
}

// Écouter les messages du background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'moveCursor') {
        createCustomCursor();
        customCursor.style.display = 'block';
        customCursor.style.left = request.x + 'px';
        customCursor.style.top = request.y + 'px';
    } 
    else if (request.action === 'simulateClick') {
        const x = parseFloat(customCursor.style.left);
        const y = parseFloat(customCursor.style.top);
        const element = document.elementFromPoint(x, y);
        
        if (element) {
            // Animation du clic
            customCursor.style.background = 'rgba(255, 0, 0, 0.8)';
            setTimeout(() => {
                customCursor.style.background = 'rgba(0, 255, 0, 0.6)';
            }, 200);
            
            // Simuler le clic
            element.click();
            
            // Déclencher les événements de souris
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y
            });
            element.dispatchEvent(clickEvent);
        }
    }
    else if (request.action === 'keyPress') {
        // Simuler les pressions de touches
        const keyEvent = new KeyboardEvent('keydown', {
            key: request.key,
            code: 'Key' + request.key.toUpperCase(),
            ctrlKey: request.ctrl || false,
            shiftKey: request.shift || false,
            altKey: request.alt || false,
            bubbles: true,
            cancelable: true
        });
        
        document.dispatchEvent(keyEvent);
        
        // Pour certains raccourcis, exécuter la commande directement
        if (request.ctrl) {
            switch(request.key) {
                case 'c':
                    document.execCommand('copy');
                    break;
                case 'v':
                    document.execCommand('paste');
                    break;
                case 'x':
                    document.execCommand('cut');
                    break;
                case 'z':
                    document.execCommand('undo');
                    break;
                case 'y':
                    document.execCommand('redo');
                    break;
                case 'a':
                    document.execCommand('selectAll');
                    break;
            }
        }
    }
    
    return true;
});

// Injecter le script dans le contexte de la page
function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('injected.js');
    script.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectScript);
} else {
    injectScript();
}

console.log('Extension Contrôle par Gestes - Content Script chargé');
