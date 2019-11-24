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

const toogleBookedEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.TOOGLE_BOOKED),
    switchMap(({ payload }) => {
      return of(Actions.toggleBookedSuccess(payload));
    }),
    catchError(() => of(Actions.toggleBookedFailure('toogle booked failure'))),
  );

export const epics = [loadPostsEpic, toogleBookedEpic];
