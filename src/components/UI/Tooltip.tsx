import React, { FC, useState } from 'react'
import { useTransition, animated } from 'react-spring'

import cls from 'styles/components/tooltip.module.sass'

type TooltipProps = {
  content: string
}

export const Tooltip: FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  const transitions = useTransition(isVisible, null, {
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, -50%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -150%, 0)' }
  })

  return (
    <div className={cls.tooltip}>
      <div onMouseEnter={show} onMouseLeave={hide}>
        {children}
      </div>

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={cls.tooltipBody}>
              {content}
            </animated.div>
          )
      )}
    </div>
  )
}
