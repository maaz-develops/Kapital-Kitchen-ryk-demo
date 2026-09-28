import heroAmbiance from '../assets/images/hero_restaurant_ambiance_1790432565003.jpg';
import burgerImg from '../assets/images/dish_smash_burger_1790432584127.jpg';
import steakImg from '../assets/images/dish_charcoal_steak_1790432597387.jpg';
import pizzaImg from '../assets/images/dish_artisan_pizza_1790432610272.jpg';
import friesImg from '../assets/images/dish_loaded_fries_1790432627838.jpg';
import dessertImg from '../assets/images/dish_molten_dessert_1790432644141.jpg';

export interface DishItem {
  id: string;
  number: string;
  name: string;
  category: string;
  categoryNumber: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  accent: string;
  prepTime: string;
}

export const SIGNATURE_DISHES: DishItem[] = [
  {
    id: 'smash-burger',
    number: '01',
    name: 'KAPITAL SMASH',
    category: 'BURGERS',
    categoryNumber: '04',
    description: 'Double custom-grind Angus beef patties smashed crispy on cast iron, blanketed in double aged Wisconsin cheddar, house caramelized sweet onion jam, dill pickles, and signature smoky Kapital emulsion on butter-toasted sesame brioche.',
    price: 'PKR 1,150',
    tags: ['House Signature', 'Double Patty', 'Aged Cheddar'],
    image: burgerImg,
    accent: '#EAB308',
    prepTime: '14 MINS',
  },
  {
    id: 'charcoal-ribeye',
    number: '02',
    name: 'CHARCOAL RIBEYE',
    category: 'STEAKHOUSE',
    categoryNumber: '02',
    description: 'Prime cut 350g tender ribeye seared over live hardwood charcoal coals, basted continuously with rosemary-infused whipped garlic compound butter, served with roasted garlic bulb and coarse Maldon sea salt flakes.',
    price: 'PKR 3,250',
    tags: ['Hardwood Charred', 'Prime Cut', 'Herb Basted'],
    image: steakImg,
    accent: '#F59E0B',
    prepTime: '22 MINS',
  },
  {
    id: 'artisan-pizza',
    number: '03',
    name: 'BUFFALO RUSTICA',
    category: 'PIZZA',
    categoryNumber: '05',
    description: '72-hour cold-fermented dough hand-stretched and baked at 480°C until blistered, San Marzano DOP reduction, fresh creamy buffalo mozzarella, torn sweet basil leaves, and raw unfiltered cold-pressed olive oil drizzle.',
    price: 'PKR 1,750',
    tags: ['Woodfired 480°C', '72hr Ferment', 'San Marzano'],
    image: pizzaImg,
    accent: '#EF4444',
    prepTime: '12 MINS',
  },
  {
    id: 'mexican-fries',
    number: '04',
    name: 'LOADED MEXICAN FRIES',
    category: 'STARTERS',
    categoryNumber: '01',
    description: 'Hand-cut triple-blanched Russet potato crisps tossed in smoked paprika cumin dust, smothered in molten cheddar fondue, spicy Mexican ground chili, pickled jalapeño coins, garlic crema, and garden cilantro.',
    price: 'PKR 890',
    tags: ['Triple Blanched', 'Molten Fondue', 'Spiced Beef'],
    image: friesImg,
    accent: '#FBBF24',
    prepTime: '10 MINS',
  },
  {
    id: 'molten-lava',
    number: '05',
    name: 'GOLD MOLTEN LAVA',
    category: 'DESSERTS',
    categoryNumber: '07',
    description: 'Warm Valrhona 70% dark cocoa sponge with an erupting molten chocolate core, dusted with French cocoa powder and 24K edible gold flake, paired with cold-churned Madagascar vanilla bean gelato.',
    price: 'PKR 980',
    tags: ['Valrhona 70%', 'Liquid Core', 'Madagascar Vanilla'],
    image: dessertImg,
    accent: '#F59E0B',
    prepTime: '15 MINS',
  },
];

export const MENU_CATEGORIES = [
  {
    id: 'starters',
    number: '01',
    title: 'STARTERS',
    tagline: 'High-Impact Openers',
    image: friesImg,
    items: [
      { name: 'Loaded Mexican Fries', price: 'PKR 890', desc: 'Molten cheddar, spiced beef, pickled jalapeño coins' },
      { name: 'Buffalo Crispy Tenders', price: 'PKR 950', desc: 'Hand-dredged chicken strips tossed in spicy cayenne glaze' },
      { name: 'Dynamite Golden Prawns', price: 'PKR 1,450', desc: 'Crispy tempura tiger prawns glazed in creamy chili aioli' },
      { name: 'Truffle Parmesan Wedges', price: 'PKR 790', desc: 'Hand-cut skin-on wedges with black truffle oil and 24-mo Reggiano' },
    ],
  },
  {
    id: 'mains',
    number: '02',
    title: 'MAIN COURSE',
    tagline: 'Prime Steaks & Cuts',
    image: steakImg,
    items: [
      { name: 'Charcoal Prime Ribeye (350g)', price: 'PKR 3,250', desc: 'Seared on coals with rosemary garlic butter & sea salt flakes' },
      { name: 'Peppercorn Tenderloin (300g)', price: 'PKR 2,950', desc: 'Cracked Madagascar peppercorn cream glaze with mashed potato' },
      { name: 'Herb Butter Sirloin (320g)', price: 'PKR 2,800', desc: 'Charred medium-rare with grilled asparagus and demi-glace' },
      { name: 'Stuffed Chicken Supreme', price: 'PKR 1,650', desc: 'Spinach and smoked mozzarella stuffing with sun-dried tomato sauce' },
    ],
  },
  {
    id: 'bbq',
    number: '03',
    title: 'BBQ & GRILL',
    tagline: 'Smoky Charcoal Fire',
    image: steakImg,
    items: [
      { name: 'Spicy Buffalo Wrap', price: 'PKR 850', desc: 'Tender buffalo glazed chicken, crisp lettuce, garlic ranch in flatbread' },
      { name: 'Charcoal Malai Boti (8 Pcs)', price: 'PKR 1,290', desc: 'Velvety marinated boneless chicken skewers smoked over wood coals' },
      { name: 'Signature Beef Seekh Kabab', price: 'PKR 1,150', desc: 'Coarse hand-minced beef seasoned with crushed cumin and green chilies' },
      { name: 'Grilled Peri-Peri Chicken', price: 'PKR 1,550', desc: 'Half chicken marinated in bird\'s eye chili glaze with charred lemon' },
    ],
  },
  {
    id: 'burgers',
    number: '04',
    title: 'BURGERS',
    tagline: 'Artisan Smash & Buns',
    image: burgerImg,
    items: [
      { name: 'Kapital Double Smash', price: 'PKR 1,150', desc: 'Two Angus patties, double aged cheddar, onion jam, brioche' },
      { name: 'Smoky Jalapeno Fire Burger', price: 'PKR 1,250', desc: 'Pepper jack, grilled bacon, fried jalapeño wheels, chipotle drizzle' },
      { name: 'Crispy Clucker Supreme', price: 'PKR 980', desc: 'Buttermilk fried chicken breast, sweet honey mustard slaw' },
      { name: 'Truffle Mushroom Melt', price: 'PKR 1,350', desc: 'Sauteed portobello mushrooms, Swiss Gruyere, black garlic mayo' },
    ],
  },
  {
    id: 'pizza',
    number: '05',
    title: 'PIZZA',
    tagline: '480°C Blistered Crusts',
    image: pizzaImg,
    items: [
      { name: 'Buffalo Rustica Margherita', price: 'PKR 1,750', desc: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, EVOO' },
      { name: 'Spicy Pepperoni Diablo', price: 'PKR 1,950', desc: 'Double cup-and-char beef pepperoni, hot honey drizzle, chili oil' },
      { name: 'Smoky BBQ Chicken Flat', price: 'PKR 1,850', desc: 'Charcoal chicken chunks, red onion, smoky BBQ reduction, cilantro' },
      { name: 'Four Cheese Bianca', price: 'PKR 1,900', desc: 'Fontina, Gorgonzola, aged mozzarella, ricotta, roasted garlic' },
    ],
  },
  {
    id: 'pasta',
    number: '06',
    title: 'PASTA',
    tagline: 'Handmade Italian Sauces',
    image: pizzaImg,
    items: [
      { name: 'Fettuccine Truffle Alfredo', price: 'PKR 1,450', desc: 'Heavy cream, aged Parmigiano Reggiano, shaved truffles' },
      { name: 'Spicy Cajun Penne', price: 'PKR 1,350', desc: 'Grilled chicken, bell peppers, smoky cajun cream, scallions' },
      { name: 'Rigatoni Bolognese', price: 'PKR 1,550', desc: 'Slow-simmered beef ragù, San Marzano tomatoes, fresh oregano' },
      { name: 'Penne Arrabbiata', price: 'PKR 1,150', desc: 'Crushed garlic, fiery red chilies, cherry tomatoes, fresh parsley' },
    ],
  },
  {
    id: 'desserts',
    number: '07',
    title: 'DESSERTS',
    tagline: 'Sweet Valediction',
    image: dessertImg,
    items: [
      { name: 'Gold Molten Lava Cake', price: 'PKR 980', desc: 'Valrhona 70% dark chocolate core with Madagascar vanilla gelato' },
      { name: 'Lotus Biscoff Cheesecake', price: 'PKR 850', desc: 'New York style baked cheesecake topped with caramelized Lotus spread' },
      { name: 'Sizzling Fudge Brownie Skillet', price: 'PKR 920', desc: 'Hot cast iron skillet brownie, hot fudge fountain, vanilla scoop' },
      { name: 'Artisan Mint Cold Brew', price: 'PKR 550', desc: 'Single-origin espresso steeped for 18 hours with fresh garden mint' },
    ],
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'THE EVENING AMBIANCE',
    subtitle: 'Modal Town, Rahim Yar Khan',
    aspect: 'aspect-[16/9]',
    category: 'ATMOSPHERE',
    image: heroAmbiance,
    quote: 'Cozy corners and warm architectural lines.',
  },
  {
    id: 'gal-2',
    title: 'THE KAPITAL SMASH',
    subtitle: 'Crispy edges & molten cheddar',
    aspect: 'aspect-[4/5]',
    category: 'CULINARY',
    image: burgerImg,
    quote: 'Crafted without shortcuts.',
  },
  {
    id: 'gal-3',
    title: 'WOODFIRED 480°C',
    subtitle: 'Blistered crust perfection',
    aspect: 'aspect-[1/1]',
    category: 'KITCHEN CRAFT',
    image: pizzaImg,
    quote: '72-hour naturally fermented dough.',
  },
  {
    id: 'gal-4',
    title: 'LIVE HARDWOOD COALS',
    subtitle: '350g Prime Cut Ribeye',
    aspect: 'aspect-[4/3]',
    category: 'FIRE & SMOKE',
    image: steakImg,
    quote: 'Sizzling heat and compound herb butter.',
  },
  {
    id: 'gal-5',
    title: 'MEXICAN SPICED CRUNCH',
    subtitle: 'Loaded triple-cooked fries',
    aspect: 'aspect-[4/5]',
    category: 'STARTERS',
    image: friesImg,
    quote: 'The city\'s favorite loaded box.',
  },
  {
    id: 'gal-6',
    title: 'DECADENT VOLCANO',
    subtitle: 'Valrhona chocolate eruption',
    aspect: 'aspect-[16/9]',
    category: 'FINALE',
    image: dessertImg,
    quote: 'Pure decadence on a black ceramic slate.',
  },
];

export const RESTAURANT_INFO = {
  brand: 'KAPITAL KITCHEN',
  tagline: 'GOOD FOOD. GOOD MOOD.',
  city: 'RAHIM YAR KHAN',
  area: 'Modal Town / City Park',
  plusCode: 'C8F6+9MF',
  fullAddress: 'C8F6+9MF, Modal Town, Rahim Yar Khan, Punjab 64200, Pakistan',
  phone: '+92 335 7357355',
  phoneDisplay: '0335 7357355',
  openingHours: 'Mon — Sun: 12:00 PM – 01:00 AM',
  kitchenClose: 'Last kitchen order at 12:30 AM',
  concept: 'Steakhouse · Artisan Burgers · Woodfired Pizza · Cafe & Fine Dining',
  instagram: '@kapitalkitchenryk',
  facebook: 'Kapital Kitchen RYK',
};
