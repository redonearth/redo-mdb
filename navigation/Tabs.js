import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import TVs from '../screens/TVs';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="TVs" component={TVs} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
