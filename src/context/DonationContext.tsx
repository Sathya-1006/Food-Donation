import React, { createContext, useState, useContext, useEffect } from 'react';
import { DonationType, DonationStatus } from '../types';
import { generateMockDonations } from '../utils/mockData';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface DonationContextType {
  donations: DonationType[];
  addDonation: (donation: Omit<DonationType, 'id' | 'status' | 'createdAt'>) => void;
  updateDonationStatus: (id: string, status: DonationStatus, volunteerInfo?: { id: string, name: string }) => void;
  getDonationById: (id: string) => DonationType | undefined;
  getRestaurantDonations: () => DonationType[];
  getVolunteerDonations: () => DonationType[];
  getAvailableDonations: () => DonationType[];
}

const DonationContext = createContext<DonationContextType>({
  donations: [],
  addDonation: () => {},
  updateDonationStatus: () => {},
  getDonationById: () => undefined,
  getRestaurantDonations: () => [],
  getVolunteerDonations: () => [],
  getAvailableDonations: () => [],
});

export const useDonations = () => useContext(DonationContext);

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<DonationType[]>([]);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    // Load initial mock data
    const savedDonations = localStorage.getItem('foodShareDonations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    } else {
      const mockDonations = generateMockDonations();
      setDonations(mockDonations);
      localStorage.setItem('foodShareDonations', JSON.stringify(mockDonations));
    }
  }, []);

  // Save donations to localStorage whenever they change
  useEffect(() => {
    if (donations.length > 0) {
      localStorage.setItem('foodShareDonations', JSON.stringify(donations));
    }
  }, [donations]);

  const addDonation = (donation: Omit<DonationType, 'id' | 'status' | 'createdAt'>) => {
    const newDonation: DonationType = {
      ...donation,
      id: Date.now().toString(),
      status: 'available',
      createdAt: new Date().toISOString(),
      volunteer: null,
    };

    setDonations((prevDonations) => [...prevDonations, newDonation]);
    showToast('Donation added successfully!', 'success');
  };

  const updateDonationStatus = (id: string, status: DonationStatus, volunteerInfo?: { id: string, name: string }) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) => {
        if (donation.id === id) {
          return {
            ...donation,
            status,
            volunteer: status === 'available' ? null : volunteerInfo || donation.volunteer,
            ...(status === 'pickedUp' ? { pickupTime: new Date().toISOString() } : {}),
            ...(status === 'delivered' ? { deliveryTime: new Date().toISOString() } : {}),
          };
        }
        return donation;
      })
    );

    const statusMessages = {
      available: 'Donation is now available',
      claimed: 'Donation has been claimed',
      pickedUp: 'Food has been picked up',
      delivered: 'Food has been delivered successfully',
      cancelled: 'Donation has been cancelled',
    };

    showToast(statusMessages[status], 'success');
  };

  const getDonationById = (id: string) => {
    return donations.find((donation) => donation.id === id);
  };

  const getRestaurantDonations = () => {
    if (!user || user.type !== 'restaurant') return [];
    return donations.filter((donation) => donation.restaurantId === user.id);
  };

  const getVolunteerDonations = () => {
    if (!user || user.type !== 'volunteer') return [];
    return donations.filter((donation) => donation.volunteer?.id === user.id);
  };

  const getAvailableDonations = () => {
    return donations.filter((donation) => donation.status === 'available');
  };

  return (
    <DonationContext.Provider
      value={{
        donations,
        addDonation,
        updateDonationStatus,
        getDonationById,
        getRestaurantDonations,
        getVolunteerDonations,
        getAvailableDonations,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};