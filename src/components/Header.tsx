import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { toolState } from 'store'
import { ReactComponent as BurgerIcon } from 'assets/icons/burger.svg'
import cls from 'styles/components/header.module.sass'


export const Header: FC = observer(() => {
  const [rangeValue, setRangeValue] = useState(toolState.tool?.currentLineWidth)

  const rangeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+e.target.value.toString())
    toolState.setLineWidth(+e.target.value)
  }

  useEffect(() => {
    setRangeValue(toolState.tool?.currentLineWidth)
  }, [toolState.tool])


  return (
    <header className={cls.header}>
      <div className={cls.burger}>
        <BurgerIcon />
      </div>
      <div className={cls.toolName}>{toolState.toolName}</div>
      <input type='range' min={5} max={50} value={rangeValue || 0} onChange={rangeChangeHandler} />
    </header>
  )
})