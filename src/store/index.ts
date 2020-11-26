import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { canvasReducer } from './reducers/canvas'
import { toolReducer } from './reducers/tool'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  tool: toolReducer
})

type RootReducer = typeof rootReducer

export type AppState = ReturnType<RootReducer>
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

