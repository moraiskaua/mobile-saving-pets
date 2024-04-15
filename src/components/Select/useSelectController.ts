import { useState } from 'react';

export const useSelectController = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string, onChange: (value: string) => void) => {
    setSelected(value);
    onChange(value);
    setModalVisible(false);
  };

  return { modalVisible, selected, handleSelect, setModalVisible };
};
