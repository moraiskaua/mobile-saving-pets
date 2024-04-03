import { View, Text, Image, FlatList } from 'react-native';
import { TypeOfAbuse } from '../entities/types/TypeOfAbuse';
import { TypeOfStatus } from '../entities/types/TypeOfStatus';
import { format } from 'date-fns';

interface ReportCardProps {
  reports: {
    id: string;
    images: string[];
    type: TypeOfAbuse;
    status: TypeOfStatus;
    description: string;
    location: string;
    createdAt: string;
  }[];
  onAction: () => void;
  onDelete: (id: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  reports,
  onAction,
  onDelete,
}) => {
  return (
    <FlatList
      data={reports}
      keyExtractor={report => report.id}
      contentContainerStyle={{ gap: 16 }}
      renderItem={({ item }) => (
        <View className="h-[400px] bg-white p-4 rounded-2xl">
          <Image
            source={{ uri: item.images[1] }}
            className="h-1/2 rounded-t-2xl"
            resizeMode="cover"
          />

          <View className="flex-row justify-between items-center mt-4">
            <Text>Denúncia: {item.type}</Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#70529D',
                borderRadius: 2,
              }}
            >
              <Text className="text-[#70529D] px-1">
                {item.status === 'EM_ABERTO' && 'EM ABERTO'}
                {item.status === 'EM_ANDAMENTO' && 'EM ANDAMENTO'}
                {item.status === 'ATENDIDO' && 'ATENDIDO'}
              </Text>
            </View>
          </View>

          <Text className="mt-4">{item.description}</Text>

          <View className="flex-row items-center justify-between mt-2.5">
            <Text>{item.location}</Text>
            <Text>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default ReportCard;
