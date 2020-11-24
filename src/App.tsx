import React from 'react'

import { Header } from './components/Header'
import cls from 'styles/components/App.module.sass'

const App = () => (
  <div className={cls.app}>
    <Header />
    <main className={cls.content}>
      Hello paint online
    </main>
  </div>
)

export default App
