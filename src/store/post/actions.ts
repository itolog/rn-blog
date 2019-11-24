import { action, ActionType } from 'typesafe-actions';
import { Data } from './../../shared/interfaces/data';

export enum ActionTypes {
  ADD_POST = 'ADD_POST',

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
  addPost: (payload: Data) => action(ActionTypes.ADD_POST, payload),

  getPosts: () => action(ActionTypes.GET_POSTS),
  getPostsSuccess: (payload: Data[]) =>
    action(ActionTypes.GET_POSTS_SUCCESS, payload),
  getPostsFailure: (error: string) =>
    action(ActionTypes.GET_POSTS_FAILURE, error),

  toggleBooked: (payload: string) => action(ActionTypes.TOOGLE_BOOKED, payload),
  toggleBookedSuccess: (payload: string) =>
    action(ActionTypes.TOOGLE_BOOKED_SUCCESE, payload),
  toggleBookedFailure: (error: string) =>
    action(ActionTypes.TOOGLE_BOOKED_FAILURE, error),

  removePost: (payload: string) => action(ActionTypes.REMOVE_POST, payload),
  removePostSuccess: (payload: string) =>
    action(ActionTypes.REMOVE_POST_SUCCESS, payload),
  removePostFailure: (error: string) =>
    action(ActionTypes.REMOVE_POST_FAILURE, error),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
