import React from 'react';
import { Plus, Tag } from 'lucide-react';

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm transition">
      <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <span className="text-3xl font-semibold text-slate-400">{product.emoji}</span>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-slate-800 leading-tight">{product.name}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Tag size={14} /> {product.category}</p>
          </div>
          <p className="font-semibold text-indigo-600">Rp {product.price.toLocaleString('id-ID')}</p>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={16} /> Tambah
        </button>
      </div>
    </div>
  );
};

const ProductGrid = ({ products, onAdd }) => {
  if (!products.length) {
    return (
      <div className="text-center text-slate-500 py-20">Tidak ada produk untuk kategori/pencarian ini.</div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductGrid;
