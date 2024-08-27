import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createOrder } from "../api/orders";
import { TextInput, Button, Card } from "react-native-paper";

const CreateOrder = ({ navigation }) => {
  const [customerName, setCustomerName] = useState("");
  const [name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleCreateOrder = async () => {
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
      await createOrder(order);
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
            onPress={handleCreateOrder}
            style={styles.button}
          >
            Create
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

export default CreateOrder;
