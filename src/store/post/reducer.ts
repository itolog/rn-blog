import { ActionTypes, ActionTypeUnion } from './actions';
import { PostState } from './types';

const initialState: PostState = {
  allPosts: [],
  bookedPosts: [],
  error: null,
  loading: true,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): PostState {
  switch (action.type) {
    case ActionTypes.GET_POSTS_SUCCESS: {
      return {
        ...state,
        allPosts: action.payload,
        bookedPosts: action.payload.filter(p => Boolean(p.booked)),
        loading: false,
      };
    }
    case ActionTypes.GET_POSTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.ADD_POST_SUCCESS: {
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
      };
    }
    case ActionTypes.TOOGLE_BOOKED_SUCCESE: {
      const allPosts = state.allPosts.map(post => {
        if (post.id === action.payload) {
          post.booked = !post.booked;
        }
        return post;
      });
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter(p => p.booked),
      };
    }
    case ActionTypes.REMOVE_POST_SUCCESS: {
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post.id !== action.payload),
        bookedPosts: state.bookedPosts.filter(
          post => post.id !== action.payload,
        ),
      };
    }
    case ActionTypes.REMOVE_POST_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
