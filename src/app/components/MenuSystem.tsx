const iftarMenu = [
  { image: '04_bowl.png', name: 'Mercimek Çorbası', difficulty: 'Kolay', hurma: 10 },
  { image: '99_taco.png', name: 'Döner Kebap', difficulty: 'Orta', hurma: 25 },
  { image: '48_garlicbread.png', name: 'Pide', difficulty: 'Kolay', hurma: 15 },
  { image: '40_eggsalad.png', name: 'Çoban Salata', difficulty: 'Kolay', hurma: 8 },
  { image: '95_steak.png', name: 'Kuzu Tandır', difficulty: 'Zor', hurma: 45 },
  { image: '69_meatball.png', name: 'İçli Köfte', difficulty: 'Orta', hurma: 30 },
  { image: '32_curry.png', name: 'Pilav', difficulty: 'Kolay', hurma: 12 },
  { image: '36_dumplings.png', name: 'Mantı', difficulty: 'Zor', hurma: 40 },
];

const sahurMenu = [
  { image: '38_friedegg.png', name: 'Menemen', difficulty: 'Kolay', hurma: 12 },
  { image: '22_cheesecake.png', name: 'Peynir Tabağı', difficulty: 'Kolay', hurma: 6 },
  { image: '79_pancakes.png', name: 'Gözleme', difficulty: 'Orta', hurma: 20 },
  { image: '61_jam.png', name: 'Kaymak & Bal', difficulty: 'Kolay', hurma: 10 },
  { image: '20_bagel.png', name: 'Simit', difficulty: 'Kolay', hurma: 5 },
  { image: '04_bowl.png', name: 'Çay', difficulty: 'Kolay', hurma: 3 },
  { image: '13_bacon.png', name: 'Yumurta Sucuk', difficulty: 'Orta', hurma: 18 },
  { image: '32_curry.png', name: 'Türk Kahvesi', difficulty: 'Özel', hurma: 35 },
];

const difficultyColors = {
  'Kolay': '#4A8C3F',
  'Orta': '#C8622A',
  'Zor': '#C0392B',
  'Özel': '#F5C842',
};

export function MenuSystem() {
  return (
    <section className="py-20 px-4" style={{ background: '#0D0705' }}>
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: '#F5EDE0',
            textShadow: '0 0 20px rgba(245,200,66,0.3)',
          }}
        >
          Menü Sistemi
        </h2>

        <p 
          className="text-center mb-16 text-lg"
          style={{ color: '#9C8A75', fontFamily: "'Inter', sans-serif" }}
        >
          Her öğün farklı lezzetler, her tarif farklı zorluk
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* İftar Menüsü */}
          <div>
            <h3 
              className="text-3xl mb-6 text-center"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#C8622A',
              }}
            >
              🌙 İftar Menüsü
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {iftarMenu.map((item, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
                    borderColor: 'rgba(245,200,66,0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 25px ${difficultyColors[item.difficulty as keyof typeof difficultyColors]}30`,
                    }}
                  />

                  <div className="relative flex items-center gap-3">
                    <img 
                      src={`/asset/Ghostpixxells_pixelfood/${item.image}`} 
                      alt={item.name} 
                      className="w-12 h-12 object-contain"
                    />
                    
                    <div className="flex-1">
                      <h4 
                        className="text-lg mb-1"
                        style={{ 
                          fontFamily: "'Inter', sans-serif",
                          color: '#F5EDE0',
                        }}
                      >
                        {item.name}
                      </h4>
                      
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: difficultyColors[item.difficulty as keyof typeof difficultyColors],
                            color: difficultyColors[item.difficulty as keyof typeof difficultyColors],
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {item.difficulty}
                        </span>
                        
                        <span 
                          className="text-sm font-mono"
                          style={{ color: '#F5C842' }}
                        >
                          🌴 {item.hurma}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sahur Menüsü */}
          <div>
            <h3 
              className="text-3xl mb-6 text-center"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#C8622A',
              }}
            >
              ☀️ Sahur Menüsü
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {sahurMenu.map((item, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1A0F08 0%, #0D0705 100%)',
                    borderColor: 'rgba(245,200,66,0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 25px ${difficultyColors[item.difficulty as keyof typeof difficultyColors]}30`,
                    }}
                  />

                  <div className="relative flex items-center gap-3">
                    <img 
                      src={`/asset/Ghostpixxells_pixelfood/${item.image}`} 
                      alt={item.name} 
                      className="w-12 h-12 object-contain"
                    />
                    
                    <div className="flex-1">
                      <h4 
                        className="text-lg mb-1"
                        style={{ 
                          fontFamily: "'Inter', sans-serif",
                          color: '#F5EDE0',
                        }}
                      >
                        {item.name}
                      </h4>
                      
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: difficultyColors[item.difficulty as keyof typeof difficultyColors],
                            color: difficultyColors[item.difficulty as keyof typeof difficultyColors],
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {item.difficulty}
                        </span>
                        
                        <span 
                          className="text-sm font-mono"
                          style={{ color: '#F5C842' }}
                        >
                          🌴 {item.hurma}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
