import { ActionTypes, ActionTypeUnion } from './actions';
import { PostState } from './types';

const initialState: PostState = {
  allPosts: [],
  bookedPosts: [],
  error: null,
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
        bookedPosts: action.payload.filter(p => p.booked),
      };
    }
    case ActionTypes.GET_POSTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.TOOGLE_BOOKED_SUCCESE: {
      const allPosts = state.allPosts.map(post => {
        if(post.id === action.payload) {
          post.booked = !post.booked
        }
        return post
      })
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter(p => p.booked),
      }
    }
    default: {
      return state;
    }
  }
}
