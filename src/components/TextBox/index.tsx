import React, { useState } from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { cn } from '../../utils/cn';

interface TextBoxProps extends TextInputProps {
  error?: string;
  initialValue: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  error,
  className,
  initialValue,
  ...props
}) => {
  const [value, setValue] = useState(initialValue || '');

  const handleChangeText = (text: string) => {
    setValue(text);
    if (props.onChangeText) props.onChangeText(text);
  };

  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={handleChangeText}
      numberOfLines={6}
      placeholder=" "
      className={cn(
        'relative outline-none rounded-xl bg-gray-200/60 px-3 text-gray-800 w-full pt-4',
        error && 'border-red-900',
        className,
      )}
      textAlignVertical="top"
      multiline
    />
  );
};

export default TextBox;
