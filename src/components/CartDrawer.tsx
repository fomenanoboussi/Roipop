import React from 'react';
import { Product } from '../data/products';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#fdf9f0] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-5 sm:px-6 py-5 bg-[#3a5f2d] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <ShoppingBag className="w-5 h-5 text-[#d4b896]" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-base sm:text-lg">Votre Panier DU ROI</h2>
                    <p className="text-xs text-white/80">
                      {items.length} {items.length > 1 ? 'articles sélectionnés' : 'article sélectionné'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-colors text-white"
                  aria-label="Fermer le panier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-[#eae0cf] flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-[#3a5f2d]/50" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#24381d] mb-1">
                      Votre panier est vide
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mb-6">
                      Explorez notre sélection de popcorns croustillants et de produits au maïs naturel.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#3a5f2d] text-white rounded-full text-xs font-semibold hover:bg-[#2d4a22] transition-colors"
                    >
                      Découvrir nos produits
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={item.product.id}
                        className="bg-white p-3 sm:p-4 rounded-[18px] border border-[#e8ded0] flex items-center gap-3.5 shadow-xs"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center bg-transparent">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-14 sm:max-h-16 w-auto object-contain bg-transparent"
                            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-[#24381d] truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 block mb-1">
                            {item.product.weight}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-[#3a5f2d]">
                            {item.product.price}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors p-1"
                            title="Supprimer l'article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center bg-[#fdf9f0] border border-[#d8cdbd] rounded-full px-1.5 py-0.5">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-black font-bold active:scale-95"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-black font-bold active:scale-95"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 bg-white border-t border-[#e8ded0] space-y-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Total estimé</span>
                    <span className="font-heading font-extrabold text-lg sm:text-xl text-[#2d4a22]">
                      {formattedTotal} FCFA
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Livraison rapide partout au Cameroun & export international disponible sur demande.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleOrderWhatsApp}
                      className="w-full py-3.5 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] text-xs sm:text-sm"
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
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
