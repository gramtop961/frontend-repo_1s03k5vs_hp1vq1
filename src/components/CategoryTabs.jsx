import React from 'react';

const CategoryTabs = ({ categories, active, onChange }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {['Semua', ...categories].map((cat) => {
          const isActive = active === cat || (active === 'Semua' && cat === 'Semua');
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`px-3.5 py-2 rounded-lg border text-sm transition whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
