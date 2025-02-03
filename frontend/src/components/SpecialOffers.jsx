import { useState } from "react";
import { Link } from "react-router-dom";

export function SpecialOffers() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Power Tools Offer */}
        <div className="relative h-[300px] bg-blue-600 rounded-lg overflow-hidden">
          <div className="relative h-full w-full p-8 flex flex-col justify-center z-10">
            <h3 className="text-white text-2xl font-bold mb-4">Professional Power Tools</h3>
            <p className="text-blue-100 mb-6">Get up to 40% off on professional power tools from top brands</p>
            <Link to="#" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold text-lg transition-colors hover:bg-blue-700 hover:text-white">
              Shop Now
            </Link>
          </div>
          <img
            src="/placeholder.svg?text=Power+Tools+Sale&height=300&width=600"
            alt="Power tools sale"
            className="object-cover opacity-50 w-full h-full"
          />
        </div>

        {/* Paint & Supplies Offer */}
        <div className="relative h-[300px] bg-orange-600 rounded-lg overflow-hidden">
          <div className="relative h-full w-full p-8 flex flex-col justify-center z-10">
            <h3 className="text-white text-2xl font-bold mb-4">Paint & Supplies</h3>
            <p className="text-orange-100 mb-6">Special festive season offers on all paint products</p>
            <Link to="#" className="inline-block px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold text-lg transition-colors hover:bg-orange-700 hover:text-white">
              Shop Now
            </Link>
          </div>
          <img
            src="/placeholder.svg?text=Paint+Sale&height=300&width=600"
            alt="Paint sale"
            className="object-cover opacity-50 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
