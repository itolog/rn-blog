import { Data } from '../../shared/interfaces/data';

export interface PostState {
  allPosts: Data[];
  bookedPosts: Data[];
  error: string | null;
}
