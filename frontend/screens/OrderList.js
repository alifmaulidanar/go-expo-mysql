import React, { useCallback, useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getOrders } from "../api/orders";
import { FAB, Card, Title, Paragraph, Button } from "react-native-paper";

const OrderList = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const handleCreateOrder = () => {
    navigation.navigate("CreateOrder");
  };

  const handleOrderDetails = (orderId) => {
    navigation.navigate("OrderDetails", { orderId });
  };

  const renderOrder = ({ item }) => (
    <Card style={styles.card} onPress={() => handleOrderDetails(item.id)}>
      <Card.Content>
        <Title>{item.customerName}</Title>
        {item.items.map((subItem) => (
          <Paragraph key={subItem.id}>
            {subItem.name} (Quantity: {subItem.quantity})
          </Paragraph>
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Create Order"
        onPress={handleCreateOrder}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default OrderList;
