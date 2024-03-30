import React, { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '../utils/cn';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  const isSecondary = variant === 'secondary';

  if (isSecondary) {
    return (
      <TouchableOpacity
        className={cn(`w-full h-14 rounded-xl justify-center items-center`)}
        style={{
          borderWidth: 1,
          borderColor: '#BE4CD0',
        }}
      >
        <Text className="text-[#BE4CD0] text-lg">{children}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={['#70529D', '#BE4CD0']}
        className={cn(`w-full h-14 rounded-xl`)}
      >
        <TouchableOpacity className={cn(`h-full justify-center items-center`)}>
          <Text className="text-white text-lg">{children}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
};

export default Button;
