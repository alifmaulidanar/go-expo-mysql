import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getOrderById, updateOrder } from "../api/orders";
import { TextInput, Button, Card } from "react-native-paper";

const UpdateOrder = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [customerName, setCustomerName] = useState("");
  const [name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const data = await getOrderById(orderId);
      setCustomerName(data.customerName);
      if (data.items && data.items.length > 0) {
        setProductName(data.items[0].name);
        setDescription(data.items[0].description);
        setQuantity(data.items[0].quantity.toString());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateOrder = async () => {
    const items = [
      {
        name,
        description,
        quantity: parseInt(quantity, 10),
      },
    ];

    const order = {
      customerName,
      items,
    };

    try {
      await updateOrder(orderId, order);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
            style={styles.input}
          />
          <TextInput
            label="Product Name"
            value={name}
            onChangeText={setProductName}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            label="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleUpdateOrder}
            style={styles.button}
          >
            Update
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default UpdateOrder;
