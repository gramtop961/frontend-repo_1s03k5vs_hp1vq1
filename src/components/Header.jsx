import React from 'react';
import { ShoppingCart, Search, Receipt } from 'lucide-react';

const Header = ({ cartCount, onSearch }) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">P</div>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight">POSI</p>
            <p className="text-xs text-slate-500 -mt-0.5">Point of Sale</p>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-auto">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Cari produk, sku, atau kategori..."
              className="w-full rounded-lg border border-slate-200 bg-white/80 pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition">
            <Receipt size={18} />
            <span className="hidden sm:inline">Transaksi</span>
          </button>
          <div className="relative">
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Keranjang</span>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-fuchsia-500 text-white rounded-full px-1.5 py-0.5 font-medium shadow">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
