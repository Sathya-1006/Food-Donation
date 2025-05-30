import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe, Scale, Smile, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-green-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About FoodShare</h1>
            <p className="text-xl text-gray-600 mb-8">
              Our mission is to reduce food waste while ensuring that good food reaches those who need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="FoodShare volunteers"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                FoodShare began in 2023 when a group of community activists, restaurant owners, and tech professionals came together with a common vision: to create a simple way to redistribute excess food from restaurants to those in need.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We saw two problems that could solve each other—restaurants throwing away perfectly good food at the end of the day, and people in our community going hungry. By building a platform to connect these groups through volunteer drivers, we created a win-win solution.
              </p>
              <p className="text-lg text-gray-600">
                Today, FoodShare operates in 12 cities, with plans to expand nationwide. Our community includes hundreds of restaurants and dedicated volunteers who work together to make a difference every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              These core principles guide everything we do at FoodShare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Compassion</h3>
              <p className="text-gray-600">
                We believe that everyone deserves access to good, nutritious food, regardless of their circumstances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Sustainability</h3>
              <p className="text-gray-600">
                By reducing food waste, we're working toward a more sustainable future for our communities and planet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Community</h3>
              <p className="text-gray-600">
                We build connections between different parts of our community, creating a network of mutual support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Equity</h3>
              <p className="text-gray-600">
                We strive to create fair and equal access to food resources for all members of our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How We Work</h2>
            <p className="text-lg text-gray-600 text-center">
              Our process is designed to be simple, efficient, and effective.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Restaurants Register</h3>
                    <p className="text-gray-600">
                      Local restaurants sign up on our platform and get verified. They can then post information about available food donations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Volunteers Join</h3>
                    <p className="text-gray-600">
                      Community members register as volunteers, providing information about their availability and areas they can serve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Food Gets Listed</h3>
                    <p className="text-gray-600">
                      Restaurants post details about available food, including type, quantity, pickup times, and expiration information.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-green-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Volunteers Claim & Deliver</h3>
                    <p className="text-gray-600">
                      Volunteers browse listings, claim food donations, coordinate pickup with restaurants, and deliver to designated locations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/7363778/pexels-photo-7363778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="FoodShare process"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact So Far</h2>
            <p className="text-lg opacity-90">
              Together, we're making a measurable difference in our communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p className="text-xl">Meals Shared</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-xl">Participating Restaurants</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">250+</div>
              <p className="text-xl">Active Volunteers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">12</div>
              <p className="text-xl">Cities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Meet the passionate people behind FoodShare.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Sarah Johnson"
                className="w-full aspect-square object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-green-600 mb-4">Co-Founder & Executive Director</p>
                <p className="text-gray-600">
                  Former restaurant owner with a passion for food sustainability and community building.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Michael Chen"
                className="w-full aspect-square object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
                <p className="text-green-600 mb-4">Co-Founder & Technology Lead</p>
                <p className="text-gray-600">
                  Tech entrepreneur focused on creating platforms that drive social impact.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Aisha Patel"
                className="w-full aspect-square object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Aisha Patel</h3>
                <p className="text-green-600 mb-4">Community Outreach Director</p>
                <p className="text-gray-600">
                  Community organizer with extensive experience in nonprofit management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600">
              We're proud to work with these organizations to amplify our impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm w-full h-24 flex items-center justify-center">
              <div className="text-xl font-bold text-gray-400">City Food Bank</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm w-full h-24 flex items-center justify-center">
              <div className="text-xl font-bold text-gray-400">Green Future</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm w-full h-24 flex items-center justify-center">
              <div className="text-xl font-bold text-gray-400">Chef's Alliance</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm w-full h-24 flex items-center justify-center">
              <div className="text-xl font-bold text-gray-400">Community Fund</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're a restaurant with excess food or someone who wants to volunteer, you can make a difference with FoodShare.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;