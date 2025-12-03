import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Calendar, Image, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1590004987778-bece5c9adab6?w=1920&q=80")',
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Thoralby Through Time
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Discover the rich heritage of Thoralby and Bishopdale through stories, photographs, and maps spanning centuries of Yorkshire Dales history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/archive" 
              className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Explore the Archive
            </Link>
            <Link 
              to="/contribute" 
              className="bg-green-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition-all transform hover:scale-105"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Collections</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dive into different aspects of Thoralby's history through our curated collections of people, places, events, and photographs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* About Card */}
          <Card className="md:col-span-2 bg-gradient-to-br from-gray-50 to-white border-2 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">About This Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This website explores the history of Thoralby, the neighbouring villages of Newbiggin and West Burton, and the scattered hill farms in the rest of Bishopdale from prehistory to the late twentieth century.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I was born at Holmeside Farm in Thoralby and raised in the village, where my family has lived for several generations. This website provides a wide range of primary evidence about Thoralby, Newbiggin, Bishopdale and West Burton. Many of the documents have been transcribed to avoid breaching copyright laws. Please notify me if you find any errors or if you have any relevant information or images for the site.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Thank you.<br />
                <span className="text-gray-900">Penny Ellis (née Snaith)</span>
              </p>
              <Link 
                to="/about" 
                className="inline-block text-green-700 hover:text-green-800 font-semibold mt-2 hover:underline"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>

          {/* People & Families */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle className="text-2xl">People & Families</CardTitle>
              </div>
              <p className="text-sm text-gray-600">150 items</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Discover the stories of families who shaped Thoralby through generations.
              </p>
              <Link 
                to="/people" 
                className="text-blue-700 hover:text-blue-800 font-semibold hover:underline"
              >
                Explore →
              </Link>
            </CardContent>
          </Card>

          {/* Buildings & Places */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-amber-700" />
                </div>
                <CardTitle className="text-2xl">Buildings & Places</CardTitle>
              </div>
              <p className="text-sm text-gray-600">75 items</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Explore the historic architecture and landmarks of Bishopdale.
              </p>
              <Link 
                to="/places" 
                className="text-amber-700 hover:text-amber-800 font-semibold hover:underline"
              >
                Explore →
              </Link>
            </CardContent>
          </Card>

          {/* Historical Timeline */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-700" />
                </div>
                <CardTitle className="text-2xl">Historical Timeline</CardTitle>
              </div>
              <p className="text-sm text-gray-600">200 items</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Journey through centuries of events that defined our community.
              </p>
              <Link 
                to="/timeline" 
                className="text-purple-700 hover:text-purple-800 font-semibold hover:underline"
              >
                Explore →
              </Link>
            </CardContent>
          </Card>

          {/* Photo Archive */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Image className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle className="text-2xl">Photo Archive</CardTitle>
              </div>
              <p className="text-sm text-gray-600">500 items</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Browse my collection of historical photographs and images.
              </p>
              <Link 
                to="/archive" 
                className="text-green-700 hover:text-green-800 font-semibold hover:underline"
              >
                Explore →
              </Link>
            </CardContent>
          </Card>

          {/* Maps & Geography */}
          <Card className="md:col-span-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Map className="h-6 w-6 text-red-700" />
                </div>
                <CardTitle className="text-2xl">Maps & Geography</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Compare historical and modern maps of Thoralby and surroundings.
              </p>
              <Link 
                to="/maps" 
                className="text-red-700 hover:text-red-800 font-semibold hover:underline"
              >
                Explore →
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-12 text-center border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Help Us Preserve Our Heritage</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Do you have photographs, documents, or stories about Thoralby and Bishopdale? I'd love to hear from you and add your contributions to my archive.
          </p>
          <Link 
            to="/contribute" 
            className="inline-block bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold transition-all transform hover:scale-105"
          >
            Contribute Your Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
