import React, { FC } from 'react'

import { ReactComponent as DrawIcon } from 'assets/icons/draw.svg'
import { ReactComponent as RectangleIcon } from 'assets/icons/rectangle.svg'
import { ReactComponent as CircleIcon } from 'assets/icons/circle.svg'
import cls from 'styles/components/Toolbar.module.sass'

export const Toolbar: FC = () => {
  return (
    <div className={cls.toolbarWrap}>
      <Tool Icon={DrawIcon} onClick={() => {}} />
      <Tool Icon={RectangleIcon} onClick={() => {}} />
      <Tool Icon={CircleIcon} onClick={() => {}} />
    </div>
  )
}

type ToolProps = {
  onClick: () => void,
  Icon: any
}

const Tool: FC<ToolProps> = ({ onClick, Icon }) => (
  <button className={cls.tool} onClick={onClick}>
    <Icon />
  </button>
)