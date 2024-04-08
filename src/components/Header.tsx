import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '../utils/cn';

interface HeaderProps {
  size?: 'small' | 'default';
}

const Header: React.FC<HeaderProps> = ({ size = 'default' }) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={['#70529D', '#BE4CD0']}
      className="rounded-b-[30px]"
    >
      <View
        className={cn(
          `h-40 justify-center items-center`,
          size === 'small' && 'h-16',
        )}
      >
        <Image
          source={require('../assets/logo.png')}
          className={cn('h-40', size === 'small' && 'h-12')}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

export default Header;
