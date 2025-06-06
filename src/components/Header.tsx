import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/theme';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBackPress }) => {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 24,
  },
  placeholder: {
    width: 40, 
  },
});

export default Header;

