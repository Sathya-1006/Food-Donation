import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Tag } from 'lucide-react';
import { DonationType } from '../../types';
import Card from '../ui/Card';
import DonationStatusBadge from './DonationStatusBadge';
import { formatTimeAgo, formatExpiryTime } from '../../utils/dateUtils';

interface DonationCardProps {
  donation: DonationType;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <Link to={`/donation/${donation.id}`} className="block h-full">
        <div className="relative aspect-video bg-gray-200 overflow-hidden">
          {donation.image ? (
            <img 
              src={donation.image} 
              alt={donation.foodName} 
              className="w-full h-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <DonationStatusBadge status={donation.status} />
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{donation.foodName}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{donation.restaurantName}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Users className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{donation.servings} servings</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Tag className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="capitalize">{donation.foodType}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>
              {donation.status === 'available' 
                ? `Expires ${formatExpiryTime(donation.expirationTime)}`
                : `Added ${formatTimeAgo(donation.createdAt)}`
              }
            </span>
          </div>
          
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{donation.description}</p>
          
          {donation.dietaryInfo.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {donation.dietaryInfo.map((item, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};

export default DonationCard;