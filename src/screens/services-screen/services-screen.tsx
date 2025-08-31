import PrimaryButton from '@/components/ui/primary-button';
import { useAuth } from '@/providers/auth-provider';
import { MaterialIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import type React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MainTabScreenProps } from '../../types/navigation';

type ServicesScreenProps = MainTabScreenProps<'Services'>;

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'nhs',
    title: 'NHS & Healthcare',
    description: 'GP appointments, health services, pharmacy info',
    icon: 'local-hospital',
    color: '#2196F3',
  },
  {
    id: 'bins',
    title: 'Bins & Waste',
    description: 'Collection schedules, missed bins, recycling',
    icon: 'delete',
    color: '#4CAF50',
  },
  {
    id: 'benefits',
    title: 'Benefits & Support',
    description: 'Universal Credit, housing benefit, eligibility',
    icon: 'account-balance',
    color: '#FF9800',
  },
  {
    id: 'council',
    title: 'Council Services',
    description: 'Council tax, planning, housing applications',
    icon: 'location-city',
    color: '#9C27B0',
  },
  {
    id: 'transport',
    title: 'Transport',
    description: 'Bus times, parking permits, road works',
    icon: 'directions-bus',
    color: '#F44336',
  },
  {
    id: 'education',
    title: 'Schools & Education',
    description: 'School applications, transport, nurseries',
    icon: 'school',
    color: '#607D8B',
  },
];

const ServicesScreen: React.FC<ServicesScreenProps> = ({ navigation }) => {
  const { signOut } = useAuth();
  const theme = useTheme();

  const handleServicePress = (serviceId: string) => {
    // Navigate to specific service screen or open AI chat with context
    console.log('Service pressed:', serviceId);
  };

  const renderServiceCard = (service: ServiceCategory) => (
    <Card
      key={service.id}
      style={[styles.serviceCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleServicePress(service.id)}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${service.color}20` },
            ]}
          >
            <MaterialIcons
              name={service.icon}
              size={32}
              color={service.color}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[styles.serviceTitle, { color: theme.colors.onSurface }]}
            >
              {service.title}
            </Text>
            <Text
              style={[
                styles.serviceDescription,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {service.description}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <PrimaryButton
        title="Signout"
        onPress={async () => {
          await signOut();

          // jump from Main (tabs) -> Root -> Auth
          navigation
            .getParent()
            ?.getParent()
            ?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }], // AuthNavigator’s initialRouteName is "Welcome"
              }),
            );
        }}
      />
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Government Services
        </Text>
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Get help with local council, NHS, and government services
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesGrid}>
          {serviceCategories.map(renderServiceCard)}
        </View>

        <Card
          style={[
            styles.emergencyCard,
            { backgroundColor: theme.colors.errorContainer },
          ]}
        >
          <Card.Content>
            <View style={styles.emergencyContent}>
              <MaterialIcons
                name="emergency"
                size={24}
                color={theme.colors.onErrorContainer}
              />
              <View style={styles.emergencyText}>
                <Text
                  style={[
                    styles.emergencyTitle,
                    { color: theme.colors.onErrorContainer },
                  ]}
                >
                  Emergency Services
                </Text>
                <Text
                  style={[
                    styles.emergencyDescription,
                    { color: theme.colors.onErrorContainer },
                  ]}
                >
                  For life-threatening emergencies, call 999
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  emergencyCard: {
    marginHorizontal: 8,
    marginTop: 24,
    marginBottom: 32,
    borderRadius: 12,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  emergencyText: {
    marginLeft: 16,
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 14,
  },
});

export default ServicesScreen;
