import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Auth0Provider} from '@auth0/auth0-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Auth0Provider
    domain='dev-vwgdhd3en1zcwos3.us.auth0.com'
    clientId='F1N1HkFfSwuk2lhSxOxeubBMKBcx2qCw'
    authorizationParams={{
      redirect_uri: window.location.origin + '/callback',
      audience: 'https://mentora.com/api',
      scope: 'openid profile email offline_access'
    }}
    redirectUrl={window.location.origin+"/callback"}
    //scope= "openid profile email offline_access"
    useRefreshTokens={true}
    cacheLocation="localstorage"
    
    >
    <App />
    </Auth0Provider >
  </StrictMode>,
)
