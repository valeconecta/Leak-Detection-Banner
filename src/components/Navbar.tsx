import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isSolid = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('service_leak_title'), path: '/' },
    { name: t('nav_home'), path: '/home' },
    { name: t('nav_services'), path: '/services' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_portfolio'), path: '/portfolio' },
    { name: t('nav_testimonials'), path: '/testimonials' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center text-slate-700">
            <img 
              src="https://i.postimg.cc/Dwjpnqm1/Logo-Waterland-Pools-removebg-preview.png" 
              alt="Waterland Pools" 
              className="h-[77px] w-auto transition-all"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-light ${
                  location.pathname === link.path 
                    ? 'text-brand-light' 
                    : 'text-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center space-x-1 px-3 py-1 rounded-full border border-slate-200 text-slate-700 transition-all hover:bg-slate-50"
            >
              <Globe size={16} />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>

            <Link to="/contact" className="btn-primary py-2 text-sm">
              {t('cta_estimate')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="p-2 rounded-full border border-slate-200 text-slate-700"
            >
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-brand-light hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  {t('cta_estimate')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
