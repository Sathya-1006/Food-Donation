import { DonationType, FoodType } from '../types';

const foodTypes: FoodType[] = ['prepared', 'produce', 'canned', 'bakery', 'dairy', 'meat', 'other'];
const statuses = ['available', 'claimed', 'pickedUp', 'delivered', 'cancelled'];
const dietaryOptions = ['vegetarian', 'vegan', 'halal', 'kosher', 'gluten-free', 'dairy-free', 'nut-free', 'organic'];
const allergens = ['peanuts', 'tree nuts', 'milk', 'eggs', 'fish', 'shellfish', 'soy', 'wheat', 'sesame'];

const restaurantNames = [
  'Olive Garden', 'Cheesecake Factory', 'Red Lobster', 'Chipotle', 
  'Panera Bread', 'Subway', 'Domino\'s Pizza', 'Whole Foods Market',
  'Trader Joe\'s', 'Fresh Market', 'Local Harvest'
];

const foodNames = [
  'Pasta Primavera', 'Fresh Salad Mix', 'Bread Loaves', 'Vegetable Curry',
  'Rice Pilaf', 'Roasted Vegetables', 'Sandwich Platters', 'Fruit Trays',
  'Pizza', 'Baked Goods', 'Prepared Soups', 'Deli Meats'
];

const addresses = [
  '123 Main St, Springfield, IL', '456 Oak Ave, Riverside, CA',
  '789 Pine Blvd, Lakeside, NY', '321 Maple Dr, Mountain View, CO',
  '654 Elm St, Oceanside, FL', '987 Cedar Ln, Valley City, TX'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

export function generateMockDonations(count = 20): DonationType[] {
  const donations: DonationType[] = [];
  const now = new Date();
  const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const restaurantId = `rest_${i % 5 + 1}`;
    const restaurantName = getRandomElement(restaurantNames);
    const restaurantAddress = getRandomElement(addresses);
    const status = getRandomElement(statuses);
    
    const donation: DonationType = {
      id: `donation_${i + 1}`,
      restaurantId,
      restaurantName,
      restaurantAddress,
      foodName: getRandomElement(foodNames),
      foodType: getRandomElement(foodTypes),
      quantity: `${Math.floor(Math.random() * 10) + 1} ${Math.random() > 0.5 ? 'kg' : 'lbs'}`,
      servings: Math.floor(Math.random() * 20) + 5,
      description: `Leftover food from today's service. Must be picked up by ${new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      expirationTime: generateRandomDate(now, threeDaysLater),
      dietaryInfo: getRandomElements(dietaryOptions, Math.floor(Math.random() * 3)),
      containsAllergens: getRandomElements(allergens, Math.floor(Math.random() * 3)),
      status: status as any,
      createdAt: generateRandomDate(threeDaysAgo, now),
      pickupInstructions: 'Please use the back entrance and call when you arrive.',
      volunteer: status !== 'available' ? {
        id: `vol_${i % 3 + 1}`,
        name: `Volunteer ${i % 3 + 1}`,
      } : null,
      image: `https://source.unsplash.com/random/300x200/?food&sig=${i}`,
    };

    if (status === 'pickedUp' || status === 'delivered') {
      donation.pickupTime = generateRandomDate(new Date(donation.createdAt), now);
    }

    if (status === 'delivered') {
      const pickupTime = new Date(donation.pickupTime!);
      donation.deliveryTime = generateRandomDate(pickupTime, new Date(pickupTime.getTime() + 2 * 60 * 60 * 1000));
    }

    donations.push(donation);
  }

  return donations;
}