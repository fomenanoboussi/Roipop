import React, { useState } from 'react';
import { X, Sparkles, Send, MessageCircle } from 'lucide-react';

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

  if (!isOpen) return null;

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
          'Le maïs naturel DU ROI est une source remarquable de fibres alimentaires (favorisant le transit et la satiété), de polyphénols antioxydants et d\'oligo-éléments essentiels. Grâce à notre transformation douce, ces micronutriments sont intégralement préservés sans aucun additif nocif.';
      } else if (lower.includes('cuisson') || lower.includes('préparer') || lower.includes('éclater')) {
        response =
          'Pour un rendement d\'éclatement optimal du ROI POP : faites chauffer une huile végétale saine (comme l\'huile de coco ou de tournesol) à feu moyen-vif. Mettez 3 grains test ; dès qu\'ils éclatent, versez le reste et couvrez en secouant doucement. Le taux d\'expansion DU ROI dépasse 44-46x !';
      } else if (lower.includes('gros') || lower.includes('export') || lower.includes('livraison') || lower.includes('25kg')) {
        response =
          'DU ROI SARL livre partout au Cameroun et organise des expéditions en conteneurs pour l\'export vers toute l\'Afrique centrale et l\'Europe. Nos sacs de 25KG bénéficient de tarifs dégressifs. Vous pouvez nous contacter directement par WhatsApp pour un devis pro instantané.';
      } else if (lower.includes('croks') || lower.includes('caramel') || lower.includes('café')) {
        response =
          'CROKS! Caramel au café est confectionné avec du maïs soufflé artisanal, du caramel au beurre doux et une véritable infusion de grains de café arabica. Il contient des traces de produits laitiers (beurre) mais est garanti sans gluten.';
      } else {
        response =
          'Merci pour votre intérêt pour DU ROI Agroalimentaire ! Nos produits (ROI POP 25KG, CROKS! Caramel au café et ROI POP 100% Naturel) allient tradition africaine et rigueur nutritionnelle. N\'hésitez pas à ajouter des articles à votre panier ou à nous contacter sur WhatsApp pour toute commande sur mesure.';
      }

      setMessages([...newMessages, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#fdf9f0] rounded-[24px] max-w-lg w-full flex flex-col h-[560px] shadow-2xl z-10 border border-[#e5dcce] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#3a5f2d] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c9a96e] text-[#24381d] rounded-full">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm">Conseiller DU ROI IA</h3>
              <p className="text-[11px] text-white/80">Spécialiste maïs & agroalimentaire</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
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
            </div>
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
            className="w-9 h-9 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white rounded-full flex items-center justify-center shrink-0 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
