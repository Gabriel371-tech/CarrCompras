import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Bem-vindo 👋</ThemedText>
        <ThemedText>
          Explore os produtos e gerencie seu carrinho facilmente.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.navRow}>

        {/* BOTÃO PRODUTOS */}
        <Link href="/produtos" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="pricetags-outline" size={28} />
            <ThemedText type="subtitle">Produtos</ThemedText>
          </TouchableOpacity>
        </Link>

        {/* BOTÃO CARRINHO */}
        <Link href="/cart" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="cart-outline" size={28} />
            <ThemedText type="subtitle">Carrinho</ThemedText>
          </TouchableOpacity>
        </Link>

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
    gap: 12,
  },

  navButton: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: 150,
    gap: 6,
    elevation: 2,
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
