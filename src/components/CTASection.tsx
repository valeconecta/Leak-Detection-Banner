import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 text-white overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/d/1ORzrCAppNdmaGb5L9cIfE8kykboim3-3" 
          className="w-full h-full object-cover"
          alt="Pool Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-dark/85 backdrop-blur-[1px]"></div>
      </div>

      {/* Top Wave Effect */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          {t('home_ready_title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed"
        >
          {t('home_ready_subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="pt-4"
        >
          <Link 
            to="/contact" 
            className="inline-block bg-brand-light hover:bg-brand-light/90 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-[0_20px_50px_rgba(0,174,239,0.3)] transition-all hover:-translate-y-1 active:scale-95"
          >
            {t('cta_schedule')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
