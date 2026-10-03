export interface Product {
  id: string;
  name: string;
  brand?: string;
  category?: string;
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
    id: 'roi-pop-sac-eco-40',
    name: 'ROI POP — Sac Économique 40 PQTS',
    brand: 'Du ROI',
    category: 'Gros Volume',
    tagline: 'Sac économique contenant 40 sachets individuels prêts à la vente. Idéal revendeurs.',
    description:
      'Contient 40 sachets individuels prêts à la vente. Maïs de qualité supérieure 100% naturel reconditionné et distribué à Yaoundé par SWIRABA SARL.',
    longDescription:
      'Le format économique par excellence pour les boutiques, alimentations, dépôts et revendeurs : ce grand sac de transport à poignée contient 40 sachets individuels de ROI POP 100% Naturel prêts à être vendus au détail. Maïs de qualité supérieure, reconditionné et distribué au Cameroun par SWIRABA SARL (BP:11729 Yaoundé, Mail: claudeken77@gmail.com). Production : Avril 2026 | Péremption : Avril 2028.',
    price: '12 000 FCFA',
    priceNumeric: 12000,
    weight: 'Sac de 40 sachets (40 PQTS)',
    image: '/images/roi-pop-sac-eco-40pqts.png',
    originalUpload: '/images/roi-pop-sac-eco-40pqts.png',
    badge: 'Pack Revendeur 40 PQTS',
    nutrition: {
      calories: '380 kcal / 100g',
      fibers: '12.8 g',
      proteins: '8.2 g',
      lipids: '7.5 g',
      origin: 'Reconditionné et distribué au Cameroun par SWIRABA SARL • BP: 11729 Yaoundé',
    },
    ingredients: [
      '40 sachets individuels de maïs soufflé 100% naturel',
      'Huile végétale de première pression',
      'Sel minéral naturel',
    ],
    benefits: [
      'Contient 40 sachets individuels prêts à la vente au détail',
      'Idéal pour boutiques, alimentations, cantines et revendeurs',
      'Production : Avril 2026 | Péremption : Avril 2028 (conservation 24 mois)',
      'Grand sac étanche avec poignée ergonomique découpée',
    ],
  },
  {
    id: 'roi-pop-25kg',
    name: 'ROI POP 25KG',
    brand: 'Du ROI',
    category: 'Gros Volume',
    tagline: 'Maïs local camerounais sélectionné pour professionnels, riche en fibres et expansion maximale.',
    description: 'Maïs local camerounais sélectionné pour professionnels, riche en fibres et expansion maximale.',
    longDescription:
      'Grains de maïs de qualité supérieure issus de cultures locales camerounaises rigoureusement sélectionnées pour leur pouvoir d\'expansion d\'exception (44-46+). Conditionnement grand format 25 kg destiné aux professionnels, cinémas, forains, revendeurs et familles. Fabriqué et conditionné à Yaoundé, Cameroun par DU ROI.',
    price: '45 000 FCFA',
    priceNumeric: 45000,
    weight: 'Sac de 25 KG',
    image: '/images/roi-pop-25kg.png',
    originalUpload: '/images/roi-pop-25kg.png',
    badge: 'Maïs Local Camerounais',
    nutrition: {
      calories: '365 kcal / 100g',
      fibers: '14.5 g',
      proteins: '9.4 g',
      lipids: '4.7 g',
      origin: 'Fabriqué à Yaoundé, Cameroun • Maïs local sélectionné',
    },
    ingredients: ['100% Grains de maïs jaune local sélectionnés pour popcorn (Zea mays everta)'],
    benefits: [
      'Taux d\'éclatement supérieur à 98%',
      '100% Maïs local camerounais, zéro OGM, zéro conservateur',
      'Riche en polyphénols antioxydants et fibres digestives',
      'Sac polypropylène tressé haute résistance contre l\'humidité',
    ],
  },
  {
    id: 'croks-caramel',
    name: 'CROKS! Caramel au café',
    brand: 'Du ROI',
    category: 'Snacks',
    tagline: 'Snack gourmand au maïs local soufflé à Yaoundé, caramel cuit au chaudron et café torréfié.',
    description: 'Snack gourmand au maïs local soufflé à Yaoundé, caramel cuit au chaudron et café torréfié.',
    longDescription:
      'Une gourmandise 100% camerounaise signée DU ROI : l\'alliance croustillante du maïs local soufflé artisanalement dans nos ateliers de Yaoundé avec un enrobage généreux de caramel cuit au chaudron et délicatement infusé au café d\'exception.',
    price: '1 500 FCFA',
    priceNumeric: 1500,
    weight: 'Sachet 150g',
    image: '/images/croks-caramel-cafe.png',
    originalUpload: '/images/croks-caramel-cafe.png',
    badge: 'Fabriqué à Yaoundé',
    nutrition: {
      calories: '440 kcal / 100g',
      fibers: '6.2 g',
      proteins: '4.8 g',
      lipids: '12.0 g',
      origin: 'Ateliers DU ROI - Yaoundé, Cameroun',
    },
    ingredients: [
      'Maïs local camerounais soufflé croustillant',
      'Caramel artisanal pur beurre',
      'Infusion de café arabica torréfié',
      'Pointe de sel fin marin',
    ],
    benefits: [
      'Maïs local sélectionné et soufflé à Yaoundé',
      'Sachet hermétique conservant le croustillant absolu',
      'Sans conservateurs ni arômes artificiels',
    ],
  },
  {
    id: 'roi-pop-naturel',
    name: 'ROI POP 100% Naturel',
    brand: 'Du ROI',
    category: 'Snacks',
    tagline: 'Popcorn 100% naturel au maïs local du Cameroun, croustillant et léger, prêt à déguster.',
    description: 'Popcorn 100% naturel au maïs local du Cameroun, croustillant et léger, prêt à déguster.',
    longDescription:
      'Le popcorn prêt à consommer par excellence. Éclaté délicatement à air pulsé dans nos ateliers de Yaoundé avec du maïs local camerounais de premier choix. Zéro additif chimique, saveur authentique.',
    price: '1 000 FCFA',
    priceNumeric: 1000,
    weight: 'Sachet 100g',
    image: '/images/roi-pop-100-naturel-premium.png',
    originalUpload: '/images/roi-pop-100-naturel-premium.png',
    badge: '100% Camerounais',
    nutrition: {
      calories: '380 kcal / 100g',
      fibers: '12.8 g',
      proteins: '8.2 g',
      lipids: '7.5 g',
      origin: 'Fabriqué à Yaoundé, Cameroun • Maïs local sélectionné',
    },
    ingredients: [
      'Maïs local camerounais 100% naturel',
      'Huile végétale de première pression',
      'Sel minéral naturel',
    ],
    benefits: [
      'Maïs cultivé au Cameroun et transformé à Yaoundé',
      'Snack sain et léger pour toute la famille',
      'Riche en fibres, naturellement sans gluten',
    ],
  },
  {
    id: 'noix-muscade',
    name: 'NOIX DE MUSCADE En Poudre',
    brand: 'Du ROI',
    category: 'Épices',
    tagline: 'Noix de muscade en poudre pure, sans sel, sans sucre. Sélection DU ROI Yaoundé.',
    description:
      'Noix de muscade en poudre pure, sans sel, sans sucre. Parfait pour assaisonner vos plats, desserts et boissons chaudes.',
    longDescription:
      'Noix de muscade en poudre 100% naturelle sélectionnée et conditionnée à Yaoundé par DU ROI. Moulue finement à froid pour conserver toute l\'intensité de ses huiles essentielles aromatiques et ses vertus digestives. Sans conservateur, sans sel ajouté et sans sucre.',
    price: '1 200 FCFA',
    priceNumeric: 1200,
    weight: 'Sachet 50g',
    image: '/images/noix-de-muscade-en-poudre.png',
    originalUpload: '/images/noix-de-muscade-en-poudre.png',
    badge: 'Marque 100% Camerounaise',
    nutrition: {
      calories: '525 kcal / 100g',
      fibers: '20.8 g',
      proteins: '5.8 g',
      lipids: '36.3 g',
      origin: 'Ateliers DU ROI - Yaoundé, Cameroun',
    },
    ingredients: ['100% Noix de muscade pure en poudre (Myristica fragrans)'],
    benefits: [
      'Pureté absolue : Sans sel, sans sucre, sans conservateur',
      'Arôme chaud, subtil et boisé inimitable',
      'Aide digestive naturelle et propriétés apaisantes',
      'Conditionné à Yaoundé dans un sachet fraîcheur hermétique',
    ],
  },
  {
    id: 'du-roi-huile-30ml',
    name: "DU ROI À l'huile végétale",
    brand: 'Du ROI',
    category: 'Huiles',
    tagline: 'Assaisonnement de qualité supérieure pour éclater et sublimer le maïs local.',
    description: 'Assaisonnement de qualité supérieure à l\'huile végétale, arôme délicieux pour vos préparations.',
    longDescription:
      'Le sachet doseur 30 ml DU ROI formulé pour la cuisson idéale du maïs local. Permet d\'obtenir des popcorns dorés et ultra croustillants sans altérer les propriétés nutritives du grain.',
    price: '500 FCFA',
    priceNumeric: 500,
    weight: 'Sachet 30 ml',
    image: '/images/du-roi-huile-30ml.png',
    originalUpload: '/images/du-roi-huile-30ml.png',
    badge: '100% Camerounais',
    nutrition: {
      calories: '820 kcal / 100ml',
      fibers: '0 g',
      proteins: '0.1 g',
      lipids: '91.5 g',
      origin: 'Ateliers DU ROI - Yaoundé, Cameroun',
    },
    ingredients: [
      'Huiles végétales raffinées de qualité supérieure',
      'Extraits naturels aromatiques',
      'Vitamine E antioxydante',
    ],
    benefits: [
      'Format individuel pratique et hermétique 30 ml',
      'Point de fumée élevé idéal pour éclater le maïs sans brûler',
      'Formulé pour révéler le goût naturel du maïs local',
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
    title: 'Récolte locale au Cameroun',
    description:
      'Récolte soignée dans les bassins agricoles du Cameroun lorsque les épis de maïs atteignent leur pleine maturité, garantissant une concentration nutritionnelle maximale.',
    image: '/images/corn-harvest.png',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Tri & Contrôle à Yaoundé',
    description:
      'Sélection et nettoyage méticuleux de chaque grain dans notre unité de Yaoundé pour maintenir les normes d\'hygiène et de pureté les plus strictes.',
    image: '/images/corn-harvest.png',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Transformation artisanale',
    description:
      'Transformation artisanale en croks, farine ou popcorn de qualité supérieure à l\'aide de techniques préservant les composés bénéfiques naturels du maïs local.',
    image: '/images/roi-pop-100-naturel-premium.png',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Conditionnement & Distribution SWIRABA',
    description:
      'Mise en sachets individuels et conditionnement en sacs économiques de 40 paquets (SWIRABA SARL Yaoundé), prêts pour la vente rapide dans tout le Cameroun.',
    image: '/images/roi-pop-sac-eco-40pqts.png',
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
      '« Le Sac Économique de 40 paquets ROI POP est une bénédiction pour notre alimentation à Yaoundé. Les 40 sachets individuels partent à une vitesse folle auprès des écoliers et des familles, et la marge revendeur est excellente ! »',
    author: 'Mama Jeanne Ngo',
    role: 'PROPRIÉTAIRE D\'ALIMENTATION • YAOUNDÉ (MOKOLO)',
  },
  {
    id: 2,
    quote:
      '« Des produits 100% de chez nous, faits avec notre propre maïs camerounais ! Le goût de ROI POP et CROKS est authentique, ma famille adore et nous soutenons fièrement la production locale. »',
    author: 'Femme De Minsup',
    role: 'CLIENTE À YAOUNDÉ',
  },
  {
    id: 3,
    quote:
      '« Le sac de ROI POP 25KG et les packs 40 PQTS distribués par SWIRABA SARL ont transformé le rendement de nos points de vente à Douala. L\'expansion du maïs local est tout simplement spectaculaire. »',
    author: 'Christian Mbarga',
    role: 'GESTIONNAIRE DE CINÉMA • DOUALA',
  },
];
