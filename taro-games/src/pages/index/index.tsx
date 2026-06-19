import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.less';

const games = [
  {
    id: 'dragUp',
    emoji: '🎯',
    title: 'Drag Up',
    desc: '拖动木条堆叠 — 轻松益智',
    // H5 URL: hosted alongside the SSG site
    h5Url: 'https://yoursite.com/games/dragUp.html',
  },
  {
    id: 'alignUp',
    emoji: '🧩',
    title: 'Align Up',
    desc: '对齐网格，完成关卡',
    h5Url: 'https://yoursite.com/games/alignUp/',
  },
  {
    id: 'catUp',
    emoji: '🐱',
    title: 'Cat Up',
    desc: '帮助小猫到达新高度！',
    h5Url: 'https://yoursite.com/games/catUp.html',
  },
  {
    id: 'findUp',
    emoji: '🔍',
    title: 'Find Up',
    desc: '在场景中寻找隐藏物品',
    h5Url: 'https://yoursite.com/games/findUp.html',
  },
  {
    id: 'lineUp',
    emoji: '📏',
    title: 'Line Up',
    desc: '连接线条，解开谜题',
    h5Url: 'https://yoursite.com/games/lineUp.html',
  },
];

export default function Index() {
  const handlePlay = (game: typeof games[0]) => {
    // Navigate to the game WebView page with the URL as param
    Taro.navigateTo({
      url: `/pages/${game.id}/index?url=${encodeURIComponent(game.h5Url)}&title=${encodeURIComponent(game.title)}`,
    });
  };

  return (
    <View className="games-index">
      <View className="games-index__header">
        <Text className="games-index__title">🎮 小游戏</Text>
        <Text className="games-index__subtitle">放松心情的趣味游戏</Text>
      </View>

      <View className="games-index__list">
        {games.map((game) => (
          <View
            key={game.id}
            className="game-item"
            onClick={() => handlePlay(game)}
          >
            <Text className="game-item__emoji">{game.emoji}</Text>
            <View className="game-item__info">
              <Text className="game-item__title">{game.title}</Text>
              <Text className="game-item__desc">{game.desc}</Text>
            </View>
            <Text className="game-item__arrow">›</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
