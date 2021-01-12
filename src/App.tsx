import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { getId } from 'utils'
import { Header, Canvas, Toolbar } from './components'
import cls from 'styles/components/app.module.sass'

const App = () => (
  <div className={cls.app}>
    <Switch>
      <Route path='/:id'>
        <Header />
        <main className={cls.content}>
          <Canvas />
          <Toolbar />
        </main>
      </Route>
      <Redirect to={getId()} />
    </Switch>
  </div>
)

export default App
