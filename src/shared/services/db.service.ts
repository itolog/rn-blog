import * as SQLite from 'expo-sqlite';

import { DTOProps } from '../interfaces/data';

const db = SQLite.openDatabase('post.db');

class DbService {
  static init() {
    db.transaction((tx: any) => {
      tx.executeSql(
        'create table if not exists posts (id integer primary key not null, img text not null, text text not null,date text,booked int);)',
        [],
        () => {
          console.log('База успешно создана');
        },
        (_: SQLTransaction, error: SQLError) => {
          console.log('db error', error);
        },
      );
    });
  }

  static dropPosts() {
    db.transaction((tx: any) => {
      tx.executeSql(
        'drop table  posts',
        [],
        () => {
          console.log('База успешно удалена');
        },
        (_: SQLTransaction, error: SQLError) => {
          console.log('db error', error);
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
          (_, { rows }) => resolve(rows._array),
          // @ts-ignore
          (_, error) => reject(error),
        );
      });
    });
  }

  static createPost({ text, date, booked, img }: DTOProps) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'insert into posts(text, date, booked, img) values(?, ?, ?, ?)',
          [text, date, booked, img],
          (_, result) => resolve(result.insertId),
          // @ts-ignore
          (_, error) => reject(error),
        );
      });
    });
  }
}

export default DbService;
