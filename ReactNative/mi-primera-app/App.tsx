import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import EmployeeList from './src/components/EmployeeList';
import CompanyHeader from './src/components/CompanyHeader';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        style="dark"
        backgroundColor="#FCE7F3"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.appContainer}>

          <View style={styles.companyHeader}>
            <CompanyHeader />
          </View>

          <View style={styles.employeeList}>
            <EmployeeList />
          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE7F3',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#FCE7F3',
  },

  appContainer: {
    flex: 1,
    backgroundColor: '#FFF7FB',
  },

  companyHeader: {
    flex: 0.3,
  },

  employeeList: {
    flex: 0.7,
  },
});