import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import TVs from '../screens/TVs';
import Search from '../screens/Search';
import { useColorScheme } from 'react-native';
import COLORS from '../colors';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? COLORS.black : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : COLORS.black,
        },
        tabBarStyle: {
          backgroundColor: isDark ? COLORS.black : 'white',
        },
        tabBarActiveTintColor: isDark ? COLORS.yellow : COLORS.black,
        tabBarInactiveTintColor: isDark ? '#dfe4ea' : '#a4b0be',
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="film-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TVs"
        component={TVs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
