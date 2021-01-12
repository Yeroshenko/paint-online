import { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

const portalRoot = document.body

export const Portal: FC = ({ children }) => {
  const node = document.createElement('div')

  useEffect(() => {
    if (portalRoot && node) {
      portalRoot.appendChild(node)
    }
    return () => {
      if (portalRoot && node) {
        portalRoot.removeChild(node)
      }
    }
  }, [node])

  return node ? createPortal(children, node) : null
}
