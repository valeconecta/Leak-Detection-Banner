import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function EstimateForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send estimate request');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h3 className="text-2xl font-bold text-brand-dark mb-4">{t('form_success_title')}</h3>
        <p className="text-slate-600">{t('form_success_message')}</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-brand-light font-semibold hover:underline"
        >
          {t('form_send_another')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-4">
      <h3 className="text-2xl font-bold text-brand-dark mb-6">{t('form_submit')}</h3>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">{t('form_full_name')} *</label>
          <input required name="fullName" type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">{t('form_phone')} *</label>
          <input required name="phone" type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">{t('form_email')} *</label>
        <input required name="email" type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">{t('form_address')} *</label>
        <input required name="address" type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">{t('form_service')} *</label>
        <select required name="service" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none">
          <option value="">{t('form_select_service')}</option>
          <option value="leak-detection">{t('service_leak_detection')}</option>
          <option value="cleaning">{t('service_cleaning_maintenance')}</option>
          <option value="renovation">{t('service_pool_deck_renovations')}</option>
          <option value="equipment">{t('service_equipment_repair')}</option>
          <option value="sealing">{t('service_paver_sealing')}</option>
          <option value="acid-wash">{t('service_acid_wash')}</option>
          <option value="automation">{t('service_automation_control')}</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">{t('form_message')}</label>
        <textarea name="message" rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none resize-none"></textarea>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">{t('form_preferred_time')}</label>
        <input name="preferredTime" type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-light outline-none" />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`w-full btn-primary mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Sending...' : t('form_submit')}
      </button>
    </form>
  );
}
