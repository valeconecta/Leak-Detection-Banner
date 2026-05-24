import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Target, Eye, Heart } from 'lucide-react';
import CTASection from '../components/CTASection';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center py-24 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="About"
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
            {t('about_hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('about_hero_subtitle')}
          </motion.p>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                {t('about_story_p1')}
              </p>
              <p>
                {t('about_story_p2')}
              </p>
              <p>
                {t('about_story_p3')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-lg mt-8" alt="Pool work" referrerPolicy="no-referrer" />
              <img src="https://drive.google.com/thumbnail?id=1_OE0sqKKohsbht0yTj-EtM556Ta0JwZY&sz=w1000" className="rounded-2xl shadow-lg" alt="Pool renovation" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-brand-light/10 text-brand-light rounded-xl flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark">{t('about_mission_title')}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('about_mission_text')}
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-brand-light/10 text-brand-light rounded-xl flex items-center justify-center">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark">{t('about_vision_title')}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('about_vision_text')}
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl space-y-4">
              <div className="w-12 h-12 bg-brand-light/10 text-brand-light rounded-xl flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark">{t('about_values_title')}</h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li><strong>{t('about_value_1_title')}</strong> {t('about_value_1_text')}</li>
                <li><strong>{t('about_value_2_title')}</strong> {t('about_value_2_text')}</li>
                <li><strong>{t('about_value_3_title')}</strong> {t('about_value_3_text')}</li>
                <li><strong>{t('about_value_4_title')}</strong> {t('about_value_4_text')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
