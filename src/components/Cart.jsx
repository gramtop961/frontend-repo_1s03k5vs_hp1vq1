import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItem = ({ item, onInc, onDec, onRemove }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
          {item.emoji}
        </div>
        <div>
          <p className="font-medium text-slate-800 leading-tight">{item.name}</p>
          <p className="text-xs text-slate-500">Rp {item.price.toLocaleString('id-ID')} • x{item.qty}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDec}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={onInc}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={onRemove}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const Cart = ({ items, onInc, onDec, onRemove, onClear, onCheckout }) => {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 lg:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold tracking-tight">Keranjang</h3>
        {items.length > 0 && (
          <button onClick={onClear} className="text-sm text-rose-600 hover:underline">Kosongkan</button>
        )}
      </div>
      <div className="divide-y divide-slate-200 flex-1 overflow-auto pr-1">
        {items.length === 0 ? (
          <p className="text-slate-500 text-sm py-6">Belum ada item. Tambahkan produk dari daftar.</p>
        ) : (
          items.map((it) => (
            <CartItem
              key={it.id}
              item={it}
              onInc={() => onInc(it.id)}
              onDec={() => onDec(it.id)}
              onRemove={() => onRemove(it.id)}
            />
          ))
        )}
      </div>

      <div className="border-t border-slate-200 mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>PPN (10%)</span>
          <span>Rp {tax.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>Rp {total.toLocaleString('id-ID')}</span>
        </div>
        <button
          onClick={() => items.length > 0 && onCheckout(total)}
          disabled={items.length === 0}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700"
        >
          Checkout • Rp {total.toLocaleString('id-ID')}
        </button>
      </div>
    </aside>
  );
};

export default Cart;
