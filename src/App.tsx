import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PriceChart } from './components/price-chart';
import { PriceStats } from './components/price-stats';
import { useAppConfig } from './hooks/use-config';
import { ContactForm } from './components/contact-form';
import { CurrentPrice } from './components/currentPrice/CurrentPrice';
import { TimeRangesGrid } from './components/time-ranges/TimeRangeGrid';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppContent() {
  const { title, description } = useAppConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Actualizado automáticamente</p>
              <p className="text-lg font-semibold text-green-600">Datos oficiales REE</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <CurrentPrice />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Rangos Horarios de Precios
          </h2>
          <TimeRangesGrid />
        </section>
        
        <PriceStats />
        
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>

        {/* <InfoSection /> */}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

// function InfoSection() {
//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       <InfoCard 
//         title="💡 Horas valle" 
//         content="00:00 - 08:00 horas. Precios más bajos del día." 
//       />
//       <InfoCard 
//         title="⏰ Horas llano" 
//         content="08:00 - 18:00 horas. Precios intermedios." 
//       />
//       <InfoCard 
//         title="⚡ Horas punta" 
//         content="18:00 - 24:00 horas. Precios más elevados." 
//       />
//     </div>
//   );
// }

// function InfoCard({ title, content }: { title: string; content: string }) {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-600 text-sm">{content}</p>
//     </div>
//   );
// }

function Footer() {
  const { title } = useAppConfig();
  
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>© 2025 {title}. Datos proporcionados por Red Eléctrica de España.</p>
      </div>
    </footer>
  );
}