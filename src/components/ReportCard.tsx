import { View, Text, Image, FlatList } from 'react-native';
import { TypeOfAbuse } from '../entities/types/TypeOfAbuse';
import { TypeOfStatus } from '../entities/types/TypeOfStatus';

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
      renderItem={({ item }) => (
        <View key={item.id} className="h-80 bg-red-300 p-4">
          <Image
            source={{ uri: item.images[1] }}
            // style={{ width: '100%', height: '100%' }}
          />

          <View className="flex-row justify-between">
            <Text>Denúncia: {item.type}</Text>
            <View
              className=""
              style={{ borderWidth: 1, borderColor: '#70529D' }}
            >
              <Text className="text-[#70529D] px-1">
                {item.status === 'EM_ABERTO' && 'EM ABERTO'}
                {item.status === 'EM_ANDAMENTO' && 'EM ANDAMENTO'}
                {item.status === 'ATENDIDO' && 'ATENDIDO'}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default ReportCard;
