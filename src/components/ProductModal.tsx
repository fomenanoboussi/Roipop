import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Check, ShoppingBag, Leaf, Award, ShieldCheck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#fdf9f0] rounded-[24px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#e5dcce] overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white text-slate-400 hover:text-slate-800 shadow-xs border border-slate-200 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image Column */}
          <div className="bg-transparent p-4 flex flex-col items-center justify-center relative group">
            <div className="absolute top-0 left-0 bg-[#e8f3e3] text-[#2d4a22] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Leaf className="w-3.5 h-3.5" />
              <span>{product.badge || '100% Naturel'}</span>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[260px] w-auto object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.2))' }}
            />
            <span className="mt-3 text-xs font-semibold text-slate-500">
              {product.weight}
            </span>
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            <h3 className="font-heading font-extrabold text-2xl text-[#24381d] leading-tight mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-[#3a5f2d] font-semibold mb-3">
              {product.tagline}
            </p>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {product.longDescription}
            </p>

            {/* Key benefits list */}
            <div className="mb-5 space-y-1.5">
              {product.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-[#3a5f2d] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Nutrition Highlights */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-xl border border-[#e8ded0] text-center mb-5">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Énergie</span>
                <span className="font-bold text-xs text-[#24381d]">{product.nutrition.calories.split(' ')[0]}</span>
              </div>
              <div className="border-x border-slate-100">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Fibres</span>
                <span className="font-bold text-xs text-[#3a5f2d]">{product.nutrition.fibers}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Protéines</span>
                <span className="font-bold text-xs text-[#24381d]">{product.nutrition.proteins}</span>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-[#e8ded0]">
              <div className="flex items-baseline gap-2 sm:block">
                <span className="text-[11px] text-slate-500 block">Prix unitaire</span>
                <span className="font-heading font-black text-xl text-[#2d4a22]">
                  {product.price}
                </span>
              </div>

              {/* Quantity & Buy */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center bg-white border border-[#d8cdbd] rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-black font-bold active:scale-95"
                    aria-label="Diminuer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-black font-bold active:scale-95"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#3a5f2d] hover:bg-[#2d4a22] text-white active:scale-95'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{added ? 'Ajouté !' : 'Commander'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
