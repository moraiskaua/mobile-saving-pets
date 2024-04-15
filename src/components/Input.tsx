import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import { cn } from '../utils/cn';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps extends TextInputProps {
  error?: string;
  isRow?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  error,
  className,
  secureTextEntry,
  isRow = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View>
        <TextInput
          {...props}
          ref={inputRef}
          placeholder=" "
          secureTextEntry={!showPassword && secureTextEntry}
          className={cn(
            'relative outline-none bg-white rounded-xl border border-gray-500 px-3 h-14 text-gray-800 w-full pt-4',
            error && 'border-red-900',
            className,
          )}
        />

        <Text
          className={cn(
            `absolute text-xs left-[13px] top-1.5 text-gray-700 transition-all`,
            !props.value && 'top-4 text-base',
          )}
          onPress={() => inputRef.current?.focus()}
        >
          {placeholder}
        </Text>

        {secureTextEntry && (
          <TouchableOpacity
            onPress={toggleShowPassword}
            className="absolute right-3 top-1/2"
            style={{ transform: [{ translateY: -12 }] }}
          >
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#70529D"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View className={cn('flex items-center -mt-3', isRow && '-mt-0')}>
          <Text className="text-xs text-red-900">{error}</Text>
        </View>
      )}
    </>
  );
};

export default Input;
