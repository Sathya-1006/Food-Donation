import React, { useState } from 'react';
import { Clock, MapPin, FileEdit, Users, Tag, AlertCircle } from 'lucide-react';
import { DonationType, FoodType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

interface DonationFormProps {
  onSubmit: (donation: Omit<DonationType, 'id' | 'status' | 'createdAt'>) => void;
  initialData?: Partial<DonationType>;
}

const foodTypeOptions: FoodType[] = ['prepared', 'produce', 'canned', 'bakery', 'dairy', 'meat', 'other'];
const dietaryOptions = ['vegetarian', 'vegan', 'halal', 'kosher', 'gluten-free', 'dairy-free', 'nut-free', 'organic'];
const allergenOptions = ['peanuts', 'tree nuts', 'milk', 'eggs', 'fish', 'shellfish', 'soy', 'wheat', 'sesame'];

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit, initialData = {} }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    foodName: initialData.foodName || '',
    foodType: initialData.foodType || 'prepared',
    quantity: initialData.quantity || '',
    servings: initialData.servings || 1,
    description: initialData.description || '',
    expirationTime: initialData.expirationTime 
      ? new Date(initialData.expirationTime).toISOString().slice(0, 16) 
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    dietaryInfo: initialData.dietaryInfo || [],
    containsAllergens: initialData.containsAllergens || [],
    pickupInstructions: initialData.pickupInstructions || '',
    image: initialData.image || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, array: string) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [array]: checked
        ? [...prev[array as keyof typeof prev] as string[], value]
        : (prev[array as keyof typeof prev] as string[]).filter((item) => item !== value),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.foodName.trim()) {
      newErrors.foodName = 'Food name is required';
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    }
    
    if (formData.servings < 1) {
      newErrors.servings = 'Must have at least 1 serving';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.expirationTime) {
      newErrors.expirationTime = 'Expiration time is required';
    } else {
      const expirationDate = new Date(formData.expirationTime);
      if (expirationDate <= new Date()) {
        newErrors.expirationTime = 'Expiration time must be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Construct the donation object
    const donationData = {
      ...formData,
      restaurantId: user?.id || '',
      restaurantName: user?.name || '',
      restaurantAddress: user?.address || '',
      volunteer: null,
      expirationTime: new Date(formData.expirationTime).toISOString(),
    };
    
    onSubmit(donationData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please ensure all food items comply with food safety regulations and are properly stored and packaged.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
            Food Name*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileEdit className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-md border ${
                errors.foodName ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
              placeholder="e.g., Pasta Primavera"
            />
          </div>
          {errors.foodName && <p className="mt-1 text-sm text-red-600">{errors.foodName}</p>}
        </div>

        <div>
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-1">
            Food Type*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="foodType"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              {foodTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity*
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.quantity ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
            placeholder="e.g., 5 lbs, 2 trays, 10 portions"
          />
          {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
        </div>

        <div>
          <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Servings*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="servings"
              name="servings"
              min="1"
              value={formData.servings}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-md border ${
                errors.servings ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
            />
          </div>
          {errors.servings && <p className="mt-1 text-sm text-red-600">{errors.servings}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
            placeholder="Provide details about the food, including how it was prepared and stored"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="expirationTime" className="block text-sm font-medium text-gray-700 mb-1">
            Expiration Time*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              id="expirationTime"
              name="expirationTime"
              value={formData.expirationTime}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-md border ${
                errors.expirationTime ? 'border-red-300' : 'border-gray-300'
              } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
            />
          </div>
          {errors.expirationTime && <p className="mt-1 text-sm text-red-600">{errors.expirationTime}</p>}
        </div>

        <div>
          <label htmlFor="pickupInstructions" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Instructions
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="pickupInstructions"
              name="pickupInstructions"
              value={formData.pickupInstructions}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="e.g., Use back entrance, call when arriving"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-1">Dietary Information</legend>
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`dietary-${option}`}
                    name={`dietary-${option}`}
                    type="checkbox"
                    value={option}
                    checked={formData.dietaryInfo.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'dietaryInfo')}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor={`dietary-${option}`} className="ml-2 block text-sm text-gray-700 capitalize">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-1">Contains Allergens</legend>
            <div className="grid grid-cols-2 gap-2">
              {allergenOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    id={`allergen-${option}`}
                    name={`allergen-${option}`}
                    type="checkbox"
                    value={option}
                    checked={formData.containsAllergens.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'containsAllergens')}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor={`allergen-${option}`} className="ml-2 block text-sm text-gray-700 capitalize">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Submit Donation</Button>
      </div>
    </form>
  );
};

export default DonationForm;