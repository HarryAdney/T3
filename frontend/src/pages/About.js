import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About This Project</h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                This website explores the history of Thoralby, the neighbouring villages of Newbiggin and West Burton, 
                and the scattered hill farms in the rest of Bishopdale from prehistory to the late twentieth century.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                I was born at Holmeside Farm in Thoralby and raised in the village, where my family has lived for several 
                generations. This website provides a wide range of primary evidence about Thoralby, Newbiggin, Bishopdale 
                and West Burton.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Many of the documents have been transcribed to avoid breaching copyright laws. Please notify me if you 
                find any errors or if you have any relevant information or images for the site.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Four Townships</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bishopdale is divided into four historic townships, each with its own unique character and history:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Thoralby</strong> - The main village and historical center of the dale</li>
                  <li><strong>Newbiggin</strong> - A smaller settlement with its own distinct heritage</li>
                  <li><strong>West Burton</strong> - Known for its picturesque village green</li>
                  <li><strong>Bishopdale</strong> - The scattered farms and settlements throughout the valley</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Research Sources</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The information on this website has been compiled from a variety of sources including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Parish records and church archives</li>
                <li>Census records from 1841 onwards</li>
                <li>Historical maps and land surveys</li>
                <li>Personal family photographs and documents</li>
                <li>Oral histories and community memories</li>
                <li>Published local history books and articles</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Get Involved</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This is an ongoing project and I welcome contributions from anyone with connections to Thoralby and 
                Bishopdale. If you have:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Photographs or documents to share</li>
                <li>Family stories or memories</li>
                <li>Corrections or additional information</li>
                <li>Questions about the content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                Please don't hesitate to get in touch through the Contribute page.
              </p>

              <div className="bg-gray-100 border-l-4 border-gray-500 p-6 my-8">
                <p className="text-gray-900 font-medium mb-2">Thank you for visiting,</p>
                <p className="text-gray-900 text-lg font-semibold">Penny Ellis (née Snaith)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
