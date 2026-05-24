import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import CTASection from '../components/CTASection';

export default function Testimonials() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: 'John Smith',
      location: 'Orlando, FL',
      text: 'Waterland Pools transformed our backyard. Their attention to detail during the renovation was incredible. Highly recommend Miguel and his team!',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      location: 'Windermere, FL',
      text: 'We had a mysterious leak that two other companies couldn’t find. Waterland found it in an hour and fixed it the same day. Lifesavers!',
      rating: 5
    },
    {
      name: 'Michael Davis',
      location: 'Winter Park, FL',
      text: 'The weekly maintenance service is top-notch. I never have to worry about my pool being ready for the weekend. Reliable and professional.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      location: 'Lake Nona, FL',
      text: 'Excellent customer service. They took the time to explain everything during the estimate. Very transparent and fair pricing.',
      rating: 5
    }
  ];

  return (
    <div className="pt-20">
      <section className="relative min-h-[50vh] flex items-center py-24 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Testimonials"
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
            {t('testimonials_hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('testimonials_hero_subtitle')}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 p-10 rounded-3xl relative"
              >
                <Quote className="absolute top-6 right-8 text-brand-light/20" size={48} />
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="font-bold text-brand-dark">{review.name}</h4>
                  <p className="text-slate-500 text-sm">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
}
