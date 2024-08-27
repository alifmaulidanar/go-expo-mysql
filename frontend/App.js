import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import OrderList from "./screens/OrderList";
import CreateOrder from "./screens/CreateOrder";
import OrderDetails from "./screens/OrderDetails";
import UpdateOrder from "./screens/UpdateOrder";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OrderList">
          <Stack.Screen name="OrderList" component={OrderList} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="CreateOrder" component={CreateOrder} />
          <Stack.Screen name="UpdateOrder" component={UpdateOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
