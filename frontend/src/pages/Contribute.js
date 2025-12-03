import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Upload, MessageSquare } from 'lucide-react';

const Contribute = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contribute Your Story</h1>
          <p className="text-lg text-gray-600">
            Help us preserve the heritage of Thoralby and Bishopdale by sharing your photographs, documents, and memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-700" />
              </div>
              <CardTitle className="text-lg">Share Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Upload historical photographs of people, places, and events from Bishopdale.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-green-700" />
              </div>
              <CardTitle className="text-lg">Share Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Tell us your family stories and memories of life in the villages.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-purple-700" />
              </div>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Contact me with questions, corrections, or additional information.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">How to Contribute</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What We're Looking For</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Historical photographs (family photos, village scenes, events)</li>
                <li>Documents (letters, deeds, maps, newspaper clippings)</li>
                <li>Personal stories and memories</li>
                <li>Information about people, families, and places</li>
                <li>Corrections to existing content</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Please provide as much context as possible (names, dates, locations)</li>
                <li>Original photographs will be scanned and returned</li>
                <li>All contributions will be credited appropriately</li>
                <li>Copyright remains with the contributor</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
              <p className="text-gray-700 mb-4">
                To contribute your materials or stories, please contact:
              </p>
              <div className="bg-white rounded-md p-4 border border-green-300">
                <p className="font-semibold text-gray-900">Penny Ellis (née Snaith)</p>
                <p className="text-gray-700 mt-2">
                  Email: <a href="mailto:contact@thoralby-history.org" className="text-green-700 hover:underline">
                    contact@thoralby-history.org
                  </a>
                </p>
              </div>
            </div>

            <div className="text-center pt-6">
              <p className="text-gray-600 mb-4">
                Thank you for helping us preserve the history of Thoralby and Bishopdale for future generations!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contribute;
