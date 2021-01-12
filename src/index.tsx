import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

import 'styles/index.sass'

const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))
