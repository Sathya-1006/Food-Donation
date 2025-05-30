import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building2, Save, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    ...(user?.type === 'restaurant' ? {
      restaurantName: (user as any).restaurantName || '',
      description: (user as any).description || '',
    } : {}),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the user profile via API
    showToast('Profile updated successfully!', 'success');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">
              View and update your FoodShare account information.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-gray-500 capitalize">{user?.type}</p>
                  </div>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`pl-10 block w-full rounded-md border ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`pl-10 block w-full rounded-md border ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`pl-10 block w-full rounded-md border ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`pl-10 block w-full rounded-md border ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
                      />
                    </div>
                  </div>

                  {user?.type === 'restaurant' && (
                    <>
                      <div>
                        <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">
                          Restaurant Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="restaurantName"
                            name="restaurantName"
                            type="text"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`pl-10 block w-full rounded-md border ${
                              isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Restaurant Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`block w-full rounded-md border ${
                            isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                          } shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm`}
                        />
                      </div>
                    </>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-6">
                    <Button
                      type="submit"
                      leftIcon={<Save className="w-5 h-5" />}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                <div className="space-y-4">
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    leftIcon={<LogOut className="w-5 h-5" />}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;