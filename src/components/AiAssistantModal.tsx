import React, { useState } from 'react';
import { X, Sparkles, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FAQ_SUGGESTIONS = [
  'Quels sont les bienfaits du maïs 100% naturel ?',
  'Comment réussir la cuisson du ROI POP ?',
  'Quelles sont les conditions de livraison en gros ?',
  'Le CROKS! Caramel au café contient-il des allergènes ?',
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Bonjour et bienvenue chez DU ROI Agroalimentaire ! Je suis votre conseiller virtuel. Posez-moi toutes vos questions sur nos produits à base de maïs, leurs vertus nutritionnelles, ou les commandes en gros.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      const lower = userText.toLowerCase();

      if (lower.includes('bienfait') || lower.includes('santé') || lower.includes('nutrition')) {
        response =
          'Le maïs 100% naturel DU ROI est une excellente source de fibres alimentaires pour le transit, de polyphénols antioxydants protecteurs, et de glucides complexes à diffusion lente. Il est naturellement sans gluten et sans conservateur.';
      } else if (lower.includes('cuisson') || lower.includes('prépar') || lower.includes('faire')) {
        response =
          'Pour un éclat parfait du ROI POP : faites chauffer 2 cuillères à soupe d\'huile végétale DU ROI dans une casserole à feu moyen, déposez 3 grains témoins. Dès qu\'ils éclatent, versez le reste de vos grains en une seule couche, couvrez en laissant un léger filet d\'air, et secouez régulièrement.';
      } else if (lower.includes('gros') || lower.includes('25kg') || lower.includes('prix') || lower.includes('livraison')) {
        response =
          'Notre sac ROI POP 25KG (45 000 FCFA) est le favori des professionnels avec un taux d\'éclatement supérieur à 98%. Nous livrons partout à Douala, Yaoundé et dans les autres régions, avec expédition sous 24-48h. Contactez notre service WhatsApp direct au +237 691 25 00 57 pour devis et remises volumiques.';
      } else if (lower.includes('croks') || lower.includes('allergène') || lower.includes('caramel')) {
        response =
          'CROKS! Caramel au café combine maïs soufflé croustillant, caramel cuit au chaudron et infusion de café torréfié. Il contient du beurre frais (produit laitier). Il ne contient ni conservateurs artificiels ni huile de palme.';
      } else {
        response =
          'Merci pour votre intérêt pour la gamme DU ROI ! Nos équipes commerciales restent également à votre entière disposition au +237 691 25 00 57 pour toute commande spécifique ou partenariat de distribution.';
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 700);
  };

  const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ai-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
          onClick={handleClose}
        >
          <motion.div
            key="ai-modal-dialog"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-[#fdf9f0] rounded-[24px] max-w-lg w-full h-[85vh] sm:h-[580px] shadow-2xl flex flex-col overflow-hidden border border-[#e5dcce]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#3a5f2d] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#d4b896]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">Conseiller Nutrition & Produits</h3>
                  <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> En ligne • DU ROI IA
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                onTouchEnd={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-colors cursor-pointer touch-manipulation"
                aria-label="Fermer"
                type="button"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[18px] p-3.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#3a5f2d] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-[#e8ded0] rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e8ded0] rounded-[18px] px-4 py-2.5 rounded-bl-xs text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#3a5f2d] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#3a5f2d] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#3a5f2d] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Quick Questions */}
            <div className="px-4 py-2 bg-white/60 border-t border-[#e8ded0] overflow-x-auto flex gap-1.5 scrollbar-none">
              {FAQ_SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug)}
                  className="text-[11px] whitespace-nowrap bg-white border border-[#d9ccb9] text-[#2d4a22] hover:bg-[#f5efe0] px-3 py-1 rounded-full transition-colors shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-white border-t border-[#e8ded0] flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question sur DU ROI..."
                className="flex-1 bg-[#fdf9f0] border border-[#e0d6c5] rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#3a5f2d]"
              />
              <button
                type="submit"
                className="w-9 h-9 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white rounded-full flex items-center justify-center shrink-0 transition-colors active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
