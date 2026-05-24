import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, ShieldCheck, Hammer, Settings, Waves, Sparkles, Smartphone, ChevronRight } from 'lucide-react';
import CTASection from '../components/CTASection';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'leak-detection',
      title: t('service_leak_title'),
      icon: <Droplets />,
      desc: t('service_leak_desc'),
      priority: true
    },
    {
      id: 'cleaning',
      title: t('service_cleaning_title'),
      icon: <ShieldCheck />,
      desc: t('service_cleaning_desc')
    },
    {
      id: 'renovations',
      title: t('service_renovations_title'),
      icon: <Hammer />,
      desc: t('service_renovations_desc')
    },
    {
      id: 'equipment',
      title: t('service_equipment_title'),
      icon: <Settings />,
      desc: t('service_equipment_desc')
    },
    {
      id: 'sealing',
      title: t('service_sealing_title'),
      icon: <Waves />,
      desc: t('service_sealing_desc')
    },
    {
      id: 'acid-wash',
      title: t('service_acid_wash_title'),
      icon: <Sparkles />,
      desc: t('service_acid_wash_desc')
    },
    {
      id: 'automation',
      title: t('service_automation_title'),
      icon: <Smartphone />,
      desc: t('service_automation_desc')
    }
  ];

  return (
    <div className="pt-20">
      <section className="relative min-h-[50vh] flex items-center py-24 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Services"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {t('services_hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('services_hero_subtitle')}
          </motion.p>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-10 rounded-3xl bg-slate-50 border-2 transition-all hover:shadow-xl hover:bg-white ${service.priority ? 'border-brand-light' : 'border-transparent'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${service.priority ? 'bg-brand-light text-white' : 'bg-brand-dark text-white'}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <Link 
                  to={service.id === 'leak-detection' ? '/' : `/services/${service.id}`}
                  className="inline-flex items-center font-bold text-brand-light hover:underline"
                >
                  {t('cta_view_details')} <ChevronRight size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
