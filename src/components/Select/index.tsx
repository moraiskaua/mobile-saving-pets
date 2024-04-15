import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelectController } from './useSelectController';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, error }) => {
  const { modalVisible, selected, handleSelect, setModalVisible } =
    useSelectController();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="p-3 rounded-xl bg-gray-200/60 flex-row justify-between items-center"
      >
        <Text>{selected ?? value}</Text>
        <Icon name="chevron-down" size={20} />
      </TouchableOpacity>

      {error && (
        <View className="flex items-center -mt-3">
          <Text className="text-xs text-red-900">{error}</Text>
        </View>
      )}

      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-4 w-4/5">
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item.value)}>
                  <Text className="py-2">{item.label.toUpperCase()}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Select;
