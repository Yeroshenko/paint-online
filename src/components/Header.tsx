import React, { FC } from 'react'

import { ReactComponent as BurgerIcon } from 'assets/icons/burger.svg'
import cls from 'styles/components/Header.module.sass'

export const Header: FC = () => {
  return (
    <header className={cls.header}>
      <div className={cls.burger}>
        <BurgerIcon />
      </div>
      <div className={cls.toolName}>Draw</div>
    </header>
  )
}