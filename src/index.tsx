import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import 'styles/index.sass'

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))
