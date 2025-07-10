import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MindmapPage from './mindmap.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MindmapPage />
  </StrictMode>,
)
