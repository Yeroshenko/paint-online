import React, { FC, forwardRef } from 'react'
import cn from 'classnames'

import cls from 'styles/components/input.module.sass'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  errorText?: string
  error?: boolean
  Icon?: FC
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ errorText, error = false, Icon, ...props }, ref) => {
  return (
    <div className={cls.wrapper}>
      <div className={cn(cls.inputWrap, { [cls.error]: error })}>
        <input className={cn(cls.input, { [cls.error]: error }, { [cls.hasIcon]: Icon })} ref={ref} {...props} />
        {Icon && <Icon />}
      </div>
      {errorText && <span className={cls.errorText}>{errorText}</span>}
    </div>
  )
})