import { useCart } from '@/app/context/CartContext';
import { fetchProdutos, Produto } from '@/app/services/api';
import ProductCard from '@/components/ProductCard';
import { ThemedText } from '@/components/themed-text';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    fetchProdutos()
      .then((data) => mounted && setProdutos(data))
      .catch((e) => console.error(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <ThemedText type="title">Produtos</ThemedText>
      <FlatList
        data={produtos}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => <ProductCard product={item} onAdd={addItem} />}
        contentContainerStyle={{ paddingTop: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 12 } });
