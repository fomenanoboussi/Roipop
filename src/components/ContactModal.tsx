import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs"
          onClick={handleClose}
        >
          <motion.div
            key="contact-modal-dialog"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-[#fdf9f0] rounded-[24px] max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-[#e5dcce] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              onTouchEnd={handleClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 rounded-full bg-white text-slate-600 hover:text-slate-900 shadow-md border border-slate-200 flex items-center justify-center cursor-pointer touch-manipulation active:scale-95 transition-transform"
              style={{ pointerEvents: 'auto' }}
              aria-label="Fermer"
              type="button"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>

            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#24381d] mb-1">
              Contactez DU ROI
            </h3>
            <p className="text-xs text-slate-600 mb-5 sm:mb-6">
              Agroalimentaire & Import/Export — Service commercial & partenariats
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <CheckCircle2 className="w-12 h-12 text-[#3a5f2d] mb-3 animate-bounce" />
                <h4 className="font-heading font-bold text-lg text-[#24381d]">Message envoyé avec succès !</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs">
                  Notre équipe commerciale DU ROI vous recontactera sous 24h ouvrées.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
                  <input
                    required
                    type="text"
                    placeholder="Votre nom ou nom d'entreprise"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#d9ccb9] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#3a5f2d] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone / WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="+237 6..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#d9ccb9] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#3a5f2d] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="contact@domaine.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#d9ccb9] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#3a5f2d] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Votre demande</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Précisez votre demande (commande en gros ROI POP 25kg, distribution CROKS!, import/export...)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#d9ccb9] rounded-xl p-3 text-xs focus:outline-none focus:border-[#3a5f2d] transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#3a5f2d]" />
                    <span>Réponse sous 24h</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2.5 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white font-semibold text-xs rounded-full flex items-center gap-2 transition-all shadow-sm active:scale-95"
                  >
                    <span>Envoyer</span>
                    <Send className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </form>
            )}

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#e8ded0] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3a5f2d] shrink-0" />
                <span>Douala & Yaoundé, Cameroun</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3a5f2d] shrink-0" />
                <a
                  href="https://wa.me/237691250057?text=Bonjour%20DU%20ROI%2C%20je%20vous%20contacte%20depuis%20le%20site%20web."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3a5f2d] font-bold hover:underline"
                >
                  +237 691 25 00 57 (WhatsApp)
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
