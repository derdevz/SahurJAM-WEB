import { Hero } from './components/Hero';
import { GameplayLoop } from './components/GameplayLoop';
import { DayTimeline } from './components/DayTimeline';
import { MenuSystem } from './components/MenuSystem';
import { HurmaEconomy } from './components/HurmaEconomy';
import { CharacterCards } from './components/CharacterCards';
import { TechStack } from './components/TechStack';
import { GDDSection } from './components/GDDSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: '#0D0705',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Smooth scroll behavior */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0D0705;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #C8622A;
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #F5C842;
        }
      `}</style>

      <Hero />
      <GameplayLoop />
      <DayTimeline />
      <MenuSystem />
      <HurmaEconomy />
      <CharacterCards />
      <TechStack />
      <GDDSection />
      <Footer />
    </div>
  );
}
