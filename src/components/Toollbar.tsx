import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Draw } from 'tools/Draw'
import { Rect } from 'tools/Rect'
import { Line } from 'tools/Line'
import { Circle } from 'tools/Circle'
import { setTool } from 'store/reducers/tool'
import { getCanvas } from 'store/selectors'

import { ReactComponent as DrawIcon } from 'assets/icons/draw.svg'
import { ReactComponent as RectangleIcon } from 'assets/icons/rectangle.svg'
import { ReactComponent as CircleIcon } from 'assets/icons/circle.svg'
import { ReactComponent as LineIcon } from 'assets/icons/line.svg'
import { ReactComponent as EraserIcon } from 'assets/icons/lastic.svg'
import cls from 'styles/components/Toolbar.module.sass'
import { Eraser } from '../tools/Eraser'

export const Toolbar: FC = () => {
  const dispatch = useDispatch()
  const canvas = useSelector(getCanvas)

  const chooseDrawTool = () => dispatch(setTool(new Draw(canvas)))
  const chooseRectTool = () => dispatch(setTool(new Rect(canvas)))
  const chooseCircleTool = () => dispatch(setTool(new Circle(canvas)))
  const chooseLineTool = () => dispatch(setTool(new Line(canvas)))
  const chooseEraserTool = () => dispatch(setTool(new Eraser(canvas)))

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