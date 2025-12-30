import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import keycloak from './Keycloak';
import './index.css'  // <--- CETTE LIGNE EST CRUCIALE


keycloak.init({ 
    onLoad: 'login-required', // Force la redirection vers Keycloak si non connecté
    checkLoginIframe: false 
}).then((authenticated) => {
    if (authenticated) {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    } else {
        window.location.reload();
    }
}).catch(() => {
    console.error("Échec de l'authentification Keycloak");
});