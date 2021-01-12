import React, { FC } from 'react'
import cn from 'classnames'

import cls from 'styles/components/button.module.sass'

type ButtonProps = {
  className?: string,
  htmlType: 'submit' | 'button' | 'reset'
}

export const Button: FC<ButtonProps> = ({ className, htmlType = 'button', children }) => (
  <button className={cn(cls.button, className)} type={htmlType}>
    {children}
  </button>
)

