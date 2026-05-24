import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, ShieldCheck, Clock, Users, ChevronRight } from 'lucide-react';
import EstimateForm from '../components/EstimateForm';
import CTASection from '../components/CTASection';

export default function Home() {
  const { t } = useLanguage();

  const services = [
    { title: t('service_leak_title'), icon: <Droplets />, priority: true, path: '/' },
    { title: t('service_cleaning_title'), icon: <ShieldCheck />, path: '/services/cleaning' },
    { title: t('service_renovations_title'), icon: <Users />, path: '/services/renovations' },
    { title: t('service_equipment_title'), icon: <Clock />, path: '/services/equipment' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1ORzrCAppNdmaGb5L9cIfE8kykboim3-3" 
            className="w-full h-full object-cover"
            alt="Luxury Pool"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <span className="inline-block px-4 py-1 bg-brand-light/20 border border-brand-light/30 rounded-full text-brand-light font-bold text-sm tracking-widest uppercase">
              {t('home_years_excellence')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {t('hero_title')}
            </h1>
            <p className="text-xl text-slate-200 max-w-xl leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/contact" className="btn-primary">
                {t('cta_estimate')}
              </Link>
              <Link to="/" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-dark">
                {t('nav_services')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="estimate"
          >
            <EstimateForm />
          </motion.div>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-brand-dark leading-tight">
                {t('home_intro_title')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('home_intro_text')}
              </p>
              <Link to="/about" className="inline-flex items-center text-brand-light font-bold hover:underline">
                {t('home_learn_more')} <ChevronRight size={20} />
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-3xl shadow-2xl"
                alt="Family enjoying pool"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-light text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-3xl font-bold">{t('home_trusted_count')}</p>
                <p className="text-sm font-medium opacity-90">{t('home_trusted_label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-brand-dark">{t('home_services_title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t('home_services_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl bg-white shadow-lg border-t-4 ${service.priority ? 'border-brand-light' : 'border-brand-dark'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.priority ? 'bg-brand-light text-white' : 'bg-brand-dark/10 text-brand-dark'}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h3>
                <Link to={service.path} className="text-brand-light font-semibold text-sm hover:underline flex items-center">
                  {t('cta_view_details')} <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">
              {t('cta_view_all')}
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
