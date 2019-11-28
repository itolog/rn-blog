import * as SQLite from 'expo-sqlite';

import { DataDB, DTOProps } from '../interfaces/data';

const db = SQLite.openDatabase('post.db');

class DbService {
  static init() {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        'create table if not exists posts (id integer primary key not null, img text not null, text text not null,date text,booked int);)',
        [],
        () => {
          console.log('База успешно создана');
        },
        (_: SQLTransaction, error: SQLError) => {
          console.log('db error', error);
          return false;
        },
      );
    });
  }

  static dropPosts() {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        'drop table  posts',
        [],
        () => {
          console.log('База успешно удалена');
        },
        (_: SQLTransaction, error: SQLError) => {
          console.log('db error', error);
          return false;
        },
      );
    });
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'select * from posts',
          [],
          // @ts-ignore
          (_, { rows }) => resolve(rows._array),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  static createPost({ text, date, booked, img }: DTOProps) {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'insert into posts(text, date, booked, img) values(?, ?, ?, ?)',
          [text, date, booked, img],
          (_: SQLTransaction, result: SQLResultSet) => resolve(result.insertId),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  static updatePostBooked(post: DataDB) {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          () => resolve(post.id),
          (_: SQLTransaction, error: SQLError) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  static removePost(id: number) {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          () => resolve(id),
          (_: SQLTransaction, error: SQLError) => {
            reject(error)
            return false;
          },
        );
      });
    })
  }
}

export default DbService;
