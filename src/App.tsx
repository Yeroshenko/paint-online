import React from 'react'

import { Header, Canvas, Toolbar } from './components'
import cls from 'styles/components/app.module.sass'

const App = () => (
  <div className={cls.app}>
    <Header />
    <main className={cls.content}>
      <Canvas />
      <Toolbar />
    </main>
  </div>
)

export default App
