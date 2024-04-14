import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

interface FabProps extends TouchableOpacityProps {}

const Fab: React.FC<FabProps> = ({ ...props }) => {
  return (
    <TouchableOpacity className="absolute right-3 bottom-3" {...props}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={['#70529D', '#BE4CD0']}
        className="rounded-full h-14 w-14 justify-center items-center"
      >
        <Icon name="plus" size={24} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Fab;
