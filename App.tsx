import React, { useState } from 'react';
import { Text } from 'react-native';
import { AppLoading } from 'expo';
import bootstrap from './src/shared/bootstrap';

import MainScreens from './src/screens/MainScreens/MainScreens';

export default function App() {
  const [isReady, setIsready] = useState(false);
  const [errLoading, setErrLoading] = useState<string>('');

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsready(true)}
        onError={() => setErrLoading('AppLoading error')}
      />
    );
  }

  if (errLoading) {
    return <Text>{errLoading}</Text>;
  }

  return <MainScreens />;
}
