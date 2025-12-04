import { useCart } from '@/app/context/CartContext';
import { fetchProdutos, Produto } from '@/app/services/api';
import ProductCard from '@/components/ProductCard';
import { ThemedText } from '@/components/themed-text';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

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
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 12 }}>
        Produtos
      </ThemedText>

      {produtos.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          onAdd={addItem}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 50,
  },
});
