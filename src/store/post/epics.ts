import * as FileSystem from 'expo-file-system';
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';

import DbService from '../../shared/services/db.service';

const loadPostsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_POSTS),
    switchMap(async () => {
      const data = await DbService.getPosts();
      return data;
    }),
    switchMap((data: any) => {
      return of(Actions.getPostsSuccess(data));
    }),
    catchError(() => of(Actions.getPostsFailure('load posts failure'))),
  );

const addPostsEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.ADD_POST),
    switchMap(async ({ payload }) => {
      const fileName = payload.img.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;

      try {
        await FileSystem.moveAsync({
          to: newPath,
          from: payload.img,
        });
      } catch (error) {
        console.log('Move file error: ', error);
      }
      const post = { ...payload, img: newPath };
      const dbID = await DbService.createPost(post);
      post.id = dbID;
      return post;
    }),
    switchMap(post => of(Actions.addPostSuccess(post))),
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
