import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import { serviceData } from './data/services';
import { useParams, Navigate } from 'react-router-dom';

function ServiceDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  const data = id ? serviceData[id] : null;
  
  if (!data) {
    return <Navigate to="/services" replace />;
  }
  
  return <ServiceDetail {...data} />;
}

function ServiceDetailWrapperWithId({ id }: { id: string }) {
  const data = serviceData[id];
  if (!data) return <Navigate to="/services" replace />;
  return <ServiceDetail {...data} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ServiceDetailWrapperWithId id="leak-detection" />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Dynamic Service Routes */}
              <Route path="/services/:id" element={<ServiceDetailWrapper />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
}
