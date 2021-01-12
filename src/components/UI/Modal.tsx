import React, { FC } from 'react'
import cn from 'classnames'
// import { useTransition, animated } from 'react-spring'

import { Portal } from './Portal'
import cls from 'styles/components/modal.module.sass'

type ModalProps = {
  visible: boolean
  className?: string
}

export const Modal: FC<ModalProps> = ({ visible, className, children }) => {

  // const modalTransition = useTransition(visible, null, {
  //   delay: 2,
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 }
  // })

  return (
    <Portal>
      {/*{modalTransition.map(({ item, key, props }) => {*/}
      {/*  return item &&*/}
      {/*    <animated.div className={cls.backdrop} key={key} style={props}>*/}
      {/*      <animated.div className={cn(cls.modal, className)} key={key} style={props}>*/}
      {/*        {children}*/}
      {/*      </animated.div>*/}
      {/*    </animated.div>*/}
      {/*})}*/}
      {visible &&
        <div className={cls.backdrop}>
          <div className={cn(cls.modal, className)}>
            {children}
          </div>
        </div>
      }
    </Portal>
  )
}

