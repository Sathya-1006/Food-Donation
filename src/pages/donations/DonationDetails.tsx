import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Map, 
  Clock, 
  Users, 
  Calendar, 
  Tag, 
  AlertTriangle, 
  AlertCircle, 
  ChevronLeft,
  CheckCircle,
  ArrowRightCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import Button from '../../components/ui/Button';
import DonationStatusBadge from '../../components/donations/DonationStatusBadge';
import { formatDate, formatDateTime } from '../../utils/dateUtils';

const DonationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, userType } = useAuth();
  const { getDonationById, updateDonationStatus } = useDonations();
  
  const donation = getDonationById(id || '');
  
  if (!donation) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Donation Not Found</h2>
          <p className="text-gray-600 mb-6">
            The donation you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleClaimDonation = () => {
    if (!user) return;
    
    updateDonationStatus(donation.id, 'claimed', {
      id: user.id,
      name: user.name,
    });
  };

  const handleUpdateStatus = (newStatus: 'pickedUp' | 'delivered') => {
    updateDonationStatus(donation.id, newStatus);
  };

  const handleCancelDonation = () => {
    updateDonationStatus(donation.id, 'cancelled');
    navigate(-1);
  };

  const isRestaurantOwner = userType === 'restaurant' && user?.id === donation.restaurantId;
  const isAssignedVolunteer = userType === 'volunteer' && donation.volunteer?.id === user?.id;
  const canClaim = isAuthenticated && userType === 'volunteer' && donation.status === 'available';
  const canCancel = isRestaurantOwner && donation.status === 'available';
  const canMarkPickedUp = isAssignedVolunteer && donation.status === 'claimed';
  const canMarkDelivered = isAssignedVolunteer && donation.status === 'pickedUp';

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Image */}
            <div className="lg:w-1/3 p-6 flex flex-col">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-4">
                {donation.image ? (
                  <img
                    src={donation.image}
                    alt={donation.foodName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                    <span className="sr-only">No image available</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Donation Status</h3>
                <div className="flex items-center">
                  <DonationStatusBadge status={donation.status} size="lg" />
                  <span className="ml-2 text-gray-600">
                    {donation.status === 'claimed' && donation.volunteer && `by ${donation.volunteer.name}`}
                  </span>
                </div>
              </div>

              {donation.dietaryInfo.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Dietary Information</h3>
                  <div className="flex flex-wrap gap-2">
                    {donation.dietaryInfo.map((item, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full capitalize"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {donation.containsAllergens.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Contains Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {donation.containsAllergens.map((item, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full capitalize"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-2/3 p-6 lg:border-l border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{donation.foodName}</h1>
                <DonationStatusBadge status={donation.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Map className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">{donation.restaurantName}</p>
                    <p className="text-sm">{donation.restaurantAddress}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Posted on</p>
                    <p className="text-sm">{formatDate(donation.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Expires on</p>
                    <p className="text-sm">{formatDateTime(donation.expirationTime)}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Servings</p>
                    <p className="text-sm">{donation.servings} portions</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{donation.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Food Information</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <Tag className="w-5 h-5 mr-2 text-gray-400" />
                      <span className="capitalize">{donation.foodType}</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-5 h-5 mr-2 inline-flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
                          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
                          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
                          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
                          <path d="M12 16h3.5a3.5 3.5 0 1 1 0 7H12v-7z"></path>
                        </svg>
                      </span>
                      <span>Quantity: {donation.quantity}</span>
                    </li>
                  </ul>
                </div>

                {donation.pickupInstructions && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Pickup Instructions</h2>
                    <p className="text-gray-600">{donation.pickupInstructions}</p>
                  </div>
                )}
              </div>

              {donation.status !== 'available' && donation.volunteer && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Delivery Information</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Volunteer:</span> {donation.volunteer.name}
                    </p>
                    
                    {donation.status === 'pickedUp' && donation.pickupTime && (
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Picked up at:</span> {formatDateTime(donation.pickupTime)}
                      </p>
                    )}
                    
                    {donation.status === 'delivered' && donation.deliveryTime && (
                      <p className="text-gray-600">
                        <span className="font-medium">Delivered at:</span> {formatDateTime(donation.deliveryTime)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Warning for expiring food */}
              {new Date(donation.expirationTime) < new Date(new Date().getTime() + 12 * 60 * 60 * 1000) && 
               donation.status === 'available' && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700">
                        This food will expire soon. Please claim it quickly to reduce waste!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {canClaim && (
                  <Button 
                    onClick={handleClaimDonation}
                    leftIcon={<CheckCircle className="w-5 h-5" />}
                  >
                    Claim Donation
                  </Button>
                )}
                
                {canMarkPickedUp && (
                  <Button 
                    onClick={() => handleUpdateStatus('pickedUp')}
                    leftIcon={<ArrowRightCircle className="w-5 h-5" />}
                  >
                    Mark as Picked Up
                  </Button>
                )}
                
                {canMarkDelivered && (
                  <Button 
                    onClick={() => handleUpdateStatus('delivered')}
                    leftIcon={<CheckCircle className="w-5 h-5" />}
                  >
                    Mark as Delivered
                  </Button>
                )}
                
                {canCancel && (
                  <Button 
                    variant="danger"
                    onClick={handleCancelDonation}
                  >
                    Cancel Donation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;