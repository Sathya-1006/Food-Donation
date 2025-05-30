import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Share2, UserCheck, Utensils } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Reducing Food Waste, <span className="text-green-600">One Meal at a Time</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                FoodShare connects restaurants with excess food to volunteers who deliver it to those in need, creating a community of sharing and sustainability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/6646903/pexels-photo-6646903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Food donation"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-medium">Together we can make a difference</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect excess food with the people who need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-green-50 rounded-xl p-6 text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Restaurants Share</h3>
              <p className="text-gray-600">
                Restaurants list their excess food with details about quantity, type, and pickup instructions.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Volunteers Claim</h3>
              <p className="text-gray-600">
                Volunteers browse available donations, claim them, and coordinate pickup with the restaurant.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Food Gets Delivered</h3>
              <p className="text-gray-600">
                Volunteers deliver the food to community centers, shelters, or directly to individuals in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-green-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
              <p className="text-xl mb-8 opacity-90">
                Together, we're making a real difference in our communities and for our planet.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">5,000+</div>
                  <p className="text-green-100">Meals Shared</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">100+</div>
                  <p className="text-green-100">Active Restaurants</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">250+</div>
                  <p className="text-green-100">Volunteer Heroes</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">2 tons</div>
                  <p className="text-green-100">Food Waste Reduced</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/6994985/pexels-photo-6994985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Community impact"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're a restaurant with extra food or someone with time to help, you can make a difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="bg-orange-50 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg">
                <Utensils className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">I'm a Restaurant</h3>
                <p className="text-gray-600 mb-6">
                  Share your excess food instead of throwing it away. It's easy, quick, and makes a huge difference.
                </p>
                <Link to="/register">
                  <Button variant="secondary">Register Restaurant</Button>
                </Link>
              </div>
              <div className="bg-blue-50 rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg">
                <UserCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">I'm a Volunteer</h3>
                <p className="text-gray-600 mb-6">
                  Help deliver food to those in need. Choose when and where you can help, on your schedule.
                </p>
                <Link to="/register">
                  <Button>Become a Volunteer</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the restaurants and volunteers who are making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                  MC
                </div>
                <div>
                  <h4 className="font-semibold">Mike Chen</h4>
                  <p className="text-sm text-gray-500">Restaurant Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "FoodShare has helped us reduce waste while giving back to our community. The platform is incredibly easy to use, and the volunteers are dedicated and reliable."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">
                  SR
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Rodriguez</h4>
                  <p className="text-sm text-gray-500">Volunteer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Being a FoodShare volunteer has been incredibly rewarding. I've met amazing people and know that my time is making a real difference in people's lives."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">
                  JW
                </div>
                <div>
                  <h4 className="font-semibold">James Wilson</h4>
                  <p className="text-sm text-gray-500">Food Bank Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "FoodShare has become an essential partner for our food bank. The consistent donations have helped us serve more people in our community than ever before."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community today and help us create a world where good food doesn't go to waste.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;