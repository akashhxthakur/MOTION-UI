export interface DemoProduct {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  promo?: boolean;
  emoji: string;
}

export interface DemoCategory {
  id: string;
  name: string;
  emoji: string;
}

export const DEMO_CATEGORIES: DemoCategory[] = [
  { id: 'all', name: 'All', emoji: '✦' },
  { id: 'produce', name: 'Fresh', emoji: '🥬' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
];

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: '1',
    name: 'Organic Avocado',
    price: 4.99,
    categoryId: 'produce',
    emoji: '🥑',
    promo: true,
  },
  { id: '2', name: 'Sourdough Loaf', price: 6.5, categoryId: 'produce', emoji: '🍞' },
  { id: '3', name: 'Greek Yogurt', price: 3.25, categoryId: 'dairy', emoji: '🥛' },
  { id: '4', name: 'Almond Milk', price: 5.49, categoryId: 'dairy', emoji: '🌰', promo: true },
  { id: '5', name: 'Trail Mix', price: 7.99, categoryId: 'snacks', emoji: '🥜' },
  { id: '6', name: 'Cold Brew', price: 4.5, categoryId: 'drinks', emoji: '☕' },
];
