import { createSelector } from 'reselect';
import { AppState } from '../index';

export const getPostsState = (state: AppState) => state.post;

export const getAllPosts = createSelector(
  getPostsState,
  state => state.allPosts,
);

export const getBookedPosts = createSelector(
  getPostsState,
  state => state.bookedPosts,
);

export const getPostsError = createSelector(
  getPostsState,
  state => state.error,
);
