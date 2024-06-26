import { View, Text, Image, FlatList } from 'react-native';
import { TypeOfAbuse } from '../../entities/types/TypeOfAbuse';
import { TypeOfStatus } from '../../entities/types/TypeOfStatus';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import Button from '../Button';
import { useReportCardController } from './useReportCardController';
import EditReportModal from '../EditReportModal';
import DeleteReportModal from '../DeleteReportModal';
import { Report } from '../../entities/Report';

interface ReportCardProps {
  reports: Report[];
}

const ReportCard: React.FC<ReportCardProps> = ({ reports }) => {
  const {
    tabHeight,
    isDeleteModalVisible,
    isEditReportModalVisible,
    report,
    handlePressEdit,
    handlePressDelete,
    handlePressEditModalClose,
    handlePressDeleteModalClose,
  } = useReportCardController();

  return (
    <>
      {report && (
        <>
          <DeleteReportModal
            visible={isDeleteModalVisible}
            report={report}
            onClose={handlePressEditModalClose}
          />

          <EditReportModal
            visible={isEditReportModalVisible}
            report={report}
            onClose={handlePressDeleteModalClose}
          />
        </>
      )}

      <FlatList
        data={reports}
        keyExtractor={report => report.id}
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
              <Text className="text-black font-bold">
                Denúncia: {item.type}
              </Text>

              <View className="border border-[#70529D] rounded-sm">
                <Text className="text-[#70529D] px-2.5 py-0.5 font-semibold text-xs">
                  {item.status === 'EM_ABERTO' && 'EM ABERTO'}
                  {item.status === 'EM_ANDAMENTO' && 'EM ANDAMENTO'}
                  {item.status === 'ATENDIDO' && 'ATENDIDO'}
                </Text>
              </View>
            </View>

            <Text className="mt-4">{item.description}</Text>

            <View className="flex-row items-center justify-between mt-2.5">
              <View className="flex-row items-center gap-1">
                <Icon name="map-pin" size={14} />
                <Text>{item.location}</Text>
              </View>
              <Text>
                Data: {format(new Date(item.createdAt), 'dd/MM/yyyy')}
              </Text>
            </View>

            <View className="flex-row mt-3.5 space-x-3">
              <View className="flex-1">
                <Button
                  variant="primary"
                  onPress={() => handlePressEdit(item.id)}
                >
                  <Icon name="edit-2" size={18} />
                </Button>
              </View>
              <View className="flex-1">
                <Button
                  variant="secondary"
                  onPress={() => handlePressDelete(item.id)}
                >
                  <Icon name="trash-2" size={20} />
                </Button>
              </View>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default ReportCard;
