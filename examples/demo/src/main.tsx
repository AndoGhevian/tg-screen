import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  backButton,
  mainButton,
  closingBehavior,
  init,
  initData,
  miniApp,
  settingsButton,
  secondaryButton,
  swipeBehavior,
  viewport,
  themeParams,
} from '@telegram-apps/sdk-react';
import App from './App.tsx'

init()
// You need to explicitly mount the components you want to use
settingsButton.mount();
backButton.mount()
mainButton.mount()
secondaryButton.mount()
closingBehavior.mount();
swipeBehavior.mount();
viewport.mount();
miniApp.mount()
themeParams.mount()
initData.restore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
