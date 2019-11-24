import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { ActionType, StateType } from 'typesafe-actions';

import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { reducer as postReducer } from './post/reducer';
import { ActionTypeUnion as PostActionType } from './post/actions';
import { epics as postEpic } from './post/epics';

const rootEpic = combineEpics(...postEpic);
const epicMiddleware = createEpicMiddleware();
// Reducers

const reducer = combineReducers({ post: postReducer });

export type RootActions = ActionType<PostActionType>;

export type AppState = StateType<typeof reducer>;

function configureStore(preloadedState: any) {
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = composeWithDevTools(...enhancers);

  const store = createStore(reducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
}

export const rootStore = configureStore(undefined);
