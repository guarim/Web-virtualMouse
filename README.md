# Web-virtualMouse
# 🖐️ Extension Chrome - Contrôle par Gestes de Main

Extension Chrome permettant de contrôler votre navigateur avec des gestes de main détectés par webcam.

## 📋 Prérequis

- Google Chrome ou Microsoft Edge (version récente)
- Webcam fonctionnelle
- Connexion Internet (pour MediaPipe)

## 📁 Structure des fichiers

Créez un dossier `hand-gesture-extension` avec cette structure :

```
hand-gesture-extension/
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── content.js
├── injected.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🎨 Création des icônes

Créez 3 icônes PNG simples (ou utilisez un générateur en ligne) :
- **icon16.png** : 16x16 pixels
- **icon48.png** : 48x48 pixels  
- **icon128.png** : 128x128 pixels

Vous pouvez utiliser une icône de main 🖐️ ou créer les vôtres sur https://www.canva.com ou https://favicon.io

## 🚀 Installation

### 1. Télécharger les fichiers

Copiez tous les fichiers fournis dans le dossier `hand-gesture-extension`.

### 2. Activer le mode développeur dans Chrome

1. Ouvrez Chrome
2. Allez dans `chrome://extensions/`
3. Activez le **Mode développeur** (coin supérieur droit)

### 3. Charger l'extension

1. Cliquez sur **Charger l'extension non empaquetée**
2. Sélectionnez le dossier `hand-gesture-extension`
3. L'extension apparaît dans la liste

### 4. Épingler l'extension

Cliquez sur l'icône puzzle 🧩 à côté de la barre d'adresse, puis épinglez l'extension pour un accès rapide.

## 🎮 Utilisation

### Démarrage

1. Cliquez sur l'icône de l'extension
2. Cliquez sur **▶️ Démarrer** pour activer la caméra
3. Autorisez l'accès à la webcam

### Contrôle de la souris (Main droite)

1. Activez **🖱️ Activer Souris**
2. Levez l'**index droit** pour déplacer la souris
3. Touchez le **pouce** avec l'**index** pour cliquer

### Raccourcis clavier

Activez **⌨️ Activer Raccourcis** puis :

#### ✋ Main Droite
- 👍 + 👆 **Pouce + Index** → Copier (Ctrl+C)
- 👍 + 🖕 **Pouce + Majeur** → Coller (Ctrl+V)
- 👍 + 💍 **Pouce + Annulaire** → Sauvegarder (Ctrl+S)
- 👍 + 🤙 **Pouce + Auriculaire** → Rechercher (Ctrl+F)
- ✊ **Poing fermé** → Actualiser (F5)

#### ✋ Main Gauche
- 👍 + 👆 **Pouce + Index** → Annuler (Ctrl+Z)
- 👍 + 🖕 **Pouce + Majeur** → Refaire (Ctrl+Y)
- 👍 + 💍 **Pouce + Annulaire** → Nouvel Onglet (Ctrl+T)
- 👍 + 🤙 **Pouce + Auriculaire** → Fermer Onglet (Ctrl+W)
- ✊ **Poing fermé** → Zoom + (Ctrl++)

## ⚙️ Configuration

### Permissions requises

L'extension nécessite :
- **activeTab** : Pour interagir avec l'onglet actif
- **tabs** : Pour gérer les onglets
- **storage** : Pour sauvegarder les paramètres

### Compatibilité

- ✅ Google Chrome (v88+)
- ✅ Microsoft Edge (v88+)
- ⚠️ Nécessite MediaPipe (chargé via CDN)

## 🔧 Dépannage

### La caméra ne démarre pas
- Vérifiez les permissions de la webcam dans Chrome
- Allez dans `chrome://settings/content/camera`
- Autorisez l'accès à la caméra

### Les raccourcis ne fonctionnent pas
- Assurez-vous que l'extension a les permissions sur le site
- Certains sites (chrome://, about:) bloquent les extensions
- Rechargez la page et l'extension

### La détection est lente
- Fermez d'autres applications utilisant la webcam
- Améliorez l'éclairage de votre environnement
- Réduisez la distance avec la caméra (50-100 cm idéal)

### Les gestes ne sont pas reconnus
- Faites des mouvements clairs et distincts
- Maintenez les doigts en contact pendant 1 seconde
- Évitez les mouvements trop rapides

## 🛠️ Développement

### Modifier l'extension

1. Modifiez les fichiers sources
2. Allez dans `chrome://extensions/`
3. Cliquez sur le bouton **Recharger** (🔄) de l'extension

### Déboguer

- **Popup** : Clic droit sur l'icône → Inspecter
- **Background** : `chrome://extensions/` → Détails → Inspecter les vues
- **Content Script** : F12 dans la page web → Console

### Logs

Les logs apparaissent dans :
- Console du popup (pour popup.js)
- Console de la page (pour content.js et injected.js)
- Service Worker (pour background.js)

## 📝 Notes importantes

### Limitations
- Ne fonctionne pas sur les pages système de Chrome (chrome://, chrome-extension://)
- Nécessite une connexion Internet pour charger MediaPipe
- Performance dépend de la puissance de l'ordinateur

### Sécurité
- Aucune donnée vidéo n'est envoyée en ligne
- Traitement local via MediaPipe
- Pas de stockage de données personnelles

### Performance
- Utilise environ 10-20% du CPU
- Consommation mémoire : ~100-200 MB
- Détection à environ 15-30 FPS

## 🎯 Astuces d'utilisation

1. **Éclairage** : Assurez-vous d'avoir un bon éclairage
2. **Distance** : Placez-vous à 50-100 cm de la caméra
3. **Arrière-plan** : Un fond uni améliore la détection
4. **Gestes** : Faites des mouvements clairs et maintenus
5. **Calibration** : Testez les gestes avant utilisation intensive

## 📄 Licence

Ce projet est libre d'utilisation pour un usage personnel et éducatif.

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez la section Dépannage
2. Consultez les logs dans la console
3. Rechargez l'extension après modification

## 🔄 Mises à jour

Pour mettre à jour :
1. Remplacez les fichiers dans le dossier
2. Allez dans `chrome://extensions/`
3. Cliquez sur **Recharger** (🔄)

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2024
