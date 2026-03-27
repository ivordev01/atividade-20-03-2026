import { useCart } from "@/context/CartContext";
import { produtos } from "@/data/produtos";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cart, addToCart, removeFromCart } = useCart();

  // Encontrar produto pelo ID
  const produto = useMemo(
    () => produtos.find((p) => p.id === id),
    [id]
  );

  // Quantidade no carrinho
  const quantidadeNoCarrinho = useMemo(
    () => cart.find((item) => item.id === id)?.quantidade || 0,
    [cart, id]
  );

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Produto não encontrado</Text>
        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(produto.id, produto.nome, produto.preco);
  };

  const handleRemoveFromCart = () => {
    if (quantidadeNoCarrinho > 0) {
      removeFromCart(produto.id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.produtoInfo}>
        <Text style={styles.title}>{produto.nome}</Text>
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
        <Text style={styles.descricao}>
          Produto de qualidade com excelente custo-benefício.
        </Text>
      </View>

      <View style={styles.carrinhoSection}>
        <Text style={styles.sectionTitle}>Carrinho</Text>
        
        {quantidadeNoCarrinho > 0 ? (
          <View style={styles.quantidadeInfo}>
            <Text style={styles.quantidadeText}>
              Quantidade: {quantidadeNoCarrinho}
            </Text>
            <Text style={styles.subtotalText}>
              Subtotal: R$ {(produto.preco * quantidadeNoCarrinho).toFixed(2)}
            </Text>
          </View>
        ) : (
          <Text style={styles.naoAdicionado}>Não adicionado ao carrinho</Text>
        )}

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.addButton]}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>➕ Adicionar ao Carrinho</Text>
          </Pressable>

          {quantidadeNoCarrinho > 0 && (
            <Pressable
              style={[styles.button, styles.removeButton]}
              onPress={handleRemoveFromCart}
            >
              <Text style={styles.buttonText}>➖ Remover</Text>
            </Pressable>
          )}
        </View>
      </View>

      <Link href="/" asChild>
        <Pressable style={[styles.button, styles.backButton]}>
          <Text style={styles.buttonText}>← Voltar aos Produtos</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  produtoInfo: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  preco: {
    fontSize: 24,
    color: "#1976d2",
    fontWeight: "600",
    marginBottom: 12,
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  carrinhoSection: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  quantidadeInfo: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  quantidadeText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtotalText: {
    fontSize: 14,
    color: "#1976d2",
    fontWeight: "600",
  },
  naoAdicionado: {
    fontSize: 14,
    color: "#999",
    marginBottom: 12,
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4caf50",
  },
  removeButton: {
    backgroundColor: "#f44336",
  },
  backButton: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 16,
  },
});
