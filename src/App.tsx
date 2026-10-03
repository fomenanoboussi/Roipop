import React, { useState } from 'react';
import {
  PRODUCTS,
  FABRICATION_STEPS,
  TESTIMONIALS,
  Product,
} from './data/products';
import { CornBackgroundPattern } from './components/CornPattern';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ContactModal } from './components/ContactModal';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plus,
  X,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[2], // ROI POP 100% Naturel
      quantity: 2,
    },
    {
      product: PRODUCTS[1], // CROKS! Caramel au café
      quantity: 1,
    },
  ]);

  // Testimonials state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Filter state for "Voir tous nos produits"
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'snacks' | 'pro'>('all');

  // Handle Cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const scrollToSolution = () => {
    const el = document.getElementById('notre-solution');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf9f0] text-slate-800 flex flex-col font-['Inter',sans-serif] overflow-x-hidden selection:bg-[#3a5f2d] selection:text-white">
      {/* ============================================================== */}
      {/* 1. HEADER HERO (full width, fond vert #3a5f2d avec pattern épis) */}
      {/* ============================================================== */}
      <section className="relative w-full bg-[#3a5f2d] overflow-hidden text-white pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24">
        {/* Pattern épis de maïs subtil en opacité 10% */}
        <CornBackgroundPattern opacity={0.12} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* Top discreet brand mark for header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-12"
          >
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-wider text-[#f5efe0]">
              DU ROI
            </span>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/237691250057?text=Bonjour%20DU%20ROI%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20produits."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-white/90 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
              >
                Contact
              </a>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Voir le panier"
              >
                <ShoppingBag className="w-4 h-4 text-[#d4b896]" />
                {totalCartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a96e] text-[#24381d] text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Colonne Gauche */}
            <div className="lg:col-span-6 flex flex-col items-start z-10 text-left">
              {/* Badge pill vert clair */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 bg-[#4c753c] text-[#f5efe0] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 border border-white/10 shadow-xs"
              >
                <span>100% Bien-Être Naturel</span>
              </motion.div>

              {/* Titre H1 bold blanc avec emoji épi 🌽 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-white leading-[1.18] sm:leading-[1.15] mb-4 sm:mb-5 tracking-tight text-balance"
              >
                Le Vrai Pouvoir du<br className="hidden sm:inline" />
                {' '}Maïs Naturel 🌽
              </motion.h1>

              {/* Description 16px blanc 80% opacité */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal"
              >
                Découvrez notre gamme premium de produits à base de maïs, conçue pour préserver un maximum de bienfaits nutritionnels, grâce à la sagesse traditionnelle et à la transformation artisanale.
              </motion.p>

              {/* Bouton beige arrondi "Commencer" */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToSolution}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#f5efe0] hover:bg-[#e9dfce] text-[#24381d] font-heading font-semibold text-xs sm:text-sm rounded-full transition-colors shadow-md hover:shadow-xl text-center cursor-pointer"
              >
                Commencer
              </motion.button>
            </div>

            {/* Colonne Droite: 4 produits groupés flottants avec animations de lévitation douce */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[290px] xs:min-h-[330px] sm:min-h-[420px] lg:min-h-[460px] py-4 w-full">
              {/* Grounding Soft Ambient Shadow with breathing pulse */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.45, 0.3] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                className="absolute bottom-4 sm:bottom-6 w-4/5 h-8 sm:h-12 bg-black/40 rounded-full blur-xl pointer-events-none"
              />

              {/* Overlapping Products Composition - Organic breathing animation */}
              <div className="relative w-full max-w-[560px] flex items-center justify-center select-none">
                {/* 1. ROI POP 25KG gros sac vert à gauche (derrière) */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, y: -14, zIndex: 45 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-[36%] max-w-[130px] sm:max-w-[195px] -mr-6 sm:-mr-10 -mb-2 z-10 cursor-pointer shrink-0"
                  onClick={() => openProduct(PRODUCTS[0])}
                  title="Voir ROI POP 25KG"
                >
                  <img
                    src="/images/roi-pop-25kg.png"
                    alt="ROI POP 25KG - Sac officiel"
                    className="w-full h-auto object-contain bg-transparent select-none"
                    style={{ filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.35))' }}
                  />
                </motion.div>

                {/* 2. CROKS! Caramel au café sachet marron au milieu */}
                <motion.div
                  animate={{ y: [0, -11, 0], rotate: [0, 1.5, 0] }}
                  transition={{ repeat: Infinity, duration: 4.2, delay: 0.3, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.12, y: -16, zIndex: 45 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-[32%] max-w-[115px] sm:max-w-[170px] -mr-5 sm:-mr-8 z-20 cursor-pointer shrink-0"
                  onClick={() => openProduct(PRODUCTS[1])}
                  title="Voir CROKS! Caramel au café"
                >
                  <img
                    src="/images/croks-caramel-cafe.png"
                    alt="CROKS! Caramel au café - Sachet officiel"
                    className="w-full h-auto object-contain bg-transparent select-none"
                    style={{ filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.4))' }}
                  />
                </motion.div>

                {/* 3. DU ROI Huile Végétale 30ml petit sachet vert devant */}
                <motion.div
                  animate={{ y: [0, -7, 0], rotate: [0, -1.5, 0] }}
                  transition={{ repeat: Infinity, duration: 3.6, delay: 0.7, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.15, y: -12, zIndex: 45 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-[26%] max-w-[95px] sm:max-w-[145px] -mr-5 sm:-mr-8 z-30 cursor-pointer mt-5 sm:mt-8 shrink-0"
                  onClick={() => openProduct(PRODUCTS[3])}
                  title="Voir DU ROI À l'huile végétale"
                >
                  <img
                    src="/images/du-roi-huile-30ml.png"
                    alt="DU ROI À l'huile végétale 30ml"
                    className="w-full h-auto object-contain bg-transparent select-none"
                    style={{ filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.45))' }}
                  />
                </motion.div>

                {/* 4. ROI POP 100% Naturel sachet bleu-vert premium avec gobelet rayé POP CORN à droite */}
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, y: -18, zIndex: 45 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-[38%] max-w-[140px] sm:max-w-[210px] z-40 cursor-pointer shrink-0"
                  onClick={() => openProduct(PRODUCTS[2])}
                  title="Voir ROI POP 100% Naturel"
                >
                  <img
                    src="/images/roi-pop-100-naturel-premium.png"
                    alt="ROI POP 100% Naturel avec gobelet rayé"
                    className="w-full h-auto object-contain bg-transparent select-none"
                    style={{ filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.45))' }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SECTION NOTRE SOLUTION (fond crème #fdf9f0) */}
      {/* ============================================================== */}
      <section
        id="notre-solution"
        className="w-full bg-[#fdf9f0] py-14 sm:py-16 lg:py-24 border-b border-[#eae1d2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* En-tête de section avec scroll reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
          >
            {/* Titre "Notre Solution" vert foncé bold 32px */}
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-[#24381d] mb-3 sm:mb-4 tracking-tight">
              Notre Solution
            </h2>

            {/* Sous-texte */}
            <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-normal px-2 sm:px-0">
              Des produits à base de maïs prêts à l'emploi qui préservent la valeur nutritionnelle et médicinale, ce qui facilite l'intégration dans la vie quotidienne.
            </p>

            {/* Bouton outline gris "Voir tous nos produits" */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCatalogModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium text-xs rounded-full transition-colors shadow-xs cursor-pointer"
            >
              <span>Voir tous nos produits</span>
            </motion.button>
          </motion.div>

          {/* Grille responsive de cartes produits avec apparition décalée */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCTS.slice(0, 3).map((prod, index) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group bg-white rounded-[20px] p-5 sm:p-6 border border-[#e8ded0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-shadow duration-300 flex flex-col justify-between relative"
              >
                {/* Decorative plus badge on Card 3 matching the screenshot */}
                {index === 2 && (
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(prod, 1)}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#fdf9f0] hover:bg-[#3a5f2d] text-slate-500 hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    title="Ajout rapide au panier"
                    aria-label="Ajouter au panier"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                )}

                <div>
                  {/* Image produit top centered */}
                  <div
                    onClick={() => openProduct(prod)}
                    className="w-full h-[180px] sm:h-[220px] flex items-center justify-center mb-4 sm:mb-6 cursor-pointer bg-transparent overflow-hidden"
                  >
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-[170px] sm:max-h-[200px] w-auto object-contain bg-transparent select-none"
                      style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.14))' }}
                    />
                  </div>

                  {/* Titre bold */}
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#24381d] mb-1.5 sm:mb-2 leading-tight">
                    {prod.name}
                  </h3>

                  {/* Description 14px gris */}
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-5 sm:mb-6">
                    {prod.description}
                  </p>
                </div>

                {/* Bouton beige "Voir plus" + flèche verte ronde à droite */}
                <div className="flex items-center justify-between pt-2 border-t border-[#f4ede1]">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openProduct(prod)}
                    className="px-5 py-2.5 bg-[#d4b896] hover:bg-[#c8aa84] text-[#24381d] font-heading font-semibold text-xs rounded-full transition-colors shadow-xs cursor-pointer"
                  >
                    Voir plus
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openProduct(prod)}
                    className="w-8 h-8 rounded-full bg-[#2d4a22] hover:bg-[#3a5f2d] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    aria-label={`En savoir plus sur ${prod.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SECTION ÉTAPES DE FABRICATION (fond vert #3a5f2d) */}
      {/* ============================================================== */}
      <section className="relative w-full bg-[#3a5f2d] py-14 sm:py-16 lg:py-24 text-white overflow-hidden">
        {/* Pattern feuilles subtil */}
        <CornBackgroundPattern opacity={0.1} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* Titre blanc centré "Étapes de fabrication de nos produits" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-white text-center mb-12 sm:mb-16 lg:mb-20 tracking-tight px-2"
          >
            Étapes de fabrication de nos produits
          </motion.h2>

          {/* 4 cercles verts clairs avec badge 01 02 03 04 */}
          <div className="relative">
            {/* Ligne pointillée blanche courbe visible sur écran desktop lg */}
            <div className="hidden lg:block absolute top-[90px] left-[10%] right-[10%] h-[30px] -z-0 pointer-events-none">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 800 40">
                <path
                  d="M 20 20 Q 200 -5, 400 20 T 780 20"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-10 lg:gap-6 relative z-10">
              {/* Cercle 01 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-5 sm:mb-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#d4a76a] text-white font-heading font-extrabold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-md">
                    01
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] lg:w-[175px] lg:h-[175px] rounded-full bg-[#7ab87a] p-3 shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/20 cursor-pointer"
                  >
                    <img
                      src="/images/corn-harvest.png"
                      alt="Épi de maïs récolte"
                      className="w-full h-full object-contain bg-transparent select-none"
                      style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))' }}
                    />
                  </motion.div>
                </div>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed max-w-[240px]">
                  La récolte a lieu lorsque les épis de maïs atteignent leur pleine maturité, garantissant une concentration optimale de composés nutritionnels actifs.
                </p>
              </motion.div>

              {/* Cercle 02 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-5 sm:mb-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#d4a76a] text-white font-heading font-extrabold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-md">
                    02
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] lg:w-[175px] lg:h-[175px] rounded-full bg-[#7ab87a] p-3 shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/20 cursor-pointer"
                  >
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] bg-transparent" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))' }}>
                      <ellipse cx="50" cy="50" rx="14" ry="10" fill="#fdfaf4" stroke="#d5c8b2" strokeWidth="1.5" />
                      <ellipse cx="36" cy="42" rx="12" ry="9" fill="#f5ede0" stroke="#d5c8b2" strokeWidth="1.5" />
                      <ellipse cx="64" cy="42" rx="13" ry="9" fill="#ffffff" stroke="#d5c8b2" strokeWidth="1.5" />
                      <ellipse cx="32" cy="58" rx="13" ry="9" fill="#ffffff" stroke="#d5c8b2" strokeWidth="1.5" />
                      <ellipse cx="68" cy="58" rx="12" ry="8" fill="#f8f2e7" stroke="#d5c8b2" strokeWidth="1.5" />
                      <ellipse cx="50" cy="68" rx="14" ry="9" fill="#f3eae0" stroke="#d5c8b2" strokeWidth="1.5" />
                      <ellipse cx="50" cy="30" rx="12" ry="8" fill="#ffffff" stroke="#d5c8b2" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                </div>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed max-w-[240px]">
                  Sélection et nettoyage méticuleux de chaque grain pour maintenir les normes de pureté et de qualité les plus élevées pour nos produits.
                </p>
              </motion.div>

              {/* Cercle 03 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-5 sm:mb-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#d4a76a] text-white font-heading font-extrabold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-md">
                    03
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] lg:w-[175px] lg:h-[175px] rounded-full bg-[#7ab87a] p-3 shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/20 cursor-pointer"
                  >
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] bg-transparent" style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))' }}>
                      <path
                        d="M 50 25 C 40 22, 30 32, 35 42 C 25 45, 22 58, 32 65 C 28 75, 40 82, 50 78 C 60 82, 72 75, 68 65 C 78 58, 75 45, 65 42 C 70 32, 60 22, 50 25 Z"
                        fill="#fef4cf"
                        stroke="#e3c77d"
                        strokeWidth="2"
                      />
                      <circle cx="44" cy="46" r="6" fill="#fcd765" opacity="0.8" />
                      <circle cx="56" cy="52" r="7" fill="#fbd24e" opacity="0.8" />
                      <circle cx="48" cy="62" r="5" fill="#f9ca35" opacity="0.7" />
                    </svg>
                  </motion.div>
                </div>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed max-w-[240px]">
                  Transformation artisanale en croks, farine ou popcorn de qualité supérieure à l'aide de techniques qui préservent les composés bénéfiques naturels du maïs.
                </p>
              </motion.div>

              {/* Cercle 04 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-5 sm:mb-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#d4a76a] text-white font-heading font-extrabold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-md">
                    04
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] lg:w-[175px] lg:h-[175px] rounded-full bg-[#7ab87a] p-3 shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/20 cursor-pointer"
                  >
                    <img
                      src="/images/roi-pop-100-naturel-premium.png"
                      alt="Conditionnement ROI POP"
                      className="w-full h-full object-contain p-1 bg-transparent select-none"
                      style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.22))' }}
                    />
                  </motion.div>
                </div>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed max-w-[240px]">
                  Conditionnement et mise en sachet du ROI POP 100% Naturel, prêt à la dégustation, conservant toute la fraîcheur et le croustillant du maïs.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SECTION TÉMOIGNAGE (fond blanc #ffffff avec transition fluide) */}
      {/* ============================================================== */}
      <section className="w-full bg-[#ffffff] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
          {/* Icône "99" verte claire au centre */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#e3efe1] flex items-center justify-center mb-5 sm:mb-6"
          >
            <span className="font-heading font-black text-lg sm:text-xl text-[#3a5f2d] tracking-tighter">
              99
            </span>
          </motion.div>

          {/* Citation avec AnimatePresence fluide lors du changement */}
          <div className="min-h-[140px] sm:min-h-[120px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <blockquote className="font-['Inter'] italic text-sm sm:text-base md:text-lg lg:text-xl text-[#24381d] leading-relaxed max-w-2xl mb-5 px-2 sm:px-0">
                  {TESTIMONIALS[currentTestimonialIndex].quote}
                </blockquote>

                {/* Auteur + statut */}
                <div className="mb-6">
                  <h4 className="font-heading font-bold text-sm text-[#24381d]">
                    {TESTIMONIALS[currentTestimonialIndex].author}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    {TESTIMONIALS[currentTestimonialIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flèches gauche/droite + dots pagination */}
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-slate-200 hover:border-slate-400 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* 5 Dots pagination */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((dotIndex) => {
                const isActive = dotIndex === currentTestimonialIndex;
                return (
                  <button
                    key={dotIndex}
                    onClick={() =>
                      setCurrentTestimonialIndex(dotIndex % TESTIMONIALS.length)
                    }
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive ? 'w-5 bg-[#c9a96e]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Aller au témoignage ${dotIndex + 1}`}
                  />
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-slate-200 hover:border-slate-400 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FOOTER CTA (fond vert #3a5f2d) + FOOTER BAS CRÈME */}
      {/* ============================================================== */}
      <footer className="w-full">
        {/* Section Footer CTA */}
        <div className="relative w-full bg-[#3a5f2d] py-14 sm:py-16 lg:py-20 text-white overflow-hidden text-center">
          <CornBackgroundPattern opacity={0.1} />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-3xl mx-auto px-4 sm:px-8"
          >
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-3 sm:mb-4 tracking-tight text-balance">
              Découvrez le Vrai Pouvoir du Maïs
            </h2>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto font-normal px-2 sm:px-0">
              Rejoignez des milliers de personnes qui ont découvert les bienfaits naturels de nos snacks, farines et popcorns de maïs soigneusement élaborés.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCatalogModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#f5efe0] text-[#24381d] font-heading font-semibold text-xs rounded-full transition-colors shadow-md hover:shadow-xl cursor-pointer"
            >
              Acheter la Collection
            </motion.button>
          </motion.div>
        </div>

        {/* Footer bas crème #fdf9f0 */}
        <div className="w-full bg-[#fdf9f0] py-12 sm:py-14 px-4 sm:px-8 lg:px-12 border-t border-[#ede3d4]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-12">
            {/* Colonne 1: DU ROI description */}
            <div>
              <h4 className="font-heading font-extrabold text-base text-[#24381d] mb-2 sm:mb-3 tracking-wider">
                DU ROI
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Produits de base sains et bons au goût, ancrés dans la tradition et soutenus par la science.
              </p>
            </div>

            {/* Colonne 2: Boutique liens */}
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#24381d] mb-2.5 sm:mb-3">
                Boutique
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Tous les produits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Votre Panier
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Farine de maïs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Huiles de maïs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Snacks
                  </button>
                </li>
              </ul>
            </div>

            {/* Colonne 3: À propos liens */}
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#24381d] mb-2.5 sm:mb-3">
                À propos
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button
                    onClick={() => setIsAboutModalOpen(true)}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Notre histoire
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('notre-solution');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 cursor-pointer"
                  >
                    Notre processus
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/237691250057?text=Bonjour%20DU%20ROI%2C%20je%20souhaite%20vous%20contacter%20concernant%20vos%20produits."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#3a5f2d] transition-colors py-0.5 inline-block"
                  >
                    Contactez-nous
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne 4: Bouton "Demander à l'IA" */}
            <div className="flex flex-col items-start lg:items-end justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAiModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#d9ccb9] hover:border-[#3a5f2d] text-[#24381d] hover:text-[#3a5f2d] text-xs font-semibold rounded-full shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#3a5f2d]" />
                <span>Demander à l'IA</span>
              </motion.button>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-[#e8ded0] text-center text-[11px] text-slate-500">
            © 2024 DU ROI SARL. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* MODALS & DRAWERS */}
      {/* ============================================================== */}
      {/* 1. Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 3. AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* 4. Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* 5. Full Catalog Modal for "Voir tous nos produits" */}
      <AnimatePresence>
        {isCatalogModalOpen && (
          <motion.div
            key="catalog-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs"
            onClick={() => setIsCatalogModalOpen(false)}
          >
            <motion.div
              key="catalog-modal-content"
              initial={{ opacity: 0, scale: 0.93, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative bg-[#fdf9f0] rounded-[24px] max-w-4xl w-full p-5 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#e5dcce] shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#24381d]">
                    Collection Complète DU ROI
                  </h3>
                  <p className="text-xs text-slate-600">
                    Agroalimentaire & Import/Export — Gamme certifiée maïs naturel
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCatalogModalOpen(false);
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    setIsCatalogModalOpen(false);
                  }}
                  className="w-11 h-11 rounded-full bg-white text-slate-600 hover:text-slate-900 shadow-md border border-slate-200 flex items-center justify-center cursor-pointer touch-manipulation active:scale-95 transition-transform"
                  style={{ pointerEvents: 'auto' }}
                  aria-label="Fermer le catalogue"
                  type="button"
                >
                  <X className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              {/* Filter buttons */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFilter === 'all'
                      ? 'bg-[#3a5f2d] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Tous les formats
                </button>
                <button
                  onClick={() => setSelectedFilter('snacks')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFilter === 'snacks'
                      ? 'bg-[#3a5f2d] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Snacks & Popcorn
                </button>
                <button
                  onClick={() => setSelectedFilter('pro')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFilter === 'pro'
                      ? 'bg-[#3a5f2d] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Gros volume 25KG
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {PRODUCTS.filter((p) => {
                  if (selectedFilter === 'snacks') return p.id !== 'roi-pop-25kg';
                  if (selectedFilter === 'pro') return p.id === 'roi-pop-25kg';
                  return true;
                }).map((prod) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    key={prod.id}
                    className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#e8ded0] flex flex-col justify-between shadow-xs"
                  >
                    <div className="h-40 sm:h-44 flex items-center justify-center mb-3 sm:mb-4 bg-transparent">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-36 sm:max-h-40 w-auto object-contain bg-transparent select-none"
                        style={{ filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.12))' }}
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#24381d]">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-500 mb-3">{prod.weight}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#f4ede1]">
                        <span className="font-bold text-sm text-[#3a5f2d]">
                          {prod.price}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          onClick={() => {
                            handleAddToCart(prod, 1);
                            setIsCatalogModalOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="px-3.5 py-1.5 bg-[#3a5f2d] hover:bg-[#2d4a22] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Ajouter
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. About DU ROI Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <motion.div
            key="about-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs"
            onClick={() => setIsAboutModalOpen(false)}
          >
            <motion.div
              key="about-modal-content"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative bg-[#fdf9f0] rounded-[24px] max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-[#e5dcce] my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAboutModalOpen(false);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  setIsAboutModalOpen(false);
                }}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 rounded-full bg-white text-slate-600 hover:text-slate-900 shadow-md border border-slate-200 flex items-center justify-center cursor-pointer touch-manipulation active:scale-95 transition-transform z-20"
                style={{ pointerEvents: 'auto' }}
                aria-label="Fermer"
                type="button"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#24381d] mb-1.5 sm:mb-2">
                À propos de DU ROI
              </h3>
              <p className="text-xs text-[#3a5f2d] font-semibold mb-3 sm:mb-4">
                Agroalimentaire & Import/Export
              </p>
              <div className="text-xs text-slate-600 space-y-2.5 sm:space-y-3 leading-relaxed">
                <p>
                  <strong>DU ROI SARL</strong> est une entreprise agroalimentaire de référence spécialisée dans la valorisation, la transformation artisanale et la distribution de produits à base de maïs de qualité supérieure.
                </p>
                <p>
                  De nos terroirs agricoles aux foyers et aux salles de spectacle, nous garantissons une traçabilité irréprochable, un respect scrupuleux des normes sanitaires et une conservation optimale des micronutriments du maïs.
                </p>
                <p>
                  Nos marques phares : <strong>ROI POP</strong> (grains sélectionnés & popcorn prêt à consommer) et <strong>CROKS!</strong> (snack gourmand caramélisé).
                </p>
              </div>
              <div className="mt-5 sm:mt-6 pt-4 border-t border-[#e8ded0] flex justify-end">
                <button
                  onClick={() => setIsAboutModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-2 bg-[#3a5f2d] text-white text-xs font-semibold rounded-full hover:bg-[#2d4a22] text-center cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Quick Action Button with gentle breathing pulse */}
      <motion.a
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 10px 25px -5px rgba(37, 211, 102, 0.4)',
            '0 16px 35px -5px rgba(37, 211, 102, 0.65)',
            '0 10px 25px -5px rgba(37, 211, 102, 0.4)',
          ],
        }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        href="https://wa.me/237691250057?text=Bonjour%20DU%20ROI%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20produits."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full transition-colors flex items-center gap-2 group border-2 border-white/30 cursor-pointer"
        aria-label="Contacter sur WhatsApp"
        title="Discuter sur WhatsApp (+237 691 25 00 57)"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-1">
          WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
