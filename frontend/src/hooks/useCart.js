import { useState, useEffect } from 'react';

/**
 * Custom hook for cart management with localStorage persistence
 */
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
        // Set cart count based on number of unique products
        setCartCount(parsedCart.length);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Reset cart if there's an error
      localStorage.setItem('cart', JSON.stringify([]));
      setCart([]);
      setCartCount(0);
    }
  }, []);

  // Add item to cart
  const addToCart = (product, quantity) => {
    const newCart = [...cart];
    const existingItemIndex = newCart.findIndex(item => item.id === product._id);

    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      newCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      newCart.push({
        id: product._id,
        name: product.name,
        price: product.discount ? 
          (product.price - (product.price * product.discount / 100)) : 
          product.price,
        image: product.imageURL || product.imageUrl,
        quantity: quantity,
        category: product.category
      });
    }

    // Update state and localStorage
    setCart(newCart);
    setCartCount(newCart.length); // Count is based on unique products
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    return newCart;
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    setCartCount(newCart.length);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    return newCart;
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(productId);
    }

    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(newCart);
    setCartCount(newCart.length);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    return newCart;
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};
