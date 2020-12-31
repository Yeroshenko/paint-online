import React, { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { canvasState, toolState } from 'store'
import { Draw } from 'tools/Draw'
import cls from 'styles/components/canvas.module.sass'

export const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Draw(canvasRef.current))
    }
  }, [])

  return (
    <div className={cls.canvasWrap}>
      <canvas className={cls.canvas} ref={canvasRef} width={1170} height={655} onMouseDown={mouseDownHandler} />
    </div>
  )
})