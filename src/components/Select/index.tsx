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
}

const Select: React.FC<SelectProps> = ({ options, value }) => {
  const { modalVisible, selected, handleSelect, setModalVisible } =
    useSelectController();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="p-3 rounded-lg flex-row justify-between items-center"
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Text>{selected ?? value}</Text>
        <Icon name="chevron-down" size={20} />
      </TouchableOpacity>

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
