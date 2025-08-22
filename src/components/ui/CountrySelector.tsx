import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Searchbar, Text, useTheme } from 'react-native-paper';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
  style?: any;
}

const countries: Country[] = [
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  // Add more countries as needed
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountrySelect,
  style,
}) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[styles.countryItem, { borderBottomColor: theme.colors.outline }]}
      onPress={() => {
        onCountrySelect(item);
        setModalVisible(false);
        setSearchQuery('');
      }}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={[styles.countryName, { color: theme.colors.onSurface }]}>
        {item.name}
      </Text>
      <Text style={[styles.dialCode, { color: theme.colors.onSurfaceVariant }]}>
        {item.dialCode}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          styles.selector,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={[styles.selectedText, { color: theme.colors.onSurface }]}>
          {selectedCountry.name}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={theme.colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View
          style={[styles.modal, { backgroundColor: theme.colors.background }]}
        >
          <View style={styles.modalHeader}>
            <Text
              style={[styles.modalTitle, { color: theme.colors.onBackground }]}
            >
              Select Country
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSearchQuery('');
              }}
            >
              <MaterialIcons
                name="close"
                size={24}
                color={theme.colors.onBackground}
              />
            </TouchableOpacity>
          </View>

          <Searchbar
            placeholder="Search countries"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.countryList}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  selectedText: {
    flex: 1,
    fontSize: 16,
  },
  modal: {
    flex: 1,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  dialCode: {
    fontSize: 14,
  },
});

export default CountrySelector;
