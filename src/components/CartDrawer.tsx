import React from 'react';
import { Product } from '../data/products';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.priceNumeric * item.quantity,
    0
  );

  const formattedTotal = new Intl.NumberFormat('fr-FR').format(totalAmount);

  const handleOrderWhatsApp = () => {
    if (items.length === 0) return;
    const itemsList = items
      .map((i) => `• ${i.quantity}x ${i.product.name} (${i.product.weight})`)
      .join('%0A');
    const message = `Bonjour DU ROI ! Je souhaite passer commande :%0A%0A${itemsList}%0A%0ATotal : ${formattedTotal} FCFA%0AMerci de me confirmer la disponibilité et les modalités de livraison.`;
    window.location.href = `https://wa.me/237691250057?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#fdf9f0] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#3a5f2d] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <ShoppingBag className="w-5 h-5 text-[#d4b896]" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg">Votre Panier DU ROI</h2>
                <p className="text-xs text-white/80">
                  {items.length} {items.length > 1 ? 'articles sélectionnés' : 'article sélectionné'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-[#f5efe0] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#3a5f2d]/50" />
                </div>
                <h3 className="font-heading font-semibold text-slate-800 text-base mb-1">
                  Votre panier est vide
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Découvrez nos créations naturelles à base de maïs et ajoutez vos snacks préférés.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white text-xs font-semibold rounded-full transition-colors"
                >
                  Découvrir nos produits
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-[16px] p-4 border border-[#e8ded0] shadow-xs flex gap-4 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-transparent shrink-0"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm text-[#24381d] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">{item.product.weight}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#3a5f2d]">
                        {item.product.price}
                      </span>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#f5efe0] rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#2d4a22] hover:text-black p-0.5"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#2d4a22] hover:text-black p-0.5"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Supprimer du panier"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#e8ded0] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total estimé</span>
                <span className="font-heading font-extrabold text-xl text-[#2d4a22]">
                  {formattedTotal} FCFA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Livraison rapide partout au Cameroun & export international disponible sur demande.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleOrderWhatsApp}
                  className="w-full py-3.5 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <span>Commander via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClearCart}
                  className="text-xs text-slate-400 hover:text-slate-600 text-center py-1 transition-colors"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
