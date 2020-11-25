import React, { FC } from 'react'

import cls from 'styles/components/Canvas.module.sass'

export const Canvas: FC = () => {
  return (
    <div className={cls.canvasWrap}>
      <canvas className={cls.canvas} width={1170} height={655} />
    </div>
  )
} 