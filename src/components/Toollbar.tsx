import React, { FC, useState } from 'react'
import { BlockPicker } from 'react-color'

import { canvasState, toolState } from 'store'
import { Circle, Draw, Eraser, Line, Rect } from 'tools'

import { Tooltip } from 'components'
import { ReactComponent as DrawIcon } from 'assets/icons/draw.svg'
import { ReactComponent as RectangleIcon } from 'assets/icons/rectangle.svg'
import { ReactComponent as CircleIcon } from 'assets/icons/circle.svg'
import { ReactComponent as LineIcon } from 'assets/icons/line.svg'
import { ReactComponent as EraserIcon } from 'assets/icons/lastic.svg'
import { ReactComponent as UndoIcon } from 'assets/icons/undo.svg'
import { ReactComponent as RedoIcon } from 'assets/icons/redo.svg'
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg'
import cls from 'styles/components/toolbar.module.sass'
import { animated, useTransition } from 'react-spring'

export const Toolbar: FC = () => {
  const chooseDrawTool = () => toolState.setTool(new Draw(canvasState.canvas))
  const chooseRectTool = () => toolState.setTool(new Rect(canvasState.canvas))
  const chooseCircleTool = () => toolState.setTool(new Circle(canvasState.canvas))
  const chooseLineTool = () => toolState.setTool(new Line(canvasState.canvas))
  const chooseEraserTool = () => toolState.setTool(new Eraser(canvasState.canvas))

  return (
    <div className={cls.toolbarWrap}>

      <Tooltip content='Draw'>
        <Tool Icon={DrawIcon} onClick={chooseDrawTool} />
      </Tooltip>
      <Tooltip content='Rectangle'>
        <Tool Icon={RectangleIcon} onClick={chooseRectTool} />
      </Tooltip>
      <Tooltip content='Circle'>
        <Tool Icon={CircleIcon} onClick={chooseCircleTool} />
      </Tooltip>
      <Tooltip content='Line'>
        <Tool Icon={LineIcon} onClick={chooseLineTool} />
      </Tooltip>
      <Tooltip content='Eraser'>
        <Tool Icon={EraserIcon} onClick={chooseEraserTool} />
      </Tooltip>

      <ColorTool />


      <Tooltip content='Undo'>
        <Tool Icon={UndoIcon} onClick={() => {
        }} />
      </Tooltip>
      <Tooltip content='Redo'>
        <Tool Icon={RedoIcon} onClick={() => {
        }} />
      </Tooltip>
      <Tooltip content='Save'>
        <Tool Icon={SaveIcon} onClick={() => {
        }} />
      </Tooltip>
    </div>
  )
}

type ToolProps = {
  onClick: () => void
  Icon: any
}

const Tool: FC<ToolProps> = ({ onClick, Icon }) => (
  <button className={cls.tool} onClick={onClick}>
    <Icon />
  </button>
)

const colorsList = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8', '#2E3A59']

const ColorTool: FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#2E3A59')

  const toggleVisibility = () => setIsVisible(!isVisible)

  const transitions = useTransition(isVisible, null, {
    from: { opacity: 0, transform: 'translate3d(0, -30%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, -50%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -70%, 0)' }
  })

  return (
    <div className={cls.colorTool}>
      <button className={cls.colorToolButton} onClick={toggleVisibility}>
        <span style={{ backgroundColor: selectedColor }} />
      </button>

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={cls.colorPicker}>
              <BlockPicker
                colors={colorsList}
                triangle={'hide'}
                color={selectedColor}
                onChangeComplete={({ hex }) => setSelectedColor(hex)} />
            </animated.div>
          )
      )}

    </div>
  )
}