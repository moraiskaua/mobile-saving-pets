import { useState } from 'react';
import { TypeOfAbuse } from '../../entities/types/TypeOfAbuse';

export const useSelectController = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setModalVisible(false);
  };

  return { modalVisible, selected, handleSelect, setModalVisible };
};
