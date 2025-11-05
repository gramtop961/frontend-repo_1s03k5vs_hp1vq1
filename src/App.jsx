import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';

const initialProducts = [
  { id: 'p1', name: 'Kopi Latte', price: 28000, category: 'Minuman', emoji: '☕️' },
  { id: 'p2', name: 'Espresso', price: 22000, category: 'Minuman', emoji: '🫘' },
  { id: 'p3', name: 'Matcha Latte', price: 30000, category: 'Minuman', emoji: '🍵' },
  { id: 'p4', name: 'Nasi Goreng', price: 35000, category: 'Makanan', emoji: '🍚' },
  { id: 'p5', name: 'Ayam Geprek', price: 32000, category: 'Makanan', emoji: '🍗' },
  { id: 'p6', name: 'Mie Ayam', price: 27000, category: 'Makanan', emoji: '🍜' },
  { id: 'p7', name: 'Brownies Coklat', price: 18000, category: 'Dessert', emoji: '🍫' },
  { id: 'p8', name: 'Cheesecake', price: 24000, category: 'Dessert', emoji: '🍰' },
  { id: 'p9', name: 'Es Teh Manis', price: 12000, category: 'Minuman', emoji: '🧊' },
  { id: 'p10', name: 'French Fries', price: 20000, category: 'Snack', emoji: '🍟' },
  { id: 'p11', name: 'Sosis Bakar', price: 16000, category: 'Snack', emoji: '🌭' },
  { id: 'p12', name: 'Jus Jeruk', price: 18000, category: 'Minuman', emoji: '🍊' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('Semua');
  const [cart, setCart] = useState([]);

  const categories = useMemo(
    () => Array.from(new Set(initialProducts.map((p) => p.category))),
    []
  );

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      const byCat = activeCat === 'Semua' || p.category === activeCat;
      const byQ = query
        ? [p.name, p.category].some((t) => t.toLowerCase().includes(query.toLowerCase()))
        : true;
      return byCat && byQ;
    });
  }, [activeCat, query]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) {
        return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const incQty = (id) => setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const decQty = (id) =>
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it))
        .filter((it) => it.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id));
  const clearCart = () => setCart([]);

  const handleCheckout = (total) => {
    alert(`Terima kasih! Total pembayaran: Rp ${total.toLocaleString('id-ID')}`);
    clearCart();
  };

  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header cartCount={cartCount} onSearch={setQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CategoryTabs categories={categories} active={activeCat} onChange={setActiveCat} />
          <ProductGrid products={filtered} onAdd={addToCart} />
        </div>

        <div className="lg:col-span-1">
          <Cart
            items={cart}
            onInc={incQty}
            onDec={decQty}
            onRemove={removeItem}
            onClear={clearCart}
            onCheckout={handleCheckout}
          />
        </div>
      </main>

      <footer className="py-6 text-center text-slate-500 text-sm">
        Dibuat dengan ❤️ untuk POSI • Point of Sale sederhana
      </footer>
    </div>
  );
}
