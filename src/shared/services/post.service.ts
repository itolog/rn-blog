import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DATA } from '../data';

class PostService {
  static loadPosts() {
    return of(DATA);
  }
}

export default PostService;
