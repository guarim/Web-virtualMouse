// Script injecté dans le contexte de la page web
// Permet d'interagir directement avec le DOM de la page

(function() {
    'use strict';
    
    console.log('Script de gestes injecté dans la page');
    
    // Fonction pour simuler des événements clavier plus réalistes
    window.simulateKeyPress = function(key, modifiers = {}) {
        const target = document.activeElement || document.body;
        
        const events = ['keydown', 'keypress', 'keyup'];
        events.forEach(eventType => {
            const event = new KeyboardEvent(eventType, {
                key: key,
                code: `Key${key.toUpperCase()}`,
                keyCode: key.charCodeAt(0),
                which: key.charCodeAt(0),
                ctrlKey: modifiers.ctrl || false,
                shiftKey: modifiers.shift || false,
                altKey: modifiers.alt || false,
                metaKey: modifiers.meta || false,
                bubbles: true,
                cancelable: true,
                view: window
            });
            
            target.dispatchEvent(event);
        });
    };
    
    // Fonction pour simuler un clic plus réaliste
    window.simulateRealClick = function(x, y) {
        const element = document.elementFromPoint(x, y);
        if (!element) return;
        
        const events = ['mousedown', 'mouseup', 'click'];
        events.forEach(eventType => {
            const event = new MouseEvent(eventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y,
                screenX: window.screenX + x,
                screenY: window.screenY + y,
                button: 0,
                buttons: 1
            });
            
            element.dispatchEvent(event);
        });
        
        // Si c'est un lien ou un bouton, déclencher l'action
        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            element.click();
        }
        
        // Si c'est un input, le focus
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.focus();
        }
    };
    
    // Écouter les messages depuis le content script
    window.addEventListener('message', (event) => {
        if (event.source !== window) return;
        
        if (event.data.type === 'GESTURE_CLICK') {
            window.simulateRealClick(event.data.x, event.data.y);
        } else if (event.data.type === 'GESTURE_KEY') {
            window.simulateKeyPress(event.data.key, event.data.modifiers);
        }
    });
    
    // Améliorer la compatibilité avec les sites qui bloquent les événements
    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function() {
        if (this.isTrusted === false && this.type.startsWith('key')) {
            // Ne pas bloquer nos événements de clavier simulés
            return;
        }
        originalPreventDefault.call(this);
    };
    
})();
