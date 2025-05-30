export type UserType = {
  id: string;
  name: string;
  email: string;
  type: 'restaurant' | 'volunteer';
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profileImage?: string;
};

export type RestaurantType = UserType & {
  type: 'restaurant';
  restaurantName: string;
  description?: string;
};

export type VolunteerType = UserType & {
  type: 'volunteer';
};

export type FoodType = 'prepared' | 'produce' | 'canned' | 'bakery' | 'dairy' | 'meat' | 'other';

export type DonationStatus = 'available' | 'claimed' | 'pickedUp' | 'delivered' | 'cancelled';

export type DonationType = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  foodName: string;
  foodType: FoodType;
  quantity: string;
  servings: number;
  description: string;
  expirationTime: string;
  dietaryInfo: string[];
  containsAllergens: string[];
  status: DonationStatus;
  createdAt: string;
  pickupInstructions?: string;
  pickupTime?: string;
  deliveryTime?: string;
  volunteer: {
    id: string;
    name: string;
  } | null;
  image?: string;
};