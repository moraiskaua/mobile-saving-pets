import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={['#70529D', '#BE4CD0']}
      className="rounded-b-[30px]"
    >
      <View className="h-40 justify-center items-center">
        <Image source={require('../assets/logo.png')} />
      </View>
    </LinearGradient>
  );
};

export default Header;
