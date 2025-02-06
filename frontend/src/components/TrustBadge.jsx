import React from "react";

const TrustBadge = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 border-t">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        <div className="text-center">
          <div className="text-2xl lg:text-4xl font-bold text-blue-600 mb-2">25+</div>
          <div className="text-sm lg:text-base text-gray-600">Years of Excellence</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-4xl font-bold text-blue-600 mb-2">100K+</div>
          <div className="text-sm lg:text-base text-gray-600">Satisfied Customers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-4xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-sm lg:text-base text-gray-600">Premium Brands</div>
        </div>
        <div className="text-center">
          <div className="text-2xl lg:text-4xl font-bold text-blue-600 mb-2">24/7</div>
          <div className="text-sm lg:text-base text-gray-600">Expert Support</div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
