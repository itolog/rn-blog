import * as Font from 'expo-font';

const inconsolata = require('../../assets/fonts/Inconsolata-Regular.ttf');
const inconsolataBold = require('../../assets/fonts/Inconsolata-Bold.ttf');

export default async function bootstrap() {
  await Font.loadAsync({
    inconsolata,
    'inconsolata-bold': inconsolataBold,
  });
}
