import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { getOrderById, deleteOrder } from "../api/orders";
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const OrderDetails = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchOrderDetails();
    }
  }, [isFocused]);

  const fetchOrderDetails = async () => {
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderId);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateOrder = () => {
    navigation.navigate("UpdateOrder", { orderId });
  };

  if (!order) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loading} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{order.customerName}</Title>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Paragraph>Product: {item.name}</Paragraph>
              <Paragraph>Description: {item.description}</Paragraph>
              <Paragraph>Quantity: {item.quantity}</Paragraph>
            </View>
          ))}
          <Paragraph>Ordered At: {order.createdAt}</Paragraph>
          <Paragraph>Updated At: {order.updatedAt}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleUpdateOrder}
            style={styles.button}
          >
            Update Order
          </Button>
          <Button
            mode="contained"
            onPress={handleDeleteOrder}
            style={styles.button}
            color="red"
          >
            Delete Order
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  button: {
    marginRight: 32,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderDetails;
