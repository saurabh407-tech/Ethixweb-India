import React from 'react';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-white selection:bg-brand-500 selection:text-white">
      <AppRoutes />
    </div>
  );
}
