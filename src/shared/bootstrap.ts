import * as Font from 'expo-font';
import DbService from './services/db.service';

const inconsolata = require('../../assets/fonts/Inconsolata-Regular.ttf');
const inconsolataBold = require('../../assets/fonts/Inconsolata-Bold.ttf');

export default async function bootstrap() {
  try {
    await Font.loadAsync({
      inconsolata,
      'inconsolata-bold': inconsolataBold,
    });
    // await DbService.dropPosts();
    await DbService.init();
  } catch (e) {
    console.log('Error', e);
  }
}
