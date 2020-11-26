const SET_CANVAS = 'CANVAS/SET_CANVAS'

const initialState = {
  canvas: HTMLCanvasElement
}

export type InitialState = typeof initialState

export const canvasReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case SET_CANVAS:
      return { ...state, canvas: action.canvas }

    default:
      return state
  }
}

type SetCanvas = {
  type: typeof SET_CANVAS
  canvas: HTMLCanvasElement
}

export const setCanvas = (canvas: HTMLCanvasElement): SetCanvas => ({ type: SET_CANVAS, canvas })

