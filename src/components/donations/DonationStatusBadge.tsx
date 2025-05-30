import React from 'react';
import { DonationStatus } from '../../types';

interface DonationStatusBadgeProps {
  status: DonationStatus;
  size?: 'sm' | 'md' | 'lg';
}

const DonationStatusBadge: React.FC<DonationStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusColors = () => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'claimed':
        return 'bg-blue-100 text-blue-800';
      case 'pickedUp':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'claimed':
        return 'Claimed';
      case 'pickedUp':
        return 'Picked Up';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${getStatusColors()} ${sizeClasses[size]}`}
    >
      {getStatusText()}
    </span>
  );
};

export default DonationStatusBadge;