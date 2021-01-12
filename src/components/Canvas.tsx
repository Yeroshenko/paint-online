import React, { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import { canvasState, toolState } from 'store'
import { Draw } from 'tools/Draw'
import { Modal, InitialForm } from 'components'
import cls from 'styles/components/canvas.module.sass'
import { Rect } from '../tools'
import axios from 'axios'

type RouteParams = {
  id: string
}

type ConnectHandler = {
  username: string
}

export const Canvas: FC = observer(() => {
  const [visibleModal, setVisibleModal] = useState(true)

  const routeParams = useParams() as RouteParams
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const sessionId = routeParams.id

  const hideModal = () => setVisibleModal(false)

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  const mouseUpHandler = () => {
    if (!canvasRef.current) return

    axios.post(`http://localhost:5000/image?id=${sessionId}`, {
      img: canvasRef.current.toDataURL()
    })

  }

  const connectHandler = ({ username }: ConnectHandler) => {
    canvasState.setUsername(username)
    hideModal()
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)

      const ctx = canvasRef.current.getContext('2d')

      axios.get(`http://localhost:5000/image?id=${sessionId}`).then((res) => {
        // TODO: DONT REPEAT
        const img = new Image()
        img.src = res.data.data


        img.onload = () => {
          // @ts-ignore
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          // @ts-ignore
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
          // @ts-ignore
          ctx.stroke()
        }
      })
    }
  }, [])

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000')
      //@ts-ignore
      canvasState.setSocket(socket)
      //@ts-ignore
      canvasState.setSessionId(sessionId)
      toolState.setTool(new Draw(canvasRef.current, socket, sessionId))

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: sessionId,
          username: canvasState.username,
          method: 'CONNECTION'
        }))
      }

      socket.onmessage = (event) => {
        const msg = event.data

        switch (msg.method) {
          case 'CONNECTION':
            console.log(`User ${msg.username} connected`)
            break
          case 'DRAW':
            drawHandler(msg)
            break
        }
      }
    }
  }, [canvasState.username])

  const drawHandler = (msg: any) => {
    const { figure } = msg

    const ctx = canvasRef.current?.getContext('2d')

    if (ctx) {
      switch (figure.type) {
        case 'BRUSH':
          Draw.draw(ctx, figure.x, figure.y, toolState.lineWidth)
          break
        case 'FINISH':
          ctx.beginPath()
          break
        case 'RECT':
          Rect.serverDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
          break
      }
    }
  }

  return (
    <div className={cls.canvasWrap}>
      <Modal visible={visibleModal} className={cls.modal}>
        <InitialForm onSubmit={connectHandler} />
      </Modal>
      <canvas
        className={cls.canvas}
        ref={canvasRef}
        width={1170}
        height={655}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler} />
    </div>
  )
})
