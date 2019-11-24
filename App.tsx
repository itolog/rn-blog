import React, { useState } from 'react';
import { Text } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';

import { useScreens } from 'react-native-screens';

import { rootStore } from './src/store';

import bootstrap from './src/shared/bootstrap';

import { AppNavigation } from './src/navigation/AppNavigation';

useScreens();
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

  return (
    <Provider store={rootStore}>
      <AppNavigation />
    </Provider>
  );
}
