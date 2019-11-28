import { action, ActionType } from 'typesafe-actions';
import { DataDB, DTOProps } from '../../shared/interfaces/data';

export enum ActionTypes {
  ADD_POST = 'ADD_POST',
  ADD_POST_SUCCESS = 'ADD_POST_SUCCESS',
  ADD_POST_FAILURE = 'ADD_POST_FAILURE',

  GET_POSTS = 'GET_POSTS',
  GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS',
  GET_POSTS_FAILURE = 'GET_POSTS_FAILURE',

  TOOGLE_BOOKED = 'TOOGLE_BOOKED',
  TOOGLE_BOOKED_SUCCESE = 'TOOGLE_BOOKED_SUCCESE',
  TOOGLE_BOOKED_FAILURE = 'TOOGLE_BOOKED_FAILURE',

  REMOVE_POST = 'REMOVE_POST',
  REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS',
  REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE',
}

export const Actions = {
  addPost: (payload: DTOProps) => action(ActionTypes.ADD_POST, payload),
  addPostSuccess: (payload: DataDB) =>
    action(ActionTypes.ADD_POST_SUCCESS, payload),
  addPostFailure: (error: string) =>
    action(ActionTypes.ADD_POST_FAILURE, error),

  getPosts: () => action(ActionTypes.GET_POSTS),
  getPostsSuccess: (payload: DataDB[]) =>
    action(ActionTypes.GET_POSTS_SUCCESS, payload),
  getPostsFailure: (error: string) =>
    action(ActionTypes.GET_POSTS_FAILURE, error),

  toggleBooked: (payload: DataDB) => action(ActionTypes.TOOGLE_BOOKED, payload),
  toggleBookedSuccess: (payload: number | unknown) =>
    action(ActionTypes.TOOGLE_BOOKED_SUCCESE, payload),
  toggleBookedFailure: (error: string) =>
    action(ActionTypes.TOOGLE_BOOKED_FAILURE, error),

  removePost: (payload: string) => action(ActionTypes.REMOVE_POST, payload),
  removePostSuccess: (payload: number | unknown) =>
    action(ActionTypes.REMOVE_POST_SUCCESS, payload),
  removePostFailure: (error: string) =>
    action(ActionTypes.REMOVE_POST_FAILURE, error),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
