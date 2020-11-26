import React, { FC, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setCanvas } from 'store/reducers/canvas'
import { setTool } from 'store/reducers/tool'
import { Draw } from 'tools/Draw'
import cls from 'styles/components/Canvas.module.sass'

export const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null )
  const dispatch = useDispatch()

  useEffect(() => {
    if (canvasRef.current) {
      dispatch(setCanvas(canvasRef.current))
      dispatch(setTool(new Draw(canvasRef.current)))
    }
  }, [dispatch])

  return (
    <div className={cls.canvasWrap}>
      <canvas className={cls.canvas} ref={canvasRef} width={1170} height={655} />
    </div>
  )
} 