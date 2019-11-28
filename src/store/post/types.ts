import { DataDB } from '../../shared/interfaces/data';

export interface PostState {
  allPosts: DataDB[];
  bookedPosts: DataDB[];
  error: string | null;
  loading: boolean;
}
