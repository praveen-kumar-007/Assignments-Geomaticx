const CART_KEY = "fv_cart";

export const getCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to read cart from localStorage", error);
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

const dispatchCartUpdate = () => {
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);
  dispatchCartUpdate();
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  dispatchCartUpdate();
  return cart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();
  const updated = cart
    .map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(updated);
  dispatchCartUpdate();
  return updated;
};

export const clearCart = () => {
  saveCart([]);
  dispatchCartUpdate();
  return [];
};
