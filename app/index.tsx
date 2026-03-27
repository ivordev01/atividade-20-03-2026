import { useCart } from "@/context/CartContext";
import { produtos } from "@/data/produtos";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// Definir interface explícita para Produto
interface Produto {
  id: string;
  nome: string;
  preco: number;
}

export default function Index() {
  const { total, cart, addToCart, removeFromCart, removeOneFromCart } = useCart();

  const handleAddToCart = (produto: Produto) => {
    addToCart(produto.id, produto.nome, produto.preco);
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  const handleReduceOne = (id: string) => {
    removeOneFromCart(id);
  };

  const renderProduto = ({ item }: { item: Produto }) => (
    <Pressable
      style={styles.produtoCard}
      onPress={() => handleAddToCart(item)}
    >
      <Text style={styles.produtoNome}>{item.nome}</Text>
      <Text style={styles.produtoPreco}>R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.addToCartText}>+ Adicionar ao Carrinho</Text>
    </Pressable>
  );

  const renderCartItem = ({ item }: { item: typeof cart[0] }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemNome}>{item.nome}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Qtd:</Text>
          <Text style={styles.quantityValue}>{item.quantidade}</Text>
          <Pressable
            style={styles.controlButton}
            onPress={() => handleReduceOne(item.id)}
          >
            <Text style={styles.controlButtonText}>➖</Text>
          </Pressable>
          <Pressable
            style={styles.controlButton}
            onPress={() => handleAddToCart({ id: item.id, nome: item.nome, preco: item.preco })}
          >
            <Text style={styles.controlButtonText}>➕</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={styles.removeButton}
        onPress={() => handleRemoveFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>🗑️</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        scrollEnabled={false}
      />

      {cart.length > 0 && (
        <View style={styles.cartSection}>
          <Text style={styles.cartSectionTitle}>Itens no Carrinho</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            scrollEnabled={false}
          />
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Itens no carrinho: {cart.length}</Text>
        <Text style={styles.footerText}>Total: R$ {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartInfo: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  cartText: {
    fontSize: 14,
    color: "#1976d2",
  },
  footer: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#b3d3f6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976d2",
  },
  produtoCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  addToCartText: {
    fontSize: 12,
    color: "#4caf50",
    fontWeight: "500",
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1976d2",
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  produtoPreco: {
    fontSize: 14,
    color: "#666",
  },
  cartSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cartSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1976d2",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemNome: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 30,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
  },
  decrementButton: {
    backgroundColor: "#ffb74d",
    marginLeft: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  decrementButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  controlButton: {
    backgroundColor: "#4caf50",
    marginLeft: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
