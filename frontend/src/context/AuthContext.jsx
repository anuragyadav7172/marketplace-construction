// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { getCart } from "../api/cartApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const storedToken = localStorage.getItem("token") || null;

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  const [cartCount, setCartCount] = useState(0);

  // 🔥 Load cart count from backend
  const refreshCart = async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await getCart(token);
      const items = res.data.items || [];
      const count = items.reduce((sum, i) => sum + i.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error("Failed to refresh cart:", err);
    }
  };

  // 🔥 Runs when app loads OR token changes
  useEffect(() => {
    refreshCart();
  }, [token]);

  // LOGIN
  const login = (userData, tokenValue) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(tokenValue);
    setUser(userData);

    refreshCart(); // update navbar cart count
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setCartCount(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
