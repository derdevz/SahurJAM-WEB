# Ramadan Looper

Canvas tabanli kisa sureli bir mutfak yonetim oyunu. Oyuncu iftar ve sahur dongusu arasinda yemekleri dolaptan alip firinda isitir ve masalara servis eder.

## Ozellikler

- Iftar ve sahur fazlarina gore degisen siparis temposu
- Kalici hurma para birimi ve yukseltme sistemi
- High score ve en iyi kombo kaydi
- Pause, ses ac/kapat ve oyun ici yardim paneli
- Yerel asset'lerle calisan bagimsiz acilis ekrani

## Calistirma

```bash
npm start
```

Ardindan `http://127.0.0.1:3000` adresini ac.

## Kontroller

- `WASD` veya ok tuslari: hareket
- `E` veya `Bosluk`: etkilesim
- `Enter`: baslat
- `R`: oyun bittiğinde yeniden baslat

## Proje Durumu

- Kök dizindeki oyun calisir durumda.
- `kapak-ekrani/` ayri bir prototip arayuz; ana oyuna bagli degil ve bu akisa entegre edilmis degil.

## Bu Turde Yapilan Iyilestirmeler

- Iftar ve sahur fazlarina gore siparis spawn hizi ve bahsis katsayisi aktif hale getirildi.
- Oyun sonu ve seviye tamamlama durumlari icin durum ekrani eklendi.
- Kontrol yonlendirmeleri HUD'a eklendi.
- Acilis ekranindaki harici gorsel bagimliligi kaldirildi.
- Yerel statik sunucu ve `npm` scriptleri eklendi.
- Kalici ilerleme, hurma ekonomisi ve yukseltmeler eklendi.
- Pause, ses ayari ve sag panel uzerinden oyun ici kontrol katmani eklendi.
- Her seviye icin yeni tarif acilimi eklendi.
- Yeni yemekler icin yerel SVG asset'ler eklendi.

## Smoke Test

1. Baslangic ekrani
   - `SERVISE BASLA` butonu oyunu baslatir.
   - `Tab` ile menu paneli acilir.
   - Baslangic metinleri tek panelde okunur ve mobilde tasmaz.
2. Menu ve ayarlar
   - `Yukseltmeler` sekmesindeki her kart tiklanir.
   - Yeterli hurma varsa seviye artar ve bildirim cikar.
   - `Ses`, `Animasyon`, `Yardim Metinleri`, `Duraklat` butonlari durum degistirir.
3. Mutfak etkilesimi
   - Buzdolabindan yemek alin.
   - Firinda yeterli sure isitilir.
   - Isinan yemek dogru masaya servis edilir.
4. Masa servisi
   - Siparis cikan masaya dogru yemek goturulur.
   - Dogru serviste skor ve hurma artar.
   - Yanlis serviste hata bildirimi gelir.
5. Seviye akisi
   - Her seviyede sure farklidir ve iki faza bolunur: `iftar` ve `sahur`.
   - Seviye sonunda hedef teslimat tamamlanmadiysa seviye basarisiz olur.
   - `Enter` ile sonraki seviye veya yeniden deneme baslar.
   - Ust seviyelerde sure, hedef ve tempo degisir.
