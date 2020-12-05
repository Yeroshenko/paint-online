import React, { FC } from 'react'

import { canvasState, toolState } from 'store'

import { Draw } from 'tools/Draw'
import { Rect } from 'tools/Rect'
import { Line } from 'tools/Line'
import { Circle } from 'tools/Circle'
import { Eraser } from 'tools/Eraser'

import { ReactComponent as DrawIcon } from 'assets/icons/draw.svg'
import { ReactComponent as RectangleIcon } from 'assets/icons/rectangle.svg'
import { ReactComponent as CircleIcon } from 'assets/icons/circle.svg'
import { ReactComponent as LineIcon } from 'assets/icons/line.svg'
import { ReactComponent as EraserIcon } from 'assets/icons/lastic.svg'
import cls from 'styles/components/Toolbar.module.sass'

export const Toolbar: FC = () => {

  const chooseDrawTool = () => toolState.setTool(new Draw(canvasState.canvas))
  const chooseRectTool = () => toolState.setTool(new Rect(canvasState.canvas))
  const chooseCircleTool = () => toolState.setTool(new Circle(canvasState.canvas))
  const chooseLineTool = () => toolState.setTool(new Line(canvasState.canvas))
  const chooseEraserTool = () => toolState.setTool(new Eraser(canvasState.canvas))

  return (
    <div className={cls.toolbarWrap}>
      <Tool Icon={DrawIcon} onClick={chooseDrawTool} />
      <Tool Icon={RectangleIcon} onClick={chooseRectTool} />
      <Tool Icon={CircleIcon} onClick={chooseCircleTool} />
      <Tool Icon={LineIcon} onClick={chooseLineTool} />
      <Tool Icon={EraserIcon} onClick={chooseEraserTool} />
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