import { Produto } from '@/app/services/api';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductCard({ product, onAdd }: { product: Produto; onAdd: (p: Produto) => void }) {
  return (
    <View style={styles.card}>
      {product.imagem ? (
        <Image source={product.imagem} style={styles.image} contentFit="cover" />
      ) : null}
      <View style={styles.info}>
        <Text style={styles.title}>{product.nome}</Text>
        <Text style={styles.price}>R$ {product.preco.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={() => onAdd(product)}>
        <Feather name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  image: { width: 64, height: 64, borderRadius: 6, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { marginTop: 4, color: '#444' },
  addBtn: {
    backgroundColor: '#0a84ff',
    padding: 8,
    borderRadius: 6,
  },
});
