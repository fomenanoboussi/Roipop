import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-[#fdf9f0] rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#e5dcce]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white text-slate-400 hover:text-slate-800 shadow-xs border border-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading font-extrabold text-2xl text-[#24381d] mb-1">
          Contactez DU ROI
        </h3>
        <p className="text-xs text-slate-600 mb-6">
          Agroalimentaire & Import/Export — Service commercial & partenariats
        </p>

        {sent ? (
          <div className="py-12 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-[#3a5f2d] mb-3 animate-bounce" />
            <h4 className="font-heading font-bold text-lg text-[#24381d]">Message envoyé avec succès !</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-xs">
              Notre équipe commerciale DU ROI vous recontactera sous 24h ouvrées.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
              <input
                required
                type="text"
                placeholder="Votre nom ou nom d'entreprise"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-[#d9ccb9] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#3a5f2d]"
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
                  className="w-full bg-white border border-[#d9ccb9] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#3a5f2d]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="contact@domaine.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#d9ccb9] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#3a5f2d]"
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
                className="w-full bg-white border border-[#d9ccb9] rounded-xl p-3 text-xs focus:outline-none focus:border-[#3a5f2d]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3a5f2d]" />
                <span>Réponse sous 24h</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white font-semibold text-xs rounded-full flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Envoyer</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-[#e8ded0] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-600">
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
      </div>
    </div>
  );
};
