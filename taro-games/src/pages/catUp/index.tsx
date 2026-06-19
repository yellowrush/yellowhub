/**
 * Generic WebView game player page.
 * 
 * How it works:
 * - In WeChat mini-program (weapp): Uses <WebView> component to embed the H5 game URL
 * - In H5 mode: Renders an <iframe> fallback
 * 
 * The game URL is passed as a query param: ?url=<encoded_url>&title=<encoded_title>
 * 
 * For WeChat mini-program publishing:
 * - The H5 game URLs must be whitelisted in the mini-program's business domain list
 * - The game files should be hosted on HTTPS (e.g., your production domain)
 */

import { useRouter } from '@tarojs/taro';
import { View, Text, WebView } from '@tarojs/components';
import './index.less';

export default function GameWebView() {
  const router = useRouter();
  const gameUrl = decodeURIComponent(router.params.url || '');
  const gameTitle = decodeURIComponent(router.params.title || 'Game');

  if (!gameUrl) {
    return (
      <View className="game-error">
        <Text>Game URL not found.</Text>
      </View>
    );
  }

  // WebView is the Taro component that maps to:
  // - wx.webview in WeChat mini-program
  // - <iframe> in H5
  return (
    <View className="game-webview-page">
      <WebView src={gameUrl} />
    </View>
  );
}
