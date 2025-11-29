import { Produto } from '@/app/services/api';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: Produto & { quantidade: number };
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <View style={styles.row}>
      {item.imagem ? <Image source={item.imagem} style={styles.image} contentFit="cover" /> : null}
      <View style={styles.info}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2)} cada</Text>
        <Text style={styles.subtotal}>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
      </View>
      <View style={styles.controls}>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => onDecrement(item.id)} style={styles.qtyBtn}>
            <Feather name="minus" size={16} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantidade}</Text>
          <TouchableOpacity onPress={() => onIncrement(item.id)} style={styles.qtyBtn}>
            <Feather name="plus" size={16} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeBtn}>
          <Feather name="trash-2" size={18} color="#b00" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 },
  image: { width: 64, height: 64, borderRadius: 6, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { color: '#444' },
  subtotal: { marginTop: 6, fontWeight: '600' },
  controls: { alignItems: 'center' },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { padding: 6, borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  qtyText: { marginHorizontal: 8, minWidth: 20, textAlign: 'center' },
  removeBtn: { marginTop: 8 },
});
