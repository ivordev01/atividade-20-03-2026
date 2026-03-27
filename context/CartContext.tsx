import React, { createContext, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: string, nome: string, preco: number) => void;
  removeFromCart: (id: string) => void;
  removeOneFromCart: (id: string) => void;
  total: number;
  renderCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const renderCountRef = useRef(0);

  const addToCart = useCallback((id: string, nome: string, preco: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      
      return [...prevCart, { id, nome, preco, quantidade: 1 }];
    });
    renderCountRef.current += 1;
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    renderCountRef.current += 1;
  }, []);

  const removeOneFromCart = useCallback((id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
    renderCountRef.current += 1;
  }, []);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  }, [cart]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    removeOneFromCart,
    total,
    renderCount: renderCountRef.current,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}
