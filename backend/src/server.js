import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import sequelize from "./config/db.js";

// Models
import Admin from "./models/Admin.js";
import Service from "./models/Service.js";
import Article from "./models/Article.js";
import Booking from "./models/Booking.js";

// Routes
import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/services.js";
import articleRoutes from "./routes/articles.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Global error handlers to prevent silent serverless process crashes
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});

app.use(cors());
app.use(express.json());

// Lazy Database Initialization Middleware (for Vercel Serverless compatibility)
let dbInitialized = false;
const initDbMiddleware = async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await sequelize.sync({ force: false });
      await seedDatabase();
      dbInitialized = true;
      console.log("Database SQLite synchronized and seeded successfully!");
    } catch (err) {
      console.error("Database initialization failed during request:", err);
      return res.status(500).json({
        error: "Database Initialization Failed",
        message: err.message,
        stack: err.stack,
      });
    }
  }
  next();
};

app.use(initDbMiddleware);

// Routes mapping
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/bookings", bookingRoutes);

// Simple Health Check
app.get("/", (req, res) => {
  res.send("API Homecare Bidan Lila is Running...");
});

// Seeder function
async function seedDatabase() {
  // 1. Seed Admin
  const adminCount = await Admin.count();
  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash("adminhomecare", 10);
    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });
    console.log("-> Seeded Admin Account successfully (admin / adminhomecare)");
  }

  // 2. Seed Services
  const serviceCount = await Service.count();
  if (serviceCount === 0) {
    const services = [
      {
        name: "Pijat Bayi & Baby Spa Stimulus",
        slug: "pijat-bayi-baby-spa",
        category: "Baby Care",
        description: "Layanan stimulasi tumbuh kembang bayi yang dipandu oleh bidan bersertifikat. Meliputi senam bayi (baby gym), berendam air hangat (baby swim), dan pijat stimulasi bayi menggunakan baby oil organic untuk merangsang motorik, melancarkan pencernaan, serta meningkatkan kualitas tidur bayi.",
        price: 175000,
        duration: 60,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Pijat Laktasi & Oksitosin Ibu Menyusui",
        slug: "pijat-laktasi-oksitosin",
        category: "Mom Care",
        description: "Pijat terapi payudara, tengkuk, dan punggung untuk merangsang pelepasan hormon prolaktin dan oksitosin. Bermanfaat mengatasi masalah ASI tersumbat (seret), meredakan payudara bengkak, memberikan efek relaksasi yang mendalam bagi ibu menyusui, serta melancarkan aliran ASI.",
        price: 200000,
        duration: 60,
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Prenatal Massage (Pijat Ibu Hamil)",
        slug: "prenatal-massage-ibu-hamil",
        category: "Mom Care",
        description: "Relaksasi khusus ibu hamil mulai dari trimester kedua (usia kandungan di atas 14 minggu). Bermanfaat untuk meredakan nyeri punggung bawah, kaki bengkak, mengurangi kecemasan, serta merelaksasikan otot-otot yang tegang demi mempersiapkan persalinan yang lancar.",
        price: 225000,
        duration: 75,
        image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Newborn Care & Perawatan Tali Pusat",
        slug: "newborn-care-perawatan-tali-pusat",
        category: "Baby Care",
        description: "Layanan kunjungan ke rumah untuk membantu memandikan bayi baru lahir (newborn), melakukan perawatan tali pusat secara steril, serta memberikan pelatihan dan edukasi cara merawat bayi, membedong, dan teknik menyusui (latch-on) yang benar bagi ibu baru.",
        price: 150000,
        duration: 45,
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Postnatal Massage & Perawatan Ibu Nifas",
        slug: "postnatal-massage-nifas",
        category: "Mom Care",
        description: "Perawatan komprehensif bagi ibu pasca melahirkan. Meliputi pijat seluruh badan untuk mengembalikan kebugaran, memperlancar nifas, pemakaian bengkung/gurita, totok wajah relaksasi, dan pemantauan kondisi fisik umum pasca bersalin.",
        price: 250000,
        duration: 90,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Nebulizer & Pijat Batuk Pilek Anak",
        slug: "nebulizer-pijat-batuk-pilek-anak",
        category: "Kids Care",
        description: "Layanan fisioterapi dada bagi anak yang sedang menderita batuk pilek dan hidung tersumbat. Meliputi terapi inhalasi uap (nebulizer) dengan cairan fisiologis steril untuk mengencerkan lendir, dilanjutkan dengan pijat dada-punggung untuk melegakan pernapasan.",
        price: 180000,
        duration: 45,
        image: "https://images.unsplash.com/photo-1584515906207-529b34685f80?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Tindik Telinga Bayi Steril & Aman",
        slug: "tindik-telinga-bayi-steril",
        category: "Baby Care",
        description: "Layanan penindikan telinga bayi perempuan menggunakan alat tindik khusus berstandar medis sekali pakai yang steril, cepat, aman, dan minim rasa sakit. Sudah termasuk anting hypoallergenic (anti-alergi) yang aman untuk kulit sensitif bayi.",
        price: 130000,
        duration: 30,
        image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=600&auto=format&fit=crop&q=80",
      },
      {
        name: "Konsultasi KB & Pelayanan Pemeriksaan Umum",
        slug: "konsultasi-kb-pemeriksaan-kebidanan",
        category: "Midwifery",
        description: "Konsultasi lengkap pilihan keluarga berencana (KB) pasca melahirkan, pemeriksaan tekanan darah, pemeriksaan detak jantung janin (Doppler) untuk ibu hamil, konsultasi keluhan kehamilan, serta penyuluhan nutrisi sehat untuk ibu dan janin.",
        price: 100000,
        duration: 45,
        image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=600&auto=format&fit=crop&q=80",
      },
    ];

    await Service.bulkCreate(services);
    console.log("-> Seeded Homecare Services successfully");
  }

  // 3. Seed Articles
  const articleCount = await Article.count();
  if (articleCount === 0) {
    const articles = [
      {
        title: "5 Manfaat Pijat Bayi (Baby Massage) untuk Tumbuh Kembang Si Kecil",
        slug: "manfaat-pijat-bayi-tumbuh-kembang",
        summary: "Pijat bayi bukan sekadar membuat bayi rileks. Ketahui 5 manfaat ilmiah pijat bayi, mulai dari meningkatkan berat badan, memperlancar pencernaan hingga membuat tidur lebih nyenyak.",
        content: `
<h3>Pijat Bayi untuk Tumbuh Kembang Optimal</h3>
<p>Banyak orang tua mengira pijat bayi hanya diperlukan saat si kecil rewel atau pegal. Faktanya, pijat bayi merupakan salah satu stimulasi taktil (sentuhan) terbaik yang sangat dianjurkan oleh praktisi kesehatan dan kebidanan sejak bayi lahir.</p>
<p>Berikut adalah 5 manfaat utama pijat bayi yang perlu Bunda ketahui:</p>
<ol>
  <li><strong>Menstimulasi Pertumbuhan Fisik:</strong> Sentuhan lembut merangsang saraf vagus yang menghubungkan otak dengan organ penting, termasuk perut. Ini memicu sekresi hormon pencernaan seperti gastrin dan insulin, membantu penyerapan nutrisi lebih optimal, dan menaikkan berat badan bayi.</li>
  <li><strong>Meningkatkan Kualitas Tidur:</strong> Pijat membantu meningkatkan produksi hormon serotonin dan melatonon, sekaligus menurunkan tingkat kortisol (hormon stres). Hasilnya, bayi menjadi lebih tenang dan tidur lebih nyenyak di malam hari.</li>
  <li><strong>Meredakan Kembung dan Sembelit:</strong> Gerakan pijat di perut seperti teknik "I Love U" membantu memperlancar pergerakan gas dan kotoran di usus besar bayi, meredakan kolik, kembung, dan sembelit.</li>
  <li><strong>Memperkuat Sistem Imun:</strong> Stimulasi kulit melancarkan sirkulasi darah dan aliran limfatik, membantu membuang racun, serta meningkatkan aktivitas sel pembunuh alami dalam tubuh untuk menangkal infeksi.</li>
  <li><strong>Mempererat Bonding (Ikatan Kasih Sayang):</strong> Sentuhan kulit ke kulit (skin-to-skin contact) selama pemijatan memicu pelepasan hormon oksitosin baik pada bayi maupun orang tua, menciptakan ikatan batin yang sangat kuat.</li>
</ol>
<p>Pijat bayi sebaiknya dilakukan oleh tenaga profesional seperti bidan homecare berlisensi agar teknik pemijatan aman dan disesuaikan dengan kebutuhan fisiologis si kecil. Hubungi Homecare Bidan Lila untuk menjadwalkan kunjungan Baby Spa & Massage di rumah Bunda!</p>
        `,
        author: "Bidan Lila",
        category: "Kesehatan Anak",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=800&auto=format&fit=crop&q=80",
        keywords: "pijat bayi, baby massage, homecare bayi, bidan lila, manfaat pijat bayi, baby spa terdekat, pijat bayi jakarta",
      },
      {
        title: "Mengatasi ASI Seret dengan Pijat Laktasi: Panduan Lengkap Ibu Menyusui",
        slug: "mengatasi-asi-seret-dengan-pijat-laktasi",
        summary: "ASI tidak lancar sering membuat ibu cemas. Pijat laktasi adalah solusi alami yang terbukti meningkatkan hormon oksitosin dan melancarkan saluran ASI yang tersumbat.",
        content: `
<h3>Pijat Laktasi: Solusi Alami Mengatasi Masalah ASI</h3>
<p>Masalah ASI kurang lancar, tersumbat, atau payudara bengkak adalah keluhan umum yang dialami ibu baru pada minggu-minggu awal pasca melahirkan. Keadaan ini sering memicu kecemasan dan stres, yang justru berujung pada menurunnya produksi ASI lebih jauh. Untuk itu, pijat laktasi hadir sebagai metode terapis fisik alami yang sangat efektif.</p>
<h4>Apa itu Pijat Laktasi?</h4>
<p>Pijat laktasi adalah teknik pemijatan khusus di area kepala, leher, punggung (pijat oksitosin), serta payudara. Tujuannya adalah untuk merangsang produksi hormon menyusui (prolaktin dan oksitosin) dan memperlancar aliran kelenjar susu.</p>
<h4>Manfaat Pijat Laktasi:</h4>
<ul>
  <li><strong>Meningkatkan Refleks Let-Down (LDR):</strong> Stimulasi di punggung memicu kelenjar pituitari di otak memproduksi oksitosin, yang membuat otot-otot di payudara berkontraksi untuk mengalirkan ASI dengan deras.</li>
  <li><strong>Mengatasi Sumbatan ASI (Mastitis Ringan):</strong> Pemijatan lembut di payudara membantu menghancurkan sumbatan lemak ASI di saluran susu (ductus laktiferus), mencegah terjadinya infeksi payudara (mastitis).</li>
  <li><strong>Meredakan Pembengkakan Payudara (Engorgement):</strong> Pijat membantu melunakkan payudara yang keras dan bengkak sehingga bayi dapat menyusu dengan pelekatan (latch-on) yang lebih baik.</li>
  <li><strong>Mencegah Stres pada Ibu Nifas:</strong> Pijatan di kepala dan leher mengurangi ketegangan otot akibat begadang merawat bayi, memberikan efek rileksasi, dan meningkatkan suasana hati ibu.</li>
</ul>
<p>Homecare Bidan Lila menyediakan layanan Pijat Laktasi profesional langsung ke rumah Anda. Bidan kami dibekali keterampilan klinis untuk mengevaluasi posisi menyusui dan membantu Bunda sukses memberikan ASI eksklusif.</p>
        `,
        author: "Bidan Lila",
        category: "Kesehatan Ibu",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
        keywords: "pijat laktasi, melancarkan asi, asi seret, pijat oksitosin, bidan homecare laktasi, homecare ibu menyusui, pijat payudara",
      },
      {
        title: "Panduan Praktis Perawatan Tali Pusat Bayi Baru Lahir secara Aman di Rumah",
        slug: "panduan-perawatan-tali-pusat-newborn",
        summary: "Merawat tali pusat bayi yang baru lahir sering membuat orang tua baru khawatir akan risiko infeksi. Ikuti panduan praktis perawatan tali pusat kering dan steril.",
        content: `
<h3>Merawat Tali Pusat Newborn dengan Tepat dan Higienis</h3>
<p>Tali pusat bayi baru lahir biasanya akan terlepas (puput) dengan sendirinya dalam waktu 7 hingga 14 hari pasca kelahiran. Selama periode ini, sisa tali pusat merupakan pintu masuk potensial bagi kuman penyebab infeksi jika tidak dirawat dengan benar. Sayangnya, masih banyak mitos yang menyarankan pemberian minyak, ramuan tradisional, atau alkohol pada tali pusat.</p>
<p>Berdasarkan rekomendasi Ikatan Dokter Anak Indonesia (IDAI) dan Organisasi Kesehatan Dunia (WHO), berikut adalah panduan perawatan tali pusat yang benar:</p>
<ol>
  <li><strong>Metode Kering & Bersih:</strong> Ini adalah metode terbaik. Tali pusat harus dibiarkan terbuka, bersih, dan kering tanpa dibubuhi zat apapun (alkohol, obat merah, atau minyak).</li>
  <li><strong>Cuci Tangan Terlebih Dahulu:</strong> Selalu cuci tangan menggunakan air mengalir dan sabun antiseptik sebelum memegang tali pusat bayi.</li>
  <li><strong>Menjaga Popok di Bawah Tali Pusat:</strong> Saat memasang popok (sekali pakai atau kain), pastikan bagian depan popok dilipat ke bawah agar tidak menutupi tali pusat. Ini penting untuk menghindari gesekan dan agar tali pusat tidak terkena air seni atau tinja bayi.</li>
  <li><strong>Mandikan Bayi dengan Hati-hati:</strong> Bila tali pusat belum lepas, Anda tetap bisa memandikan bayi dengan menyeka tubuhnya memakai waslap hangat. Hindari merendam tubuh bayi dalam bak mandi terlalu lama agar tali pusat tidak lembab.</li>
  <li><strong>Waspadai Tanda-tanda Infeksi:</strong> Perhatikan jika area sekitar tali pusat tampak merah, bengkak, mengeluarkan nanah, berbau busuk, atau bayi terus-menerus menangis saat tali pusat disentuh. Segera hubungi bidan atau dokter anak.</li>
</ol>
<p>Bila Bunda merasa cemas atau butuh bantuan pertama kali memandikan bayi di rumah, tim Bidan Lila siap berkunjung ke rumah Bunda untuk mendampingi, memberikan perawatan tali pusat, dan mengajari teknik memandikan bayi secara aman.</p>
        `,
        author: "Bidan Lila",
        category: "Kesehatan Anak",
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
        keywords: "perawatan tali pusat, bayi baru lahir, newborn care, merawat tali pusat bayi, bidan homecare jakarta, tips merawat bayi",
      },
    ];

    await Article.bulkCreate(articles);
    console.log("-> Seeded SEO Articles successfully");
  }
}

// Start Server locally if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

export default app;
