import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="text-2xl font-bold text-white">NexFix</div>
              <div className="text-sm">Hardware & Tools Center</div>
            </Link>
            <p className="text-sm mb-6">
              Your one-stop destination for all hardware, tools, paints, and home improvement needs.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>123 Hardware Street, Industrial Area Phase 1, New Delhi, 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>support@nexfix.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Download Our App</h3>
            <p className="text-sm mb-4">Shop on the go with our mobile app. Available on iOS and Android.</p>
            <div className="space-y-3">
              <Link to="#" className="block">
                <img
                  src="/placeholder.svg?text=App+Store&height=40&width=120"
                  alt="Download on App Store"
                  width={120}
                  height={40}
                  className="rounded"
                />
              </Link>
              <Link to="#" className="block">
                <img
                  src="/placeholder.svg?text=Play+Store&height=40&width=120"
                  alt="Get it on Play Store"
                  width={120}
                  height={40}
                  className="rounded"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm">© {new Date().getFullYear()} NexFix. All rights reserved.</div>
            <div className="flex gap-4 md:justify-end">
              <img
                src="/placeholder.svg?text=Visa&height=30&width=40"
                alt="Visa"
                width={40}
                height={30}
                className="rounded"
              />
              <img
                src="/placeholder.svg?text=Mastercard&height=30&width=40"
                alt="Mastercard"
                width={40}
                height={30}
                className="rounded"
              />
              <img
                src="/placeholder.svg?text=UPI&height=30&width=40"
                alt="UPI"
                width={40}
                height={30}
                className="rounded"
              />
              <img
                src="/placeholder.svg?text=Net+Banking&height=30&width=40"
                alt="Net Banking"
                width={40}
                height={30}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
