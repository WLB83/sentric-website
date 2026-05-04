const fs = require('fs');

const pages = [
  {
    file: 'smf.html',
    title: 'SMF Serisi | Sentric',
    meta: 'Sentric SMF Serisi. Toptan ve perakende satışa uygun, tam kapalı ve bakımsız yüksek performanslı binek araç aküleri.',
    heroSubtitle: 'Binek ve Hafif Ticari Araçlar',
    heroTitle: 'SMF <span>SERİSİ</span>',
    heroDesc: 'Standart araçlar için Avrupa (DIN) ve Asya (JIS) tipi tam kapalı, bakım gerektirmeyen (Sealed Maintenance Free) üstün performanslı kalsiyum alaşımlı aküler.',
    techTitle: 'SMF Akü Teknolojisi',
    techDesc: 'Sentric SMF (Sealed Maintenance Free) aküler, su kaybını sıfıra indiren sızdırmaz labirent çift kapak yapısı ve korozyonu engelleyen kurşun-kalsiyum ızgaraları sayesinde ömür boyu tam bakımsız ve güvenilir bir performans sunar. Özellikle standart donanımlı binek ve hafif ticari araç filoları için bayilerin ve toptancıların en çok güvendiği seridir.',
    featuresTitle: 'SMF Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Sızdırmaz Çift Kapak (Double Lid)', desc: 'Labirent yapısı ile gazları yoğunlaştırıp geri kazandırır, tam bakımsızlık sağlar.' },
      { icon: 'fa-droplet', name: 'Kurşun-Kalsiyum Izgaralar', desc: 'Düşük su tüketimi ve kendi kendine deşarj oranını minimuma indirerek raf ömrünü uzatır.' },
      { icon: 'fa-vial', name: 'Düşük Dirençli Seperatörler', desc: 'Zarf tipi özel seperatörler sayesinde kısa devre riskini ortadan kaldırır.' },
      { icon: 'fa-blender', name: 'Alev Tutucu (Flame Arrester)', desc: 'Dışarıdan gelebilecek kıvılcımları engelleyerek güvenliği en üst düzeye çıkarır.' },
      { icon: 'fa-star', name: 'Şarj Göstergesi (Indicator)', desc: 'Akünün şarj durumunu anlık olarak görmenizi sağlayan entegre sihirli göz.' },
      { icon: 'fa-border-all', name: 'Güçlü Kutu Yapısı', desc: 'Sarsıntıya ve dış darbelere karşı ekstra güçlendirilmiş dış kaplama.' }
    ],
    tableSubtitle: 'Bayi ve Toptancı Bilgilendirmesi',
    tableTitle: 'SMF Teknik Spesifikasyonları',
    tableDesc: 'Farklı araç tiplerine göre Asya (JIS) ve Avrupa (DIN) standartlarındaki stok modellerimiz. Detaylı ürün eşleştirmesi için kataloğumuzu inceleyebilirsiniz.',
    tableHeaders: ['Model Tipi', 'Kapasite (C20)', 'Marş Gücü (CCA)', 'Uygulama'],
    tableRows: [
      ['SMF 58-530 (L2)', '48 Ah', '530 A', 'Standart Binek (DIN)'],
      ['SMF 65-700 (L3)', '62 Ah', '700 A', 'Orta Sınıf Binek (DIN)'],
      ['SMF 65D31L', '70 Ah', '560 A', 'Asya Tipi Araçlar (JIS)']
    ]
  },
  {
    file: 'smf-heavy.html',
    title: 'SMF Ağır Vasıta | Sentric',
    meta: 'Sentric SMF Ağır Vasıta Serisi. Kamyon, tır ve otobüs filoları için uzun ömürlü ticari aküler.',
    heroSubtitle: 'Ağır Vasıta ve Filo',
    heroTitle: 'SMF <span>AĞIR VASITA</span>',
    heroDesc: 'Kamyon, tır, otobüs ve tarım araçları için zorlu koşullara ve sarsıntıya dayanıklı, uzun ömürlü ticari SMF akü serisi.',
    techTitle: 'Ağır Vasıta SMF Teknolojisi',
    techDesc: 'Uzun yol ve zorlu çalışma koşulları için özel olarak tasarlanan SMF ticari serimiz, yüksek kapasiteli kalsiyum alaşım teknolojisi ile su ekleme gerektirmeden yıllarca üstün marş gücü sağlar. Lojistik filolarının bakım maliyetlerini düşüren en ideal enerji çözümüdür.',
    featuresTitle: 'Ticari SMF Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Tam Kapalı Kutu Tasarımı', desc: 'Zorlu arazi ve yol koşullarında toz ve kirin akü içine girmesini engeller.' },
      { icon: 'fa-droplet', name: 'Yüksek Titreşim Direnci', desc: 'Özel plaka sabitleme teknolojisi ile aşırı sarsıntılarda bile kesintisiz güç.' },
      { icon: 'fa-vial', name: 'Genişletilmiş Kapasite', desc: 'Soğuk havalarda ticari araçların ihtiyaç duyduğu yüksek başlangıç marş akımı (CCA).' },
      { icon: 'fa-blender', name: 'Uzun Yaşam Döngüsü', desc: 'Standart ağır vasıta akülerine göre çok daha fazla şarj-deşarj ömrü.' },
      { icon: 'fa-star', name: 'Korozyon Koruması', desc: 'Özel alaşımlı ızgaralar korozyonu önleyerek kullanım süresini maksimize eder.' },
      { icon: 'fa-border-all', name: 'Kolay Taşıma Kulpları', desc: 'Ağır akülerin güvenli değişimi ve taşınması için ergonomik saplar.' }
    ],
    tableSubtitle: 'Bayi ve Filo Bilgilendirmesi',
    tableTitle: 'Ticari SMF Teknik Spesifikasyonları',
    tableDesc: 'Kamyon, tır ve traktörler için en çok tercih edilen tam bakımsız SMF ticari serisi kapasite değerleri.',
    tableHeaders: ['Model Tipi', 'Kapasite (C20)', 'Marş Gücü (CCA)', 'Uygulama'],
    tableRows: [
      ['SMF 95D31L', '90 Ah', '750 A', 'Hafif Kamyon / Kamyonet'],
      ['SMF N100', '100 Ah', '740 A', 'Orta Ticari Araçlar'],
      ['SMF N120', '120 Ah', '820 A', 'Ağır Vasıta / Otobüs']
    ]
  },
  {
    file: 'shd.html',
    title: 'SHD Serisi | Sentric',
    meta: 'Sentric Super Heavy Duty (SHD) Serisi. Şantiye, ağır lojistik ve iş makinaları için sarsıntıya dayanıklı en güçlü akü.',
    heroSubtitle: 'Ağır Vasıta ve Filo',
    heroTitle: 'SHD <span>SERİSİ</span>',
    heroDesc: 'En zorlu ticari koşullarda çalışan araçlar için maksimum performans ve ekstra sarsıntı dayanıklılığı (V3) sağlayan Super Heavy Duty serisi.',
    techTitle: 'SHD (Super Heavy Duty) Teknolojisi',
    techDesc: 'Şantiyeler, uzun yol lojistik tırları ve maden araçları gibi ekstrem şartlarda çalışan araçlar için tasarlanmıştır. SHD (Süper Ağır Hizmet) serisi, ekstra kalın plaka dizaynı, cam elyaf seperatör desteği ve döküm köprü bağlantıları ile sarsıntı kaynaklı arızaları sıfıra indirerek rakipsiz bir kullanım ömrü sunar.',
    featuresTitle: 'SHD Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Ekstra Kalın Plakalar', desc: 'Ağır deşarj durumlarına karşı daha kalın yapı, maksimum aktif madde tutunumu.' },
      { icon: 'fa-droplet', name: 'Cam Elyaf (Glass Mat) Destekli Seperatör', desc: 'Aktif maddenin dökülmesini engelleyerek titreşim direncini en üst seviyeye (V3/V4) taşır.' },
      { icon: 'fa-vial', name: 'Merkezi Döküm Köprü (Cast-on Strap)', desc: 'Hücreler arası bağlantıyı güçlendirerek zorlu yol koşullarında kırılmaları önler.' },
      { icon: 'fa-blender', name: 'Ekstrem Sıcaklık Toleransı', desc: 'Aşırı sıcak ve soğuk çevre şartlarında performans kaybı yaşatmaz.' },
      { icon: 'fa-star', name: 'Yüksek Döngü Sayısı', desc: 'Araç içi yoğun elektronik donanımların beslenmesi için derin döngü uyumluluğu.' },
      { icon: 'fa-border-all', name: 'Özel Reçine Sabitleme', desc: 'Plakaların kutu zeminine özel reçine ile sabitlenmesi sayesinde tam titreşim koruması.' }
    ],
    tableSubtitle: 'Bayi ve Filo Bilgilendirmesi',
    tableTitle: 'SHD Teknik Spesifikasyonları',
    tableDesc: 'İş makinaları, uzun yol tırları ve şantiye kamyonları için ağır hizmet (SHD) serisi standart spesifikasyonlarımız.',
    tableHeaders: ['Model Tipi', 'Kapasite (C20)', 'Marş Gücü (CCA)', 'Uygulama'],
    tableRows: [
      ['SHD N150', '150 Ah', '1000 A', 'Kamyon / Çekici'],
      ['SHD N200', '200 Ah', '1150 A', 'Ağır Ticari / Tır'],
      ['SHD N220', '220 Ah', '1300 A', 'İş Makinaları / Şantiye']
    ]
  },
  {
    file: 'deep-cycle.html',
    title: 'Deep Cycle Serisi | Sentric',
    meta: 'Sentric Marin ve Karavan Aküleri. Derin deşarja dayanıklı Deep Cycle teknolojisi ile teknelerde ve karavanlarda güvenilir enerji.',
    heroSubtitle: 'Marin ve Karavan',
    heroTitle: 'DEEP CYCLE <span>SERİSİ</span>',
    heroDesc: 'Tekne, yat, karavan ve güneş enerjisi sistemleri için derin döngüye ve uzun süreli deşarja tam uyumlu güvenilir yaşam aküsü.',
    techTitle: 'Deep Cycle (Derin Döngü) Teknolojisi',
    techDesc: 'Derin döngü aküleri, kapasitesinin büyük bölümünü (genellikle %50-80 arası) kullandıktan sonra dahi sorunsuzca şarj edilebilecek şekilde tasarlanmıştır. Marin uygulamalarında ve karavanlarda buzdolabı, aydınlatma, su pompası gibi sistemleri saatlerce beslemek için yoğunlaştırılmış aktif materyaller ve kalın plakalar kullanılarak üretilmiştir.',
    featuresTitle: 'Deep Cycle Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Derin Deşarj Performansı', desc: 'Tekrarlayan derin deşarj ve şarj döngülerinde (Deep Cycle) maksimum dayanıklılık.' },
      { icon: 'fa-droplet', name: 'Yüksek Rezerv Kapasitesi (RC)', desc: 'Şarj jeneratörü çalışmadığında bile uzun süre elektrik sağlamaya devam eder.' },
      { icon: 'fa-vial', name: 'Çift Terminalli Tasarım (Marine Terminal)', desc: 'Hem standart otomotiv kutup başı hem de paslanmaz çelik vidalı bağlantı içerir.' },
      { icon: 'fa-blender', name: 'Cam Elyaf İzolasyon', desc: 'Dalgalı denizlerde ve bozuk yollarda sarsıntıya karşı plakaları korur.' },
      { icon: 'fa-star', name: 'Paslanmaz Malzeme', desc: 'Kutup başları ve bağlantı noktaları tuzlu su korozyonuna karşı dayanıklıdır.' },
      { icon: 'fa-border-all', name: 'Güçlü Dış Gövde', desc: 'Marin standartlarına uygun, sızdırmaz ve darbelere karşı dirençli sağlam kutu tasarımı.' }
    ],
    tableSubtitle: 'Bayi ve Toptancı Bilgilendirmesi',
    tableTitle: 'Deep Cycle Teknik Spesifikasyonları',
    tableDesc: 'Marin ve karavan kullanımları için en uygun Deep Cycle serisi BCI grup spesifikasyonları. RC (Rezerv Kapasite) dakika cinsinden verilmiştir.',
    tableHeaders: ['BCI Grup Tipi', 'Kapasite (Ah)', 'Marş Gücü (CCA)', 'Rezerv Kapasite (RC)'],
    tableRows: [
      ['DC 24M', '70 Ah', '500 A', '130 Dakika'],
      ['DC 27M', '90 Ah', '600 A', '160 Dakika'],
      ['DC 31M', '100 Ah', '700 A', '190 Dakika']
    ]
  },
  {
    file: 'golf.html',
    title: 'Golf Serisi | Sentric',
    meta: 'Sentric Golf Arabası Aküleri. Golf araçları, endüstriyel temizlik makinaları ve personel taşıyıcılar için derin deşarjlı çekiyerli aküler.',
    heroSubtitle: 'Endüstriyel Özel',
    heroTitle: 'GOLF <span>SERİSİ</span>',
    heroDesc: 'Golf arabaları, endüstriyel temizlik makinaları ve elektrikli personel taşıyıcılar için özel tasarlanmış uzun menzilli çekici (traction) aküler.',
    techTitle: 'Golf Arabası Akü Teknolojisi',
    techDesc: 'Elektrik motorlu araçların tahrik gücünü sağlamak üzere özel tasarlanan bu aküler, sürekli doldur-boşalt (şarj-deşarj) döngülerinde uzun yıllar hizmet verecek sağlamlıkta üretilmiştir. Kalın kurşun plakalar ve özel asit yoğunluğu sayesinde araçların tek şarjda ulaştığı menzil maksimum düzeye çıkartılmıştır.',
    featuresTitle: 'Golf Serisi Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Yüksek Döngü Kapasitesi', desc: 'Golf sahalarında her gün tam deşarj edilip şarj edilmeye uygun endüstriyel yapı.' },
      { icon: 'fa-droplet', name: 'Uzatılmış Menzil', desc: 'Özel aktif materyaller sayesinde aracın şarjı bitmeden daha fazla tur atmasını sağlar.' },
      { icon: 'fa-vial', name: 'Darbeye Dayanıklı Gövde', engebeli: 'Engebeli sahalarda titreşimi izole eden, ekstra güçlendirilmiş dış çeper.' },
      { icon: 'fa-blender', name: 'Kolay Su Ekleme Sistemi', desc: 'Opsiyonel olarak tek noktadan su doldurma sistemlerine entegre edilebilir kutup yapısı.' },
      { icon: 'fa-star', name: 'Geniş Yüzeyli Plakalar', desc: 'Enerjinin daha hızlı ve yüksek amperle motora aktarılmasını sağlar.' },
      { icon: 'fa-border-all', name: 'Derin Deşarj Koruması', desc: 'Voltaj belli bir seviyenin altına düştüğünde dahi sülfatlaşmayı geciktiren kimya.' }
    ],
    tableSubtitle: 'Bayi ve Toptancı Bilgilendirmesi',
    tableTitle: 'Golf Aküsü Teknik Spesifikasyonları',
    tableDesc: '6 Volt ve 8 Volt sistemli elektrikli taşıyıcılar ve golf araçları için spesifikasyonlar.',
    tableHeaders: ['Model Tipi', 'Voltaj (V)', 'Kapasite (20 Hr)', 'Uygulama'],
    tableRows: [
      ['GC2-6V', '6 V', '225 Ah', 'Golf Arabası / Temizlik Mak.'],
      ['GC8-8V', '8 V', '170 Ah', 'Personel Taşıyıcı / Makaslı Platform'],
      ['GC12-12V', '12 V', '150 Ah', 'Endüstriyel Traktör']
    ]
  },
  {
    file: 'garden.html',
    title: 'Garden Serisi | Sentric',
    meta: 'Sentric Garden Serisi. Çim biçme traktörleri ve bahçe ekipmanları için güçlü, sarsıntıya dirençli marş aküleri.',
    heroSubtitle: 'Endüstriyel Özel',
    heroTitle: 'GARDEN <span>SERİSİ</span>',
    heroDesc: 'Çim biçme traktörleri, jeneratörler ve küçük bahçe ekipmanları için kompakt boyutta yüksek marş basma gücü sağlayan U1 serisi aküler.',
    techTitle: 'U Serisi / Bahçe Ekipman Teknolojisi',
    techDesc: 'Sık kullanılmayan mevsimsel bahçe araçları ve çim biçme traktörleri için üretilmiştir. Kış aylarında uzun süre beklese dahi düşük deşarj oranı sayesinde ilkbaharda anında marş gücü sunar. Kompakt U1 kasa yapısıyla tüm markalara sorunsuz uyum sağlar.',
    featuresTitle: 'Garden Serisi Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Kompakt Boyut (U1 Tipi)', desc: 'Pek çok markanın dar alanlı akü tepsisine tam oturacak endüstri standartlarında tasarım.' },
      { icon: 'fa-droplet', name: 'Aşırı Sarsıntı Direnci', desc: 'Pürüzlü çim sahalarda çalışan traktörlerin yarattığı titreşime karşı güçlendirilmiş plakalar.' },
      { icon: 'fa-vial', name: 'Hızlı Marş Gücü (CCA)', desc: 'Küçük benzinli motorları anında ateşleyecek yüksek anlık CCA akımı.' },
      { icon: 'fa-blender', name: 'Düşük Kendi Kendine Deşarj', desc: 'Kış aylarında garajda beklerken voltajını çok uzun süre muhafaza eder.' },
      { icon: 'fa-star', name: 'Tam Kapalı Sistem Seçeneği', desc: 'Kullanım alanına göre bakımlı veya bakım gerektirmeyen (SMF) yapı seçenekleri.' },
      { icon: 'fa-border-all', name: 'L-Tipi Terminaller', desc: 'Traktör kablolarına uygun yatay/dik delikli kolay montaj terminalleri.' }
    ],
    tableSubtitle: 'Bayi ve Toptancı Bilgilendirmesi',
    tableTitle: 'Garden Teknik Spesifikasyonları',
    tableDesc: 'U1 form faktöründeki standart bahçe tipi (Garden Tractor) aküleri için spesifikasyonlar.',
    tableHeaders: ['Model Tipi', 'Kapasite (Ah)', 'Marş Gücü (CCA)', 'Terminal Yönü'],
    tableRows: [
      ['U1-300', '30 Ah', '300 A', 'Düz (Standart)'],
      ['U1R-300', '30 Ah', '300 A', 'Ters (R)'],
      ['U1-350', '35 Ah', '350 A', 'Düz (Standart)']
    ]
  },
  {
    file: 'agm.html',
    title: 'AGM Serisi | Sentric',
    meta: 'Sentric AGM Serisi. Yeni nesil Start-Stop ve mikro-hibrit araçlar için Absorbed Glass Mat teknolojisi ile 3 kat daha uzun ömür.',
    heroSubtitle: 'Premium Seri (Start-Stop)',
    heroTitle: 'AGM <span>SERİSİ</span>',
    heroDesc: 'Rejeneratif frenleme sistemine sahip üst segment Start-Stop araçlar için üretilen, gaz emisyonunu %99 oranında engelleyen Absorbent Glass Mat (AGM) teknolojili aküler.',
    techTitle: 'AGM (Absorbent Glass Mat) Teknolojisi',
    techDesc: 'AGM teknolojisi, asidin cam elyaf seperatörlere tamamen emdirildiği, bu sayede sızıntı riskinin sıfıra indiği en üst düzey akü teknolojisidir. Modern araçların yüksek elektrik gereksinimlerini karşılamakla kalmaz, frenleme enerjisini geri kazanım sistemleriyle (Regenerative Braking) tam uyumlu çalışır. Standart akülere kıyasla 3 kat daha uzun yaşam döngüsü sunar.',
    featuresTitle: 'AGM Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'VRLA (Valf Ayarlı Kilitli Sistem)', desc: 'Asit sızıntısını kesin olarak önler, akü ters çevrilse bile sıvı akışı olmaz.' },
      { icon: 'fa-droplet', name: 'Cam Elyaf (Glass Mat) Seperatör', desc: 'Düşük iç direnç yaratarak gücün çok hızlı bir şekilde aktarılmasını ve geri alınmasını sağlar.' },
      { icon: 'fa-vial', name: '3 Kat Daha Uzun Ömür', desc: 'Yoğun Start-Stop trafiğinde ve zorlu kış şartlarında bile maksimum çevrim ömrü.' },
      { icon: 'fa-blender', name: 'Rejeneratif Frenleme Uyumu', desc: 'Frenlemeden elde edilen enerjiyi son derece hızlı şarj kabulüyle depolar.' },
      { icon: 'fa-star', name: 'Derin Deşarja %100 Dayanım', desc: 'Aktif materyal kaybı yaşanmadan çok daha fazla kez tamamen deşarj olup şarj olabilir.' },
      { icon: 'fa-border-all', name: 'Sıfır Bakım', desc: 'Su kaybı ve asit buharlaşması yaşanmadığı için ömrü boyunca hiçbir bakım gerektirmez.' }
    ],
    tableSubtitle: 'Bayi ve Toptancı Bilgilendirmesi',
    tableTitle: 'AGM Teknik Spesifikasyonları',
    tableDesc: 'Üst segment araçların enerji ve marş ihtiyaçları için DIN standartlarında AGM ürün gamı.',
    tableHeaders: ['Model Tipi', 'Kapasite (C20)', 'Marş Gücü (CCA)', 'Uygulama'],
    tableRows: [
      ['AGM LN2', '60 Ah', '680 A', 'Premium Start-Stop Binek'],
      ['AGM LN3', '70 Ah', '760 A', 'Lüks Start-Stop Binek'],
      ['AGM LN4', '80 Ah', '800 A', 'SUV / Üst Segment Start-Stop'],
      ['AGM LN5', '95 Ah', '850 A', 'Geniş Hacimli SUV / Ticari']
    ]
  },
  {
    file: 'efb.html',
    title: 'EFB Serisi | Sentric',
    meta: 'Sentric EFB Serisi. Geliştirilmiş sulu tip akü teknolojisi ile standart Start-Stop araçlar için iki kat daha uzun ömür.',
    heroSubtitle: 'Premium Seri (Start-Stop)',
    heroTitle: 'EFB <span>SERİSİ</span>',
    heroDesc: 'Geliştirilmiş Sulu Tip (Enhanced Flooded Battery) teknolojisi ile standart Start-Stop sistemli araçlarda standart akülere göre 2 kat uzun ömür ve üstün şarj kabulü.',
    techTitle: 'EFB (Enhanced Flooded Battery) Teknolojisi',
    techDesc: 'Start-Stop sistemine sahip ancak rejeneratif frenleme özelliği bulunmayan binek ve hafif ticari araçlar için mükemmel bir alternatiftir. EFB aküler, plakalara eklenen özel organik elyaflar ve yüksek saflıkta elektrolit teknolojisi sayesinde standart akülerden 2 kat daha uzun derin deşarj döngü performansına sahiptir.',
    featuresTitle: 'EFB Yapısal Bileşenleri',
    features: [
      { icon: 'fa-shield', name: 'Gelişmiş Plaka Koruması', desc: 'Aktif maddenin dökülmesini engelleyen özel organik elyaf (Polyester scrim) kaplama.' },
      { icon: 'fa-droplet', name: 'Yüksek Saflıkta Elektrolit', desc: 'Sistemin daha az direnç göstererek daha hızlı şarj olmasını sağlar.' },
      { icon: 'fa-vial', name: '2 Kat Yaşam Döngüsü', desc: 'Sık dur-kalk trafiğinde bile standart SMF akülerine göre iki kat daha uzun ömürlüdür.' },
      { icon: 'fa-blender', name: 'Karıştırıcı Eleman (Mixing Element)', desc: 'Asit tabakalaşmasını (stratification) önleyerek ömrü uzatır.' },
      { icon: 'fa-star', name: 'Dinamik Şarj Kabulü', desc: 'Trafik ışıklarında beklerken motorun durmasıyla zayıflayan enerjiyi motor çalıştığında hızla geri toplar.' },
      { icon: 'fa-border-all', name: 'Gelişmiş Izgara Tasarımı', desc: 'İç direnci düşürerek yüksek ve kesintisiz akım iletimi sağlar.' }
    ],
    tableSubtitle: 'Bayi ve Toptancı Bilgilendirmesi',
    tableTitle: 'EFB Teknik Spesifikasyonları',
    tableDesc: 'Start-Stop özelliğine sahip modern Avrupa (DIN) ve Asya (JIS) araçları için EFB serisi özellikleri.',
    tableHeaders: ['Model Tipi', 'Kapasite (C20)', 'Marş Gücü (CCA)', 'Uygulama'],
    tableRows: [
      ['EFB LN2', '60 Ah', '560 A', 'B Sınıfı Start-Stop (DIN)'],
      ['EFB LN3', '70 Ah', '650 A', 'C/D Sınıfı Start-Stop (DIN)'],
      ['EFB Q85', '73 Ah', '660 A', 'Asya Tipi Start-Stop (JIS)']
    ]
  }
];

// Read template (we use agm.html as it is presumably the base design desired)
const templatePath = 'c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\agm.html';
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

pages.forEach(page => {
  let content = baseTemplate;

  // Title and Meta
  content = content.replace(/<title>.*?<\/title>/g, `<title>${page.title}</title>`);
  content = content.replace(/<meta name="description" content=".*?">/g, `<meta name="description" content="${page.meta}">`);

  // Hero Section
  content = content.replace(/<h4 class="section-subtitle">(Gelişmiş Dayanıklılık|Premium Seri.*?)<\/h4>/, `<h4 class="section-subtitle">${page.heroSubtitle}</h4>`);
  content = content.replace(/<h1>AGM <span>SERİSİ<\/span><\/h1>/, `<h1>${page.heroTitle}</h1>`);
  content = content.replace(/<p style="max-width: 800px; margin: 0 auto; margin-top: 20px;">.*?<\/p>/, `<p style="max-width: 800px; margin: 0 auto; margin-top: 20px;">${page.heroDesc}</p>`);

  // Description Section
  content = content.replace(/<h2 class="section-title">AGM Akü Teknolojisi<\/h2>\s*<p>.*?<\/p>\s*<p>.*?<\/p>\s*<p>.*?<\/p>/s, `<h2 class="section-title">${page.techTitle}</h2>\n                    <p>${page.techDesc}</p>`);

  // Technical Anatomy Section
  content = content.replace(/<h3 class="mb-4" style="color: var\(--primary-color\);">AGM Yapısal Bileşenleri<\/h3>/, `<h3 class="mb-4" style="color: var(--primary-color);">${page.featuresTitle}</h3>`);
  
  // Build new feature items
  let featuresHtml = '';
  page.features.forEach(f => {
    featuresHtml += `
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fa-solid ${f.icon}"></i></div>
                        <div class="feature-text">
                            <h4>${f.name}</h4>
                            <p>${f.desc}</p>
                        </div>
                    </div>`;
  });
  
  // Replace the features block
  content = content.replace(/<div class="feature-item">.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/s, featuresHtml + '\n                ');
  // Need a precise regex to replace the feature items without breaking the layout. 
  // It's easier to find the first feature-item and replace until the features-image div.
  const regexFeatures = /<div class="feature-item">[\s\S]*?(?=<div class="features-image)/;
  content = content.replace(regexFeatures, featuresHtml + '\n                </div>\n                ');

  // Performance Table Section
  content = content.replace(/<h4 class="section-subtitle">Kanıtlanmış Üstünlük<\/h4>/, `<h4 class="section-subtitle">${page.tableSubtitle}</h4>`);
  content = content.replace(/<h2 class="section-title">Performans ve Döngü Testleri<\/h2>/, `<h2 class="section-title">${page.tableTitle}</h2>`);
  content = content.replace(/<p style="color: var\(--text-muted\); max-width: 700px; margin: 0 auto;">Dayanıklılık testleri.*?<\/p>/, `<p style="color: var(--text-muted); max-width: 700px; margin: 0 auto;">${page.tableDesc}</p>`);

  // Build the new table
  let tableHeadersHtml = page.tableHeaders.map(h => `<th class="sub-col">${h}</th>`).join('\n                            ');
  let tableRowsHtml = page.tableRows.map(row => {
    return `
                        <tr>
                            <td><span class="spec-label">${row[0]}</span></td>
                            <td><span class="value-highlight" style="color: var(--primary);">${row[1]}</span></td>
                            <td><span class="value-highlight" style="color: var(--primary);">${row[2]}</span></td>
                            <td><span class="spec-label">${row[3]}</span></td>
                        </tr>`;
  }).join('');

  let newTableHtml = `
                <table class="performance-table">
                    <thead>
                        <tr>
                            ${tableHeadersHtml}
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHtml}
                    </tbody>
                </table>`;

  content = content.replace(/<table class="performance-table">[\s\S]*?<\/table>/, newTableHtml);

  fs.writeFileSync(`c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\${page.file}`, content);
});

console.log('All product pages rebuilt properly with precise B2B content.');
