import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Map, AlertCircle, Calendar, Clock } from 'lucide-react';
import { DonationType, FoodType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardFooter } from '../../components/ui/Card';
import DonationCard from '../../components/donations/DonationCard';
import DonationStatusBadge from '../../components/donations/DonationStatusBadge';
import { formatDateTime, formatTimeAgo } from '../../utils/dateUtils';

const VolunteerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getAvailableDonations, getVolunteerDonations, updateDonationStatus } = useDonations();
  const [searchTerm, setSearchTerm] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState<FoodType | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'available' | 'myclaims'>('available');

  const availableDonations = getAvailableDonations();
  const myDonations = getVolunteerDonations();

  const filteredDonations = (activeTab === 'available' ? availableDonations : myDonations).filter(
    (donation) => {
      const matchesSearch =
        donation.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFoodType = foodTypeFilter === 'all' || donation.foodType === foodTypeFilter;
      
      return matchesSearch && matchesFoodType;
    }
  );

  const handleClaimDonation = (donation: DonationType) => {
    if (!user) return;
    
    updateDonationStatus(donation.id, 'claimed', {
      id: user.id,
      name: user.name,
    });
  };

  const handleUpdateStatus = (donationId: string, newStatus: 'pickedUp' | 'delivered') => {
    updateDonationStatus(donationId, newStatus);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Find food donations to deliver or track your current claims.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === 'available'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Donations
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === 'myclaims'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('myclaims')}
          >
            My Claims
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full sm:w-64 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={foodTypeFilter}
              onChange={(e) => setFoodTypeFilter(e.target.value as FoodType | 'all')}
              className="pl-10 block w-full sm:w-48 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="all">All Food Types</option>
              <option value="prepared">Prepared</option>
              <option value="produce">Produce</option>
              <option value="bakery">Bakery</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="canned">Canned</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'available' ? (
          <>
            {filteredDonations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation) => (
                  <Card key={donation.id} className="h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      {donation.image ? (
                        <img
                          src={donation.image}
                          alt={donation.foodName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>

                    <CardContent className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{donation.foodName}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Map className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{donation.restaurantName}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>Expires: {formatDateTime(donation.expirationTime)}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{donation.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {donation.servings} servings
                        </span>
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full capitalize">
                          {donation.foodType}
                        </span>
                      </div>
                      
                      {donation.dietaryInfo.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
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
                    </CardContent>

                    <CardFooter className="flex justify-between items-center">
                      <Link to={`/donation/${donation.id}`} className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View Details
                      </Link>
                      <Button 
                        size="sm"
                        onClick={() => handleClaimDonation(donation)}
                      >
                        Claim
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No available donations</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || foodTypeFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria.'
                      : 'There are no available donations at the moment. Please check back later!'}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {filteredDonations.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Food Item
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Restaurant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Claimed
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiration
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDonations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {donation.image ? (
                                <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden mr-4">
                                  <img src={donation.image} alt={donation.foodName} className="h-10 w-10 object-cover" />
                                </div>
                              ) : (
                                <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-200 mr-4 flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">No img</span>
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{donation.foodName}</div>
                                <div className="text-sm text-gray-500">{donation.servings} servings</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{donation.restaurantName}</div>
                            <div className="text-sm text-gray-500">{donation.restaurantAddress}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTimeAgo(donation.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <DonationStatusBadge status={donation.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDateTime(donation.expirationTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to={`/donation/${donation.id}`} className="text-green-600 hover:text-green-900 mr-4">
                              View
                            </Link>
                            
                            {donation.status === 'claimed' && (
                              <button
                                onClick={() => handleUpdateStatus(donation.id, 'pickedUp')}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                Mark Picked Up
                              </button>
                            )}
                            
                            {donation.status === 'pickedUp' && (
                              <button
                                onClick={() => handleUpdateStatus(donation.id, 'delivered')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Mark Delivered
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No claimed donations</h3>
                  <p className="text-gray-500 mb-6">
                    You haven't claimed any donations yet. Browse available donations to get started!
                  </p>
                  <Button
                    onClick={() => setActiveTab('available')}
                  >
                    Browse Available Donations
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;