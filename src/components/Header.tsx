import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { toolState } from 'store'
import { ReactComponent as BurgerIcon } from 'assets/icons/burger.svg'
import cls from 'styles/components/Header.module.sass'

export const Header: FC = observer(() => {
  return (
    <header className={cls.header}>
      <div className={cls.burger}>
        <BurgerIcon />
      </div>
      <div className={cls.toolName}>{toolState.toolName}</div>
    </header>
  )
})