import { View, Text, FlatList, Image } from 'react-native';
import { Shelter } from '../../entities/Shelter';
import Button from '../Button';
import Icon from 'react-native-vector-icons/Feather';
import { useShelterCardController } from './useShelterCardController';
import ContactShelterModal from '../ContactShelterModal';

interface ShelterCardProps {
  shelters: Shelter[];
}

const ShelterCard: React.FC<ShelterCardProps> = ({ shelters }) => {
  const {
    shelter,
    tabHeight,
    isContactShelterModalVisible,
    setIsContactShelterModalVisible,
    handlePressContact,
  } = useShelterCardController();

  return (
    <>
      {shelter && (
        <ContactShelterModal
          visible={isContactShelterModalVisible}
          shelter={shelter}
          onClose={() => setIsContactShelterModalVisible(false)}
        />
      )}

      <FlatList
        data={shelters}
        keyExtractor={shelter => shelter.id}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: tabHeight,
          margin: 18,
        }}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-2xl">
            <Image
              source={{ uri: item.images[0] }}
              className="h-[180px] rounded-t-2xl object-cover"
            />

            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-black font-bold">{item.name}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-2.5">
              <View className="flex-row items-center gap-1">
                <Icon name="map-pin" size={14} />
                <Text className="text-xs max-w-xs">{item.address}</Text>
              </View>
            </View>

            <View className="flex-row mt-3.5 space-x-3">
              <View className="flex-1">
                <Button variant="primary" onPress={() => {}}>
                  <Icon name="map" size={18} />
                </Button>
              </View>
              <View className="flex-1">
                <Button
                  variant="secondary"
                  onPress={() => handlePressContact(item.id)}
                >
                  <Icon name="phone" size={20} />
                </Button>
              </View>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default ShelterCard;
