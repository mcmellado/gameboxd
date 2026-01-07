import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import JournalScreen from "../screens/JournalScreen";
import SearchScreen from "../screens/SearchScreen";
import GameDetailScreen from "../screens/GameDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Journal"
          component={JournalScreen}
          options={{ title: "Your Journal" }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Search" }}
        />

        <Stack.Screen
          name="GameDetail"
          component={GameDetailScreen}
          options={{ title: "Game" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
