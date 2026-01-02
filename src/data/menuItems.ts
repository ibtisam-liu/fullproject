import { MenuItem } from '@/contexts/CartContext';
import classicBurgerImg from '@/assets/classic-burger.jpg';
import cheeseBurgerImg from '@/assets/cheese-burger.jpg';
import margheritaPizzaImg from '@/assets/margherita-pizza.jpg';
import pepperoniPizzaImg from '@/assets/pepperoni-pizza.jpg';
import carbonaraPastaImg from '@/assets/carbonara-pasta.jpg';
import bolognesePastaImg from '@/assets/bolognese-pasta.jpg';
import caesarSaladImg from '@/assets/caesar-salad.jpg';
import greekSaladImg from '@/assets/greek-salad.jpg';
import chocolateCakeImg from '@/assets/chocolate-cake.jpg';
import tiramisuImg from '@/assets/tiramisu.jpg';
import tropicalSmoothieImg from '@/assets/tropical-smoothie.jpg';
import freshLemonadeImg from '@/assets/fresh-lemonade.jpg';

export const menuItems: MenuItem[] = [
  // Burgers (2 items)
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce on a sesame seed bun',
    price: 12.99,
    image: classicBurgerImg,
    category: 'Main Course',
  },
  {
    id: '2',
    name: 'Cheese Burger',
    description: 'Double beef patty with melted cheddar cheese, crispy bacon, and our signature sauce',
    price: 14.99,
    image: cheeseBurgerImg,
    category: 'Main Course',
  },

  // Pizzas (2 items)
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Traditional wood-fired pizza with fresh mozzarella, basil, and tomato sauce',
    price: 16.99,
    image: margheritaPizzaImg,
    category: 'Main Course',
  },
  {
    id: '4',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza with premium mozzarella cheese and tangy tomato sauce',
    price: 17.99,
    image: pepperoniPizzaImg,
    category: 'Main Course',
  },

  // Pasta (2 items)
  {
    id: '5',
    name: 'Carbonara',
    description: 'Creamy pasta with crispy bacon, parmesan cheese, and black pepper',
    price: 15.99,
    image: carbonaraPastaImg,
    category: 'Main Course',
  },
  {
    id: '6',
    name: 'Bolognese',
    description: 'Rich meat sauce with spaghetti and fresh parmesan cheese',
    price: 16.49,
    image: bolognesePastaImg,
    category: 'Main Course',
  },

  // Salads (2 items)
  {
    id: '7',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with grilled chicken, parmesan shavings, and homemade Caesar dressing',
    price: 10.99,
    image: caesarSaladImg,
    category: 'Salads',
  },
  {
    id: '8',
    name: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese, olives, and authentic Greek dressing',
    price: 11.49,
    image: greekSaladImg,
    category: 'Salads',
  },

  // Desserts (2 items)
  {
    id: '9',
    name: 'Chocolate Cake',
    description: 'Decadent chocolate layer cake with rich frosting and fresh berries',
    price: 8.99,
    image: chocolateCakeImg,
    category: 'Desserts',
  },
  {
    id: '10',
    name: 'Tiramisu',
    description: 'Classic Italian coffee-flavored dessert with mascarpone cream and cocoa powder',
    price: 9.49,
    image: tiramisuImg,
    category: 'Desserts',
  },

  // Beverages (2 items)
  {
    id: '11',
    name: 'Tropical Smoothie',
    description: 'Refreshing blend of mango, pineapple, and coconut with a tropical twist',
    price: 5.99,
    image: tropicalSmoothieImg,
    category: 'Beverages',
  },
  {
    id: '12',
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh lemon juice, mint leaves, and ice',
    price: 4.99,
    image: freshLemonadeImg,
    category: 'Beverages',
  },
];
