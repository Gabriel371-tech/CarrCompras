import { useCart } from '@/app/context/CartContext';
import CartItem from '@/components/CartItem';
import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function CartScreen() {
  const { state, increment, decrement, remove, total } = useCart();

  return (
    <View style={styles.container}>
      <ThemedText type="title">Carrinho</ThemedText>
      <FlatList
        data={state.items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <CartItem item={item} onIncrement={increment} onDecrement={decrement} onRemove={remove} />
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Carrinho vazio</Text>}
        contentContainerStyle={{ paddingTop: 12 }}
      />
      <View style={styles.totalRow}>
        <ThemedText type="subtitle">Total geral:</ThemedText>
        <ThemedText type="title">R$ {total().toFixed(2)}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 12, flex: 1 }, totalRow: { marginTop: 'auto', paddingTop: 12, borderTopWidth: 1, borderColor: '#eee' } });
