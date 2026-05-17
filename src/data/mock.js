export const featuredRooms = [
  {
    id: 'r1',
    name: 'Ocean View Suite',
    type: 'room',
    price: 450,
    description: 'Experience unparalleled luxury with breathtaking ocean views, a king-size bed, and a private balcony.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bookedDates: [
      { start: '2026-05-10', end: '2026-05-15' },
      { start: '2026-05-20', end: '2026-05-25' }
    ]
  },
  {
    id: 'r2',
    name: 'Presidential Penthouse',
    type: 'room',
    price: 1200,
    description: 'Our most exclusive offering featuring 3 bedrooms, a private pool, and 24/7 dedicated butler service.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bookedDates: [
      { start: '2026-05-01', end: '2026-05-05' }
    ]
  },
  {
    id: 'r3',
    name: 'Deluxe City Room',
    type: 'room',
    price: 250,
    description: 'Modern comfort in the heart of the city. Perfect for business travelers or couples on a getaway.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bookedDates: [
      { start: '2026-05-12', end: '2026-05-18' },
      { start: '2026-06-01', end: '2026-06-05' }
    ]
  }
];

export const promotions = [
  {
    id: 'p1',
    name: 'Romantic Dinner for Two',
    type: 'promo',
    price: 150,
    description: 'A 5-course curated meal by our Michelin-star chef with a complementary bottle of champagne.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: 'Couples Spa Retreat',
    type: 'promo',
    price: 200,
    description: '90-minute full body massage followed by private access to the thermal baths.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export const allRooms = [
  ...featuredRooms,
  {
    id: 'r4',
    name: 'Executive Suite',
    type: 'room',
    price: 600,
    description: 'Spacious suite with a separate living area, perfect for extended stays.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bookedDates: [
      { start: '2026-05-08', end: '2026-05-12' }
    ]
  },
  {
    id: 'r5',
    name: 'Family Connected Room',
    type: 'room',
    price: 400,
    description: 'Two interconnected rooms offering privacy for parents and fun for kids.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bookedDates: [
      { start: '2026-05-15', end: '2026-05-20' },
      { start: '2026-06-10', end: '2026-06-15' }
    ]
  },
  {
    id: 'r6',
    name: 'Standard Queen',
    type: 'room',
    price: 180,
    description: 'Affordable luxury with our signature comfort bed and walk-in shower.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bookedDates: []
  }
];

export const diningMenu = [
  {
    id: 'f1',
    name: 'A5 Japanese Wagyu Steak',
    type: 'food',
    price: 180,
    description: 'Perfectly seared 8oz cut of authentic Kobe beef, served with truffle mash and seasonal asparagus.',
    image: 'https://images.unsplash.com/photo-1648977555545-4dd006e30d3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f2',
    name: 'Black Truffle Risotto',
    type: 'food',
    price: 65,
    description: 'Creamy Arborio rice with wild mushrooms, 24-month aged Parmigiano, and fresh shaved black truffles.',
    image: 'https://images.unsplash.com/photo-1602563603373-5d806ff8380c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f3',
    name: 'Beluga Caviar Tasting',
    type: 'food',
    price: 250,
    description: '30g of premium Beluga caviar accompanied by traditional blinis, crème fraîche, and quail eggs.',
    image: 'https://images.unsplash.com/photo-1677758779328-470e2dcfaa00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f4',
    name: 'Pan-Seared Sea Bass',
    type: 'food',
    price: 85,
    description: 'Chilean sea bass over a bed of saffron risotto, topped with a citrus beurre blanc.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f5',
    name: 'Lobster Bisque',
    type: 'food',
    price: 45,
    description: 'Rich and velvety soup with generous chunks of Maine lobster tail, finished with cognac cream.',
    image: 'https://images.unsplash.com/photo-1464093515883-ec948246accb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f6',
    name: 'Valrhona Chocolate Soufflé',
    type: 'food',
    price: 35,
    description: 'Warm, airy chocolate soufflé paired with Madagascar vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];
