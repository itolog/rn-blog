import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap, map } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';

import PostService from '../../shared/services/post.service';

const loadPostsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_POSTS),
    switchMap(() => {
      return PostService.loadPosts().pipe(
        map(res => Actions.getPostsSuccess(res)),
      );
    }),
    catchError(() => of(Actions.getPostsFailure('load posts failure'))),
  );

const addPostsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.ADD_POST),
    switchMap(({ payload }) => {
      return of(Actions.addPostSuccess(payload));
    }),
    catchError(() => of(Actions.addPostFailure('add posts failure'))),
  );

const toogleBookedEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.TOOGLE_BOOKED),
    switchMap(({ payload }) => {
      return of(Actions.toggleBookedSuccess(payload));
    }),
    catchError(() => of(Actions.toggleBookedFailure('toogle booked failure'))),
  );

const removePostsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_POST),
    switchMap(({ payload }) => {
      return of(Actions.removePostSuccess(payload));
    }),
    catchError(() => of(Actions.removePostFailure('remove posts failure'))),
  );

export const epics = [
  loadPostsEpic,
  toogleBookedEpic,
  removePostsEpic,
  addPostsEpic,
];
