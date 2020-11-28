import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { getToolName } from 'store/selectors'

import { ReactComponent as BurgerIcon } from 'assets/icons/burger.svg'
import cls from 'styles/components/Header.module.sass'

export const Header: FC = () => {
  const title = useSelector(getToolName)

  return (
    <header className={cls.header}>
      <div className={cls.burger}>
        <BurgerIcon />
      </div>
      <div className={cls.toolName}>{title}</div>
    </header>
  )
}