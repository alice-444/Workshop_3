"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { NormalizedProduct } from "@/lib/shopify";
import { createCart, getCart, addToCart, updateCartLine, removeCartLine } from "@/lib/shopify";

export type CartItem = {
  id: string;
  lineId: string;
  name: string;
  price: number;
  emoji: string;
  image: string | null;
  variantId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  checkoutUrl: string | null;
  loading: boolean;
  addItem: (product: NormalizedProduct, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = "shopify_cart_id";
const CART_URL_KEY = "shopify_cart_url";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const cartIdRef = useRef<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hydrate le cart depuis Shopify au montage
  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY);
    const storedUrl = localStorage.getItem(CART_URL_KEY);
    if (!storedId) return;

    setCartId(storedId);
    cartIdRef.current = storedId;
    if (storedUrl) setCheckoutUrl(storedUrl);

    getCart(storedId).then((cart) => {
      if (!cart) {
        // Cart expiré — on repart de zéro
        localStorage.removeItem(CART_ID_KEY);
        localStorage.removeItem(CART_URL_KEY);
        setCartId(null);
        setCheckoutUrl(null);
        return;
      }
      setCheckoutUrl(cart.checkoutUrl);
      setItems(cart.lines.nodes.map((line) => ({
        id: line.merchandise.id,
        lineId: line.id,
        name: line.merchandise.product.title,
        price: parseFloat(line.merchandise.price.amount),
        emoji: "",
        image: line.merchandise.product.featuredImage?.url ?? null,
        variantId: line.merchandise.id,
        quantity: line.quantity,
      })));
    });
  }, []);

  async function ensureCart(): Promise<string> {
    if (cartIdRef.current) return cartIdRef.current;
    const cart = await createCart();
    localStorage.setItem(CART_ID_KEY, cart.id);
    localStorage.setItem(CART_URL_KEY, cart.checkoutUrl);
    cartIdRef.current = cart.id;
    setCartId(cart.id);
    setCheckoutUrl(cart.checkoutUrl);
    return cart.id;
  }

  const addItem = useCallback(async (product: NormalizedProduct, quantity = 1) => {
    setLoading(true);
    try {
      const id = await ensureCart();
      const cart = await addToCart(id, product.variantId, quantity);
      setCheckoutUrl(cart.checkoutUrl);
      setItems(cart.lines.nodes.map((line) => ({
        id: line.merchandise.id,
        lineId: line.id,
        name: line.merchandise.product.title,
        price: parseFloat(line.merchandise.price.amount),
        emoji: product.emoji,
        image: line.merchandise.product.featuredImage?.url ?? null,
        variantId: line.merchandise.id,
        quantity: line.quantity,
      })));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId) return;
    setLoading(true);
    try {
      if (quantity <= 0) {
        const cart = await removeCartLine(cartId, lineId);
        setItems(cart.lines.nodes.map((line) => ({
          id: line.merchandise.id,
          lineId: line.id,
          name: line.merchandise.product.title,
          price: parseFloat(line.merchandise.price.amount),
          emoji: "",
          image: line.merchandise.product.featuredImage?.url ?? null,
          variantId: line.merchandise.id,
          quantity: line.quantity,
        })));
      } else {
        const cart = await updateCartLine(cartId, lineId, quantity);
        setItems(cart.lines.nodes.map((line) => ({
          id: line.merchandise.id,
          lineId: line.id,
          name: line.merchandise.product.title,
          price: parseFloat(line.merchandise.price.amount),
          emoji: "",
          image: line.merchandise.product.featuredImage?.url ?? null,
          variantId: line.merchandise.id,
          quantity: line.quantity,
        })));
      }
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const cart = await removeCartLine(cartId, lineId);
      setItems(cart.lines.nodes.map((line) => ({
        id: line.merchandise.id,
        lineId: line.id,
        name: line.merchandise.product.title,
        price: parseFloat(line.merchandise.price.amount),
        emoji: "",
        image: line.merchandise.product.featuredImage?.url ?? null,
        variantId: line.merchandise.id,
        quantity: line.quantity,
      })));
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  const clear = useCallback(() => {
    localStorage.removeItem(CART_ID_KEY);
    localStorage.removeItem(CART_URL_KEY);
    setCartId(null);
    setCheckoutUrl(null);
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { items, itemCount, subtotal, checkoutUrl, loading, addItem, removeItem, updateQuantity, clear };
  }, [items, checkoutUrl, loading, addItem, removeItem, updateQuantity, clear]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>.");
  }
  return ctx;
}
