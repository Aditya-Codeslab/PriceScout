import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bookmark, GraduationCap, Percent, Layers, ArrowLeftRight, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, savedProductIds, signOut } = useAuth();
  const savedCount = savedProductIds.length;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Keyboard navigation: Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Categories', path: '/categories', icon: Layers },
    { label: 'Compare', path: '/compare', icon: ArrowLeftRight },
    { label: 'Deals', path: '/deals', icon: Percent },
    { label: 'Student Mode', path: '/student', icon: GraduationCap, highlight: true },
    { label: 'Saved', path: '/saved', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFAFF] border-b-2 border-[#1E1B3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Zone 1: Brand wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-xl py-1 px-1 -ml-1"
            aria-label="PriceScout Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF4B3] border-2 border-[#1E1B3A] flex items-center justify-center text-[#1E1B3A] font-[800] text-xl">
              <span>P</span>
            </div>
            <span className="text-2xl font-[800] tracking-tight text-[#1E1B3A]">
              Price<span className="text-[#6D28D9]">Scout</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center gap-1.5 lg:gap-2"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-[700] rounded-full whitespace-nowrap shrink-0 border-2 transition-none min-h-[44px] ${
                    active
                      ? 'text-[#1E1B3A] bg-[#E4DAFB] border-[#1E1B3A]'
                      : 'text-[#1E1B3A] bg-transparent border-transparent hover:border-[#1E1B3A] hover:bg-[#E4DAFB]/40'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0 text-[#1E1B3A]" aria-hidden="true" />
                  <span>{link.label}</span>
                  
                  {link.badge !== undefined && (
                    <span className="ml-1 px-2 py-0.5 text-xs font-[800] bg-[#FFF4B3] text-[#1E1B3A] rounded-full border border-[#1E1B3A]">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <span className="ml-1 text-[11px] uppercase font-[800] tracking-wider px-2 py-0.5 bg-[#FFF4B3] text-[#1E1B3A] rounded-full border border-[#1E1B3A]">
                      Offers
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Action / Sign In or User Profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs font-[700] text-[#1E1B3A] bg-[#E4DAFB] px-3.5 py-2 rounded-full border-2 border-[#1E1B3A] truncate max-w-[150px]">
                  {user.fullName || user.email}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="min-h-[44px] min-w-[44px] p-2 bg-white text-[#1E1B3A] hover:bg-[#FFD9CC] border-2 border-[#1E1B3A] rounded-full flex items-center justify-center cursor-pointer"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden md:inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 py-2 text-sm font-[800] text-white bg-[#6D28D9] hover:bg-[#5B21B6] border-2 border-[#1E1B3A] rounded-full whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
              >
                <User className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Sign in</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-2 bg-[#FFF4B3] text-[#1E1B3A] border-2 border-[#1E1B3A] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Click & Keyboard Support */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b-2 border-[#1E1B3A] bg-[#FBFAFF] p-4 space-y-2"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between min-h-[48px] px-4 py-3 rounded-full text-base font-[800] border-2 ${
                  active
                    ? 'bg-[#E4DAFB] text-[#1E1B3A] border-[#1E1B3A]'
                    : 'bg-white text-[#1E1B3A] border-[#1E1B3A]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#1E1B3A]" aria-hidden="true" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2.5 py-0.5 text-xs font-[800] bg-[#FFF4B3] text-[#1E1B3A] rounded-full border border-[#1E1B3A]">
                    {link.badge}
                  </span>
                )}
                {link.highlight && (
                  <span className="text-xs font-[800] px-2.5 py-0.5 bg-[#FFF4B3] text-[#1E1B3A] rounded-full border border-[#1E1B3A]">
                    Offers
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2 border-t-2 border-[#1E1B3A]">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#E4DAFB] rounded-full border-2 border-[#1E1B3A] text-xs font-[800] text-[#1E1B3A]">
                  <span className="truncate">{user.fullName || user.email}</span>
                  <span className="text-[10px] uppercase font-[800] bg-[#FFF4B3] px-2 py-0.5 rounded-full border border-[#1E1B3A]">Active</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2.5 text-sm font-[800] text-[#1E1B3A] bg-[#FFD9CC] border-2 border-[#1E1B3A] rounded-full cursor-pointer"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2.5 text-base font-[800] text-white bg-[#6D28D9] border-2 border-[#1E1B3A] rounded-full"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                <span>Sign in to PriceScout</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
