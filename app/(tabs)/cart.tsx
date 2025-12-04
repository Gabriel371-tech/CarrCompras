import { useCart } from '@/app/context/CartContext';
import CartItem from '@/components/CartItem';
import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function CartScreen() {
  const { state, increment, decrement, remove, total } = useCart();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Carrinho
      </ThemedText>

      <FlatList
        data={state.items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={remove}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Seu carrinho está vazio 😕</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* TOTAL */}
      {state.items.length > 0 && (
        <View style={styles.totalBox}>
          <ThemedText type="subtitle">Total Geral:</ThemedText>
          <ThemedText type="title" style={styles.totalValue}>
            R$ {total().toFixed(2)}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1,
  },

  title: {
    marginBottom: 12,
  },

  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.6,
  },

  totalBox: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },

  totalValue: {
    fontWeight: 'bold',
  },
});
