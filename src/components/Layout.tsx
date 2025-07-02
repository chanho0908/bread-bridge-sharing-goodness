
import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, MapPin, Calendar, User, Heart, Menu } from 'lucide-react';
import { useState } from 'react';
import ReservationFloatingWidget from './ReservationFloatingWidget';

const Layout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/map', icon: MapPin, label: '지도' },
    { path: '/reservations', icon: Calendar, label: '예약' },
    { path: '/profile', icon: User, label: '마이페이지' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-300" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold text-orange-900">빵빵하게</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2" role="navigation" aria-label="주 메뉴">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn-accessible flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-orange-800 bg-orange-100'
                      : 'text-gray-800 hover:text-orange-800 hover:bg-orange-50'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden btn-accessible p-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-300">
            <nav className="px-2 pt-2 pb-3 space-y-1" role="navigation" aria-label="모바일 메뉴">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`btn-accessible flex items-center space-x-3 px-4 py-4 rounded-lg text-base font-medium ${
                    isActive(item.path)
                      ? 'text-orange-800 bg-orange-100'
                      : 'text-gray-800 hover:text-orange-800 hover:bg-orange-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1" role="main">
        <Outlet />
      </main>

      {/* Floating Reservation Widget */}
      <ReservationFloatingWidget />

      {/* Bottom Navigation for Mobile */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-4 py-2 z-40"
        role="navigation" 
        aria-label="하단 네비게이션"
      >
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`btn-accessible flex flex-col items-center space-y-1 p-2 justify-center ${
                isActive(item.path) ? 'text-orange-800' : 'text-gray-600'
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <item.icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
