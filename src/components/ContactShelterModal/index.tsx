import { View, Modal, FlatList, Text } from 'react-native';
import { Shelter } from '../../entities/Shelter';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../Button';
import { useContactShelterModalController } from './useContactShelterModalController';

interface ContactShelterModalProps {
  visible: boolean;
  shelter: Shelter;
  onClose: () => void;
}

const ContactShelterModal: React.FC<ContactShelterModalProps> = ({
  visible,
  shelter,
  onClose,
}) => {
  const { handleOpenPhone } = useContactShelterModalController();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <Header />

        <View className="p-3 pt-0 pr-0 m-auto">
          <Text className="text-center font-bold text-2xl text-black">
            {shelter.name}
          </Text>

          <FlatList
            data={shelter.images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 6 }}
            renderItem={({ item }) => (
              <FastImage
                source={{
                  uri: item,
                }}
                className="h-48 w-72 rounded-xl"
                resizeMode="cover"
              />
            )}
          />

          <View className="">
            <View className="my-3.5 items-center">
              <Text className="text-sm">{shelter.openingHours}</Text>
            </View>

            <View className="gap-1.5">
              <View className="flex-row gap-2 items-center justify-center">
                <Icon name="globe" size={18} />
                <Text className="text-2xl" selectable>
                  {shelter.website}
                </Text>
              </View>

              <View className="flex-row gap-2 items-center justify-center">
                <Icon name="mail" size={18} />
                <Text className="text-2xl" selectable>
                  {shelter.email}
                </Text>
              </View>

              <View className="flex-row gap-2 items-center justify-center">
                <Icon name="phone" size={18} />
                <Text
                  className="text-2xl"
                  onPress={() => handleOpenPhone(shelter.phone)}
                >
                  {shelter.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="p-3">
          <Button onPress={onClose}>Voltar</Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ContactShelterModal;
