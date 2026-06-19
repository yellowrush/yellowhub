import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import './app.less';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('YellowHub Games App launched!');
  });

  return children;
}

export default App;
