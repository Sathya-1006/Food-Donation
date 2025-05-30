import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Clock, Search, Filter, AlertCircle } from 'lucide-react';
import { DonationType, DonationStatus } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import Button from '../../components/ui/Button';
import DonationCard from '../../components/donations/DonationCard';
import DonationForm from '../../components/forms/DonationForm';
import DonationStatusBadge from '../../components/donations/DonationStatusBadge';
import { formatDateTime } from '../../utils/dateUtils';

const RestaurantDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getRestaurantDonations, addDonation, updateDonationStatus } = useDonations();
  const [isAddingDonation, setIsAddingDonation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DonationStatus | 'all'>('all');

  const donations = getRestaurantDonations();

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddDonation = (donationData: Omit<DonationType, 'id' | 'status' | 'createdAt'>) => {
    addDonation(donationData);
    setIsAddingDonation(false);
  };

  const getDonationCounts = () => {
    return {
      total: donations.length,
      active: donations.filter(d => d.status === 'available' || d.status === 'claimed').length,
      completed: donations.filter(d => d.status === 'delivered').length,
      cancelled: donations.filter(d => d.status === 'cancelled').length,
    };
  };

  const counts = getDonationCounts();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Manage your food donations and track their status.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{counts.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <PlusCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Donations</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{counts.active}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{counts.completed}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-full">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{counts.cancelled}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {isAddingDonation ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Donation</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddingDonation(false)}
              >
                Cancel
              </Button>
            </div>
            <DonationForm onSubmit={handleAddDonation} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <Button
              leftIcon={<PlusCircle className="w-5 h-5" />}
              onClick={() => setIsAddingDonation(true)}
            >
              Add New Donation
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
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
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as DonationStatus | 'all')}
                  className="pl-10 block w-full sm:w-48 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="claimed">Claimed</option>
                  <option value="pickedUp">Picked Up</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Donations List */}
        {filteredDonations.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Food Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volunteer
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
                            <div className="text-sm text-gray-500 truncate max-w-xs">{donation.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donation.quantity}</div>
                        <div className="text-sm text-gray-500">{donation.servings} servings</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(donation.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(donation.expirationTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <DonationStatusBadge status={donation.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donation.volunteer ? donation.volunteer.name : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/donation/${donation.id}`} className="text-green-600 hover:text-green-900 mr-4">
                          View
                        </Link>
                        {donation.status === 'available' && (
                          <button
                            onClick={() => updateDonationStatus(donation.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
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
              <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You haven\'t added any donations yet. Start sharing your excess food!'}
              </p>
              {!isAddingDonation && (searchTerm === '' && statusFilter === 'all') && (
                <Button
                  onClick={() => setIsAddingDonation(true)}
                  leftIcon={<PlusCircle className="w-5 h-5" />}
                >
                  Add Your First Donation
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;