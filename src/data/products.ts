export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: string;
  priceNumeric: number;
  weight: string;
  image: string;
  originalUpload: string;
  badge?: string;
  nutrition: {
    calories: string;
    fibers: string;
    proteins: string;
    lipids: string;
    origin: string;
  };
  ingredients: string[];
  benefits: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'roi-pop-25kg',
    name: 'ROI POP 25KG',
    tagline: 'Un mélange nutritif et équilibré, riche en fibres et éléments naturels.',
    description: 'Un mélange nutritif et équilibré, riche en fibres et éléments naturels.',
    longDescription:
      'Grains de maïs de qualité supérieure sélectionnés pour leur pouvoir d\'expansion d\'exception (44-46+). Conditionnement grand format 25 kg destiné aux professionnels, cinémas, forains, revendeurs et familles. Récolte d\'Argentine, sélectionnée et reconditionnée par DU ROI.',
    price: '45 000 FCFA',
    priceNumeric: 45000,
    weight: 'Sac de 25 KG',
    image: '/images/roi-pop-25kg.png',
    originalUpload: '/images/roi-pop-25kg.png',
    badge: 'Format Pro 25KG',
    nutrition: {
      calories: '365 kcal / 100g',
      fibers: '14.5 g',
      proteins: '9.4 g',
      lipids: '4.7 g',
      origin: 'Origine sélectionnée Argentine & conditionné DU ROI Cameroun',
    },
    ingredients: ['100% Grains de maïs jaune brut sélectionnés pour popcorn (Zea mays everta)'],
    benefits: [
      'Taux d\'éclatement supérieur à 98%',
      'Sans OGM, zéro conservateur artificiel',
      'Riche en polyphénols antioxydants et fibres digestives',
      'Sac polypropylène tressé haute résistance contre l\'humidité',
    ],
  },
  {
    id: 'croks-caramel',
    name: 'CROKS! Caramel au café',
    tagline: "Goût sucré-salé, caramel et café infusé pour une gourmandise de l'Angleterre.",
    description: "Goût sucré-salé, caramel et café infusé pour une gourmandise de l'Angleterre.",
    longDescription:
      "Une gourmandise inédite signée DU ROI : l'alliance croustillante du maïs soufflé artisanal avec un enrobage généreux de caramel cuit au chaudron et délicatement infusé au café d'exception. Idéal pour les pauses gourmandes.",
    price: '1 500 FCFA',
    priceNumeric: 1500,
    weight: 'Sachet 150g',
    image: '/images/croks-caramel-cafe.png',
    originalUpload: '/images/croks-caramel-cafe.png',
    badge: 'Gourmet CROKS!',
    nutrition: {
      calories: '440 kcal / 100g',
      fibers: '6.2 g',
      proteins: '4.8 g',
      lipids: '12.0 g',
      origin: 'Ateliers DU ROI Agroalimentaire',
    },
    ingredients: [
      'Maïs soufflé croustillant',
      'Caramel artisanal pur beurre',
      'Infusion de café arabica torréfié',
      'Pointe de sel fin marin',
    ],
    benefits: [
      'Sachet hermétique conservant le croustillant absolu',
      'Sans conservateurs ni arômes artificiels',
      'Énergie savoureuse pour toute la journée',
    ],
  },
  {
    id: 'roi-pop-naturel',
    name: 'ROI POP 100% Naturel',
    tagline: 'Popcorn 100% naturel, croustillant et léger, parfait pour un moment de détente.',
    description: 'Popcorn 100% naturel, croustillant et léger, parfait pour un moment de détente.',
    longDescription:
      'Le popcorn prêt à consommer par excellence. Éclaté délicatement à air pulsé, croustillant et fondant en bouche, emballé dans son sachet fraîcheur iconique avec gobelet rayé cinéma. Zéro additif chimique.',
    price: '1 000 FCFA',
    priceNumeric: 1000,
    weight: 'Sachet 100g',
    image: '/images/roi-pop-100-naturel-premium.png',
    originalUpload: '/images/roi-pop-100-naturel-premium.png',
    badge: '100% Naturel',
    nutrition: {
      calories: '380 kcal / 100g',
      fibers: '12.8 g',
      proteins: '8.2 g',
      lipids: '7.5 g',
      origin: 'Grains sélectionnés DU ROI',
    },
    ingredients: [
      'Maïs soufflé 100% naturel',
      'Huile végétale de première pression',
      'Sel minéral naturel',
    ],
    benefits: [
      'Snack sain et léger pour toute la famille',
      'Riche en fibres, sans gluten',
      'Conditionné prêt à déguster',
    ],
  },
  {
    id: 'du-roi-huile-30ml',
    name: "DU ROI À l'huile végétale",
    tagline: 'Un goût délicieux et unique, sachet fraîcheur 30ml fabriqué en Belgique.',
    description: 'Assaisonnement de qualité supérieure à l\'huile végétale, arôme délicieux pour vos préparations.',
    longDescription:
      'Le sachet doseur 30 ml DU ROI à l\'huile végétale, formulé en Belgique selon les plus hauts standards européens. Idéal pour la cuisson délicate du popcorn, les salades composées et l\'assaisonnement quotidien.',
    price: '500 FCFA',
    priceNumeric: 500,
    weight: 'Sachet 30 ml',
    image: '/images/du-roi-huile-30ml.png',
    originalUpload: '/images/du-roi-huile-30ml.png',
    badge: 'Fabriqué en Belgique',
    nutrition: {
      calories: '820 kcal / 100ml',
      fibers: '0 g',
      proteins: '0.1 g',
      lipids: '91.5 g',
      origin: 'Fabriqué en Belgique pour DU ROI',
    },
    ingredients: [
      'Huiles végétales raffinées de qualité supérieure',
      'Extraits naturels aromatiques',
      'Vitamine E antioxydante',
    ],
    benefits: [
      'Format individuel pratique et hermétique 30 ml',
      'Point de fumée élevé idéal pour éclater le maïs sans brûler',
      'Apporte une dorure et un goût unique aux popcorns',
    ],
  },
];

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export const FABRICATION_STEPS: Step[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'La récolte optimale',
    description:
      'La récolte a lieu lorsque les épis de maïs atteignent leur pleine maturité, garantissant une concentration optimale de composés nutritionnels actifs.',
    image: '/images/corn-harvest.png',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Sélection & Nettoyage',
    description:
      'Sélection et nettoyage méticuleux de chaque grain pour maintenir les normes de pureté et de qualité les plus élevées pour nos produits.',
    image: '/images/corn-harvest.png',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Transformation artisanale',
    description:
      'Transformation artisanale en croks, farine ou popcorn de qualité supérieure à l\'aide de techniques qui préservent les composés bénéfiques naturels du maïs.',
    image: '/images/roi-pop-100-naturel-premium.png',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Conditionnement & Fraîcheur',
    description:
      'Conditionnement et mise en sachet du ROI POP 100% Naturel, prêt à la dégustation, conservant toute la fraîcheur et le croustillant du maïs.',
    image: '/images/roi-pop-100-naturel-premium.png',
  },
];

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      '« Vos produits sont exceptionnels ! Pour ma première commande importante, je vais commencer par ceci : 20 sachets de ROI POP naturel et 15 sachets de CROKS! Je suis impatiente de voir les résultats sur le long terme pour ma famille. »',
    author: 'Femme De Minsup',
    role: 'CLIENTE',
  },
  {
    id: 2,
    quote:
      '« Le sac de ROI POP 25KG a transformé le rendement de nos points de vente. L\'expansion des grains est incomparable et le goût naturel fait revenir nos clients chaque semaine ! »',
    author: 'Christian Mbarga',
    role: 'GESTIONNAIRE DE CINÉMA',
  },
  {
    id: 3,
    quote:
      '« Le CROKS! Caramel au café est une véritable révélation gustative. On sent le vrai maïs et des ingrédients nobles, pas des arômes chimiques. Bravo à toute l\'équipe DU ROI. »',
    author: 'Dr. Laure Kemgang',
    role: 'NUTRITIONNISTE & CLIENTE FIDÈLE',
  },
];
