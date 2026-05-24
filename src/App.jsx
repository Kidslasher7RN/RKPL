import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Book, Laptop, Package, User, Plus, Bell, Heart, 
  MapPin, Clock, ArrowLeft, ChevronDown, CheckCircle2, 
  Trash2, Edit3, MessageSquare, Filter, X, Menu, Send, Image as ImageIcon,
  AlertTriangle, Shield, ShieldCheck, ShieldAlert, Info
} from 'lucide-react';

// --- MOCK DATA ---
const CURRENT_USER = {
  id: "u1",
  name: "Alex Maba",
  major: "Teknik Informatika",
  semester: 3,
  avatar: "AM",
  creditScore: 100 // Poin kepercayaan maksimal
};

const INITIAL_PRODUCTS = [
  {
    id: "p1",
    title: "Buku Struktur Data & Algoritma Java",
    price: 50000,
    major: "Teknik Informatika",
    condition: "Bekas - Baik",
    category: "Buku",
    sellerId: "u2",
    sellerName: "Budi Kating",
    description: "Bekas pakai untuk matkul Struktur Data. Ada sedikit coretan stabilo. Kondisi masih sangat baik.",
    date: "2 hari yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    icon: Book,
  },
  {
    id: "p2",
    title: "Kalkulator Texas Instruments TI-84 Plus",
    price: 850000,
    major: "Teknik Elektro",
    condition: "Bekas - Seperti Baru",
    category: "Elektronik",
    sellerId: "u3",
    sellerName: "Sarah Teknik",
    description: "Sudah lulus, tidak butuh kalkulator ini lagi. Berfungsi normal.",
    date: "5 jam yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=400",
    icon: Laptop,
  },
  {
    id: "p3",
    title: "Buku Pengantar Pemasaran",
    price: 75000,
    major: "Manajemen Bisnis",
    condition: "Bekas - Cukup",
    category: "Buku",
    sellerId: "u1",
    sellerName: "Alex Maba",
    description: "Sampul agak robek sedikit tapi halaman dalamnya utuh semua.",
    date: "1 minggu yang lalu",
    imageUrl: "data:image/jpeg;base64,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",
    icon: Book,
  },
  {
    id: "p4",
    title: "Catatan Lengkap Anatomi (Semester 1)",
    price: 20000,
    major: "Kedokteran",
    condition: "Digital/Catatan",
    category: "Catatan",
    sellerId: "u4",
    sellerName: "Dr. Tirta (Bukan)",
    description: "Catatan berwarna dan sangat detail mencakup seluruh materi semester 1.",
    date: "1 hari yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
    icon: Package,
  },
  {
    id: "p5",
    title: "MacBook Pro 2020 M1",
    price: 12000000,
    major: "Desain Komunikasi Visual",
    condition: "Bekas - Baik",
    category: "Elektronik",
    sellerId: "u5",
    sellerName: "Clara Desain",
    description: "Sangat cocok untuk rendering dan Adobe CC. Dijual karena mau upgrade.",
    date: "3 hari yang lalu",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
    icon: Laptop,
  },
  {
    id: "p6",
    title: "Arduino Starter Kit Lengkap",
    price: 150000,
    major: "Sistem Informasi",
    condition: "Bekas - Seperti Baru",
    category: "Elektronik",
    sellerId: "u1",
    sellerName: "Alex Maba",
    description: "Baru dipakai sekali untuk tugas akhir. Komponen masih lengkap semua.",
    date: "Baru saja",
    imageUrl: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=400",
    icon: Package,
  },
  {
    id: "p7",
    title: "Mio oli samping",
    price: 7800000,
    major: "Teknik Mesin",
    condition: "Bekas - Cukup",
    category: "Otomotif",
    sellerId: "u8",
    sellerName: "Asep Motor",
    description: "masih banter, habis balapan, no lecet, turun mesin baru 1x",
    date: "Baru saja",
    imageUrl: "https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/2021/09/08/whatsapp-image-2021-09-08-at-10-20210908102835.jpeg",
    icon: Package,
  },
  {
    id: "p8",
    title: "Miniatur patung CLesh of clan",
    price: 24000,
    major: "Umum",
    condition: "Baru",
    category: "Mainan",
    sellerId: "u9",
    sellerName: "Toko Mainan Sidoarjo",
    description: "Mainan anak sidoarjo",
    date: "1 jam yang lalu",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWD9YEyFn0Bcz5-58AxKuj_v3mMdxEqer3RQ&s",
    icon: Package,
  },
  {
    id: "p9",
    title: "Kebayak aseli ngawi-kerto",
    price: 89000,
    major: "Umum",
    condition: "Baru",
    category: "Pakaian",
    sellerId: "u10",
    sellerName: "Siti Fashion",
    description: "Kebayaknya adem banget loh ya",
    date: "3 jam yang lalu",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0EMYKBUgl725OvfHaJPK7nZ-43EwLL3ZmP87NiXRjQ&s=10",
    icon: Package,
  },
  {
    id: "p10",
    title: "sepeda TDR 3000 asli malaysie",
    price: 109000,
    major: "Olahraga",
    condition: "Bekas - Baik",
    category: "Olahraga",
    sellerId: "u11",
    sellerName: "Upin Ipin",
    description: "nenek aku kate, cip sangat",
    date: "4 jam yang lalu",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SnBIoTkGN3mSxuQCLwT9V3ge-frfetCWKQ&s",
    icon: Package,
  },
  {
    id: "p11",
    title: "Durian belanda",
    price: 30000,
    major: "Teknik Pangan",
    condition: "Baru",
    category: "FnB",
    sellerId: "u12",
    sellerName: "Muthu",
    description: "durian yang macam di upin ipin",
    date: "1 hari yang lalu",
    imageUrl: "https://i0.wp.com/4.bp.blogspot.com/-w5y5whLKnqU/UGMlxJyGB_I/AAAAAAAAEjA/1unCjQrTSbw/s1600/P8053533.JPG",
    icon: Package,
  },
  {
    id: "p12",
    title: "Iphon 14 pro second",
    price: 2200000,
    major: "Sistem Informasi",
    condition: "Bekas - Cukup",
    category: "Gadget",
    sellerId: "u13",
    sellerName: "Gadget Murah",
    description: "kondisi 95% normal, IMEI aktif",
    date: "2 hari yang lalu",
    imageUrl: "https://www.viralkata.com/wp-content/uploads/2018/12/iphone-x-meledak.jpg",
    icon: Laptop,
  },
  {
    id: "p13",
    title: "topi gelembung",
    price: 649000,
    major: "Umum",
    condition: "Baru",
    category: "Mainan",
    sellerId: "u14",
    sellerName: "Patrick Star",
    description: "ya, ini topi gelembung",
    date: "3 hari yang lalu",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXU64HDpIJNXKvt859ki_-NqPpkC-PdU0eEQ&s",
    icon: Package,
  },
  {
    id: "p14",
    title: "spatula burger aluminium",
    price: 299000,
    major: "Teknik Mesin Industri",
    condition: "Baru",
    category: "Peralatan",
    sellerId: "u15",
    sellerName: "Spongebob",
    description: "spatula burger spongbob",
    date: "4 hari yang lalu",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavME01HcHWdgckxvffQlwFVGZYWWSKDZYTw&s",
    icon: Package,
  },
];

const INITIAL_WTB = [
  { 
    id: "w1", 
    title: "Mencari Buku Kalkulus 2", 
    budget: "Rp 30.000 - Rp 60.000", 
    major: "Teknik Mesin", 
    authorId: "u6", 
    authorName: "Joni Maba", 
    description: "Butuh buku Kalkulus edisi 8. Kondisi nggak perlu sempurna, yang penting masih bisa dibaca jelas.", 
    date: "1 jam yang lalu", 
    offers: [] 
  },
  { 
    id: "w2", 
    title: "Butuh monitor murah untuk ngoding", 
    budget: "Rp 300.000 - Rp 500.000", 
    major: "Teknik Informatika", 
    authorId: "u1", // Ini punya CURRENT_USER
    authorName: "Alex Maba", 
    description: "Layar laptop kekecilan. Lagi nyari monitor ukuran 24-inch.", 
    date: "2 hari yang lalu",
    offers: [
      {
        offerId: "o1",
        productId: "p2",
        sellerId: "u3",
        sellerName: "Sarah Teknik",
        title: "Kalkulator Texas Instruments TI-84 Plus (MOCK OFFER: Saya ga punya monitor tapi ada kalkulator barangkali butuh)",
        price: 850000,
        imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  { 
    id: "w3", 
    title: "Rangkuman Hukum Bisnis", 
    budget: "Rp 15.000 - Rp 25.000", 
    major: "Manajemen Bisnis", 
    authorId: "u7", 
    authorName: "Jane Doe", 
    description: "Sebentar lagi UTS. Ada yang punya rangkuman bagus untuk kelas Prof. Smith?", 
    date: "4 jam yang lalu", 
    offers: [] 
  },
];

const MAJORS = [
  "Matematika", "Fisika", "Kimia", "Biologi", "Aktuaria", "Statistika",
  "Teknik Mesin", "Teknik Kimia", "Teknik Fisika", "Teknik Industri", "Teknik Material dan Metalurgi", "Teknik Pangan",
  "Teknik Sipil", "Arsitektur", "Teknik Lingkungan", "Teknik Geomatika", "Perencanaan Wilayah dan Kota", "Teknik Geofisika",
  "Teknik Perkapalan", "Teknik Sistem Perkapalan", "Teknik Kelautan", "Transportasi Laut",
  "Teknik Elektro", "Teknik Biomedik", "Teknik Informatika", "Sistem Informasi", "Teknik Komputer", "Teknologi Informasi",
  "Desain Produk Industri", "Desain Interior", "Desain Komunikasi Visual", "Manajemen Bisnis", "Studi Pembangunan",
  "Kedokteran", "Teknologi Kedokteran",
  "Teknik Infrastruktur Sipil", "Teknik Mesin Industri", "Teknik Elektro Otomasi", "Teknik Kimia Industri", "Teknik Instrumentasi", "Statistika Bisnis",
  "Umum"
];

const CATEGORIES = ["Buku", "Elektronik", "Catatan", "Perlengkapan", "Otomotif", "Mainan", "Pakaian", "Olahraga", "FnB", "Gadget", "Peralatan"];

// --- UTILS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
};

const getMajorColor = (major) => {
  if (major.includes("Teknik") || major.includes("Sistem") || major.includes("Teknologi")) return "bg-blue-100 text-blue-800 border-blue-200";
  if (major.includes("Desain") || major.includes("Arsitektur") || major.includes("Perencanaan")) return "bg-purple-100 text-purple-800 border-purple-200";
  if (major.includes("Manajemen") || major.includes("Bisnis") || major.includes("Studi")) return "bg-green-100 text-green-800 border-green-200";
  if (major.includes("Kedokteran") || major.includes("Biologi")) return "bg-red-100 text-red-800 border-red-200";
  if (major.includes("Matematika") || major.includes("Fisika") || major.includes("Kimia") || major.includes("Statistika") || major.includes("Aktuaria")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

// --- COMPONENTS ---
const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-semibold border ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- MAIN APP ---
export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [viewParams, setViewParams] = useState({});
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [wtbPosts, setWtbPosts] = useState(INITIAL_WTB);
  
  const [toast, setToast] = useState(null);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Chat State
  const [chatBox, setChatBox] = useState({ isOpen: false, user: null, messages: [] });
  const [chatInput, setChatInput] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navigate = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
    setIsMobileMenuOpen(false); 
    window.scrollTo(0, 0);
  };

  const openChatWithSeller = (sellerId, sellerName) => {
    setChatBox({
      isOpen: true,
      user: { id: sellerId, name: sellerName },
      messages: [
        { id: 1, sender: sellerName, text: `Halo! Ada yang mau ditanyakan tentang barang saya?`, time: 'Otomatis' }
      ]
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatBox(prev => ({
      ...prev,
      messages: [...prev.messages, { id: Date.now(), sender: 'me', text: chatInput, time: 'Sekarang' }]
    }));
    setChatInput("");

    setTimeout(() => {
      setChatBox(prev => ({
        ...prev,
        messages: [...prev.messages, { id: Date.now(), sender: prev.user.name, text: 'Baik, sebentar ya saya cek dulu barangnya.', time: 'Sekarang' }]
      }));
    }, 1500);
  };

  // --- VIEWS ---
  
  const HomeView = () => {
    const [search, setSearch] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("Semua");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredProducts = useMemo(() => {
      return products.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchMajor = selectedMajor === "Semua" || p.major === selectedMajor;
        const matchCategory = selectedCategory === "Semua" || p.category === selectedCategory;
        return matchSearch && matchMajor && matchCategory;
      });
    }, [products, search, selectedMajor, selectedCategory]);

    return (
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6 hidden md:block">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 flex items-center mb-4">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jurusan / Fakultas</label>
                <select 
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                >
                  <option value="Semua">Semua Jurusan</option>
                  {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="category" value="Semua" checked={selectedCategory === "Semua"} onChange={(e) => setSelectedCategory(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Semua Kategori</span>
                  </label>
                  {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center">
                      <input type="radio" name="category" value={c} checked={selectedCategory === c} onChange={(e) => setSelectedCategory(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-600">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ingin Menjual (WTS)</h2>
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Cari barang..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Mobile Filter Toggles */}
          <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
            <select 
              className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border flex-shrink-0"
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
              <option value="Semua">Semua Jurusan</option>
              {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select 
              className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border flex-shrink-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Semua">Semua Kategori</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Barang tidak ditemukan</h3>
              <p className="text-gray-500 mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map(product => {
                const Icon = product.icon || Package;
                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group flex flex-col"
                    onClick={() => navigate("productDetail", { id: product.id })}
                  >
                    <div className="h-32 sm:h-48 bg-gray-50 flex items-center justify-center relative border-b border-gray-100 overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 absolute inset-0"
                        />
                      ) : (
                        <Icon className="w-10 h-10 sm:w-16 sm:h-16 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                        <Badge className={getMajorColor(product.major)}>{product.major}</Badge>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
                      </div>
                      <p className="text-base sm:text-xl font-bold text-indigo-600 mb-2">{formatCurrency(product.price)}</p>
                      <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                        <span className="flex items-center truncate max-w-full"><User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" /> <span className="truncate">{product.sellerName}</span></span>
                        <span className="truncate">{product.condition}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProductDetailView = () => {
    const product = products.find(p => p.id === viewParams.id);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState("");

    if (!product) return <div>Barang tidak ditemukan</div>;
    const Icon = product.icon || Package;

    const submitReport = (e) => {
      e.preventDefault();
      setIsReportOpen(false);
      showToast("Laporan berhasil diteruskan ke Admin untuk ditinjau.", "success");
    };

    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("home")} className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Katalog
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className={`md:w-1/2 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 min-h-[300px] relative overflow-hidden ${product.imageUrl ? 'p-0' : 'p-12'}`}>
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <Icon className="w-32 h-32 text-gray-300" />
            )}
          </div>
          
          <div className="md:w-1/2 p-8 flex flex-col">
            <div className="mb-4 flex gap-2 flex-wrap">
              <Badge className={getMajorColor(product.major)}>{product.major}</Badge>
              <Badge className="bg-gray-100 text-gray-700">{product.category}</Badge>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6">{formatCurrency(product.price)}</p>
            
            <div className="space-y-4 mb-8 flex-1">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Kondisi</h3>
                <p className="text-gray-900">{product.condition}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deskripsi</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                    {product.sellerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.sellerName}</p>
                    <p className="text-xs text-gray-500">Diposting {product.date}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => openChatWithSeller(product.sellerId, product.sellerName)}>
                  <MessageSquare className="w-4 h-4 mr-2" /> Hubungi Penjual
                </Button>
                <Button variant="outline" className="px-3" onClick={() => showToast("Ditambahkan ke Wishlist!", "success")}>
                  <Heart className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
              
              {/* Report Button */}
              {product.sellerId !== CURRENT_USER.id && (
                <button 
                  onClick={() => setIsReportOpen(true)} 
                  className="mt-6 flex items-center justify-center w-full text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4 mr-1.5" /> Laporkan Barang Ini
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Report Modal */}
        {isReportOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center"><AlertTriangle className="w-5 h-5 text-red-500 mr-2" /> Lapor ke Admin</h3>
                <button onClick={() => setIsReportOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Bantu kami menjaga lingkungan kampus tetap aman. Apa yang salah dengan iklan ini? (Jika laporan valid, Skor Kredit penjual akan dikurangi).
              </p>
              
              <form onSubmit={submitReport} className="space-y-4">
                <div className="space-y-2">
                  {["Barang palsu/penipuan", "Harga tidak masuk akal", "Konten tidak pantas", "Barang tidak relevan dengan kampus", "Lainnya"].map(reason => (
                    <label key={reason} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="reportReason" 
                        required
                        value={reason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-red-600 focus:ring-red-500 mr-3"
                      />
                      <span className="text-sm font-medium text-gray-800">{reason}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="secondary" type="button" onClick={() => setIsReportOpen(false)}>Batal</Button>
                  <Button variant="danger" type="submit">Kirim Laporan</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const WTBForumView = () => {
    const [selectedMajor, setSelectedMajor] = useState("Semua");

    const filteredWtb = useMemo(() => {
      return wtbPosts.filter(w => selectedMajor === "Semua" || w.major === selectedMajor);
    }, [wtbPosts, selectedMajor]);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Forum Permintaan (WTB)</h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Lihat barang apa yang sedang dicari mahasiswa lain dan tawarkan barangmu.</p>
          </div>
          <Button onClick={() => navigate("createWTB")}>
            <Plus className="w-4 h-4 mr-2" /> Buat Permintaan
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-4 overflow-x-auto">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:inline">Filter Jurusan:</span>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedMajor === "Semua" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setSelectedMajor("Semua")}
            >
              Semua
            </button>
            {MAJORS.map(m => (
              <button 
                key={m}
                className={`px-3 py-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedMajor === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setSelectedMajor(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {filteredWtb.length === 0 ? (
           <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Belum ada permintaan</h3>
            <p className="text-gray-500 mt-1">Jadilah yang pertama membuat permintaan (WTB) untuk jurusan ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWtb.map(post => (
              <div key={post.id} className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getMajorColor(post.major)}>{post.major}</Badge>
                    <span className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1"/> {post.date}</span>
                    {post.offers && post.offers.length > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center">
                        {post.offers.length} Penawaran
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                     <span className="flex items-center sm:mr-4"><User className="w-4 h-4 mr-1" /> {post.authorName}</span>
                     <span className="font-semibold text-gray-700">Anggaran: {post.budget}</span>
                  </div>
                </div>
                <div className="sm:w-48 flex items-center justify-center sm:border-l border-gray-100 sm:pl-6 pt-2 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0">
                  <Button className="w-full" onClick={() => navigate("wtbDetail", { id: post.id })}>
                    Lihat Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const WTBDetailView = () => {
    const post = wtbPosts.find((p) => p.id === viewParams.id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState("");
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState("");

    if (!post) return <div>Postingan tidak ditemukan</div>;

    const myWTSListings = products.filter(
      (p) => p.sellerId === CURRENT_USER.id,
    );

    const myExistingOffer = post.offers?.find(o => o.sellerId === CURRENT_USER.id);

    const handleOfferSubmit = () => {
      if (!selectedOfferId) return;

      const offeredProduct = products.find((p) => p.id === selectedOfferId);

      // Update WTB Posts with the new offer
      setWtbPosts((prev) =>
        prev.map((p) => {
          if (p.id === post.id) {
            return {
              ...p,
              offers: [
                ...(p.offers || []),
                {
                  offerId: `o${Date.now()}`,
                  productId: offeredProduct.id,
                  sellerId: offeredProduct.sellerId,
                  sellerName: offeredProduct.sellerName,
                  title: offeredProduct.title,
                  price: offeredProduct.price,
                  imageUrl: offeredProduct.imageUrl,
                },
              ],
            };
          }
          return p;
        }),
      );

      setIsModalOpen(false);
      showToast("Penawaran barangmu berhasil dikirim!", "success");
    };

    const handleRejectOffer = (offerId) => {
      setWtbPosts(prev => prev.map(p => {
        if (p.id === post.id) {
          return { ...p, offers: p.offers.filter(o => o.offerId !== offerId) };
        }
        return p;
      }));
      showToast("Penawaran ditolak, notifikasi telah dikirim ke penjual.");
    };

    const handleCancelOffer = (offerId) => {
      setWtbPosts(prev => prev.map(p => {
        if (p.id === post.id) {
          return { ...p, offers: p.offers.filter(o => o.offerId !== offerId) };
        }
        return p;
      }));
      showToast("Penawaran berhasil dibatalkan.");
    };

    const submitReport = (e) => {
      e.preventDefault();
      setIsReportOpen(false);
      showToast("Laporan WTB berhasil diteruskan ke Admin.", "success");
    };

    const isMyPost = post.authorId === CURRENT_USER.id;

    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("wtb")}
          className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar WTB
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={getMajorColor(post.major)}>{post.major}</Badge>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
            <p className="text-sm text-gray-500 mb-1">Estimasi Anggaran</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {post.budget}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Deskripsi Kebutuhan
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-4">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  {post.authorName}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Mahasiswa (Pembeli)
                </p>
              </div>
            </div>
          </div>

          {/* Action Area based on Ownership */}
          {!isMyPost && (
            <div className="mt-8 flex flex-col gap-4">
              {myExistingOffer ? (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-indigo-800 mb-3">Anda telah menawarkan barang pada postingan ini:</p>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-indigo-50">
                     {myExistingOffer.imageUrl ? (
                       <img src={myExistingOffer.imageUrl} alt="" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                     ) : (
                       <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                         <Package className="w-6 h-6 text-gray-400" />
                       </div>
                     )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{myExistingOffer.title}</p>
                      <p className="text-xs text-indigo-600 font-semibold">{formatCurrency(myExistingOffer.price)}</p>
                    </div>
                    <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => handleCancelOffer(myExistingOffer.offerId)}>Batalkan Penawaran</Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full sm:w-auto py-3 px-8 text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Package className="w-5 h-5 mr-2" /> Tawarkan Barang Saya
                </Button>
              )}

              {/* Report Button for WTB */}
              <button 
                onClick={() => setIsReportOpen(true)} 
                className="flex items-center justify-start sm:w-auto text-sm font-medium text-red-500 hover:text-red-700 transition-colors mt-2"
              >
                <AlertTriangle className="w-4 h-4 mr-1.5" /> Laporkan Postingan Ini
              </button>
            </div>
          )}
        </div>

        {/* Section: Incoming Offers (Only visible to the post author) */}
        {isMyPost && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              Penawaran Masuk
              <span className="ml-3 bg-indigo-100 text-indigo-700 text-sm py-0.5 px-3 rounded-full font-bold">
                {post.offers?.length || 0}
              </span>
            </h3>

            {!post.offers || post.offers.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  Belum ada mahasiswa lain yang menawarkan barangnya.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {post.offers.map((offer) => (
                  <div
                    key={offer.offerId}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-4 flex-1 w-full">
                      {offer.imageUrl ? (
                        <img
                          src={offer.imageUrl}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 line-clamp-1">
                          {offer.title}
                        </h4>
                        <p className="text-indigo-600 font-bold mb-1">
                          {formatCurrency(offer.price)}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center">
                          Ditawarkan oleh:{" "}
                          <span className="font-medium text-gray-700 ml-1">
                            {offer.sellerName}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <Button
                        variant="secondary"
                        className="flex-1 sm:flex-none text-xs px-3"
                        onClick={() => navigate("productDetail", {id: offer.productId})}
                      >
                        Detail Barang
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 sm:flex-none text-xs px-3"
                        onClick={() => handleRejectOffer(offer.offerId)}
                      >
                        Tolak
                      </Button>
                      <Button
                        className="flex-1 sm:flex-none text-xs px-3"
                        onClick={() =>
                          openChatWithSeller(offer.sellerId, offer.sellerName)
                        }
                      >
                        <MessageSquare className="w-3 h-3 mr-1.5" /> Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Offer Modal (For other users) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Tawarkan Barang</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Pilih salah satu barang WTS yang kamu jual untuk ditawarkan ke <strong>{post.authorName}</strong>.
              </p>
              
              {myWTSListings.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                  <p className="text-gray-500 text-sm mb-3">Kamu belum membuat iklan barang (WTS).</p>
                  <Button variant="outline" onClick={() => { setIsModalOpen(false); navigate("createWTS"); }}>
                    Buat Iklan Dulu
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                  {myWTSListings.map(item => (
                    <label key={item.id} className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${selectedOfferId === item.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name="offerItem" 
                        value={item.id}
                        checked={selectedOfferId === item.id}
                        onChange={(e) => setSelectedOfferId(e.target.value)}
                        className="mt-1 mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex gap-3">
                         {item.imageUrl ? (
                           <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                         ) : (
                           <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                             <Package className="w-6 h-6 text-gray-400" />
                           </div>
                         )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{item.title}</p>
                          <p className="text-xs sm:text-sm text-indigo-600 font-semibold">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  disabled={!selectedOfferId || myWTSListings.length === 0}
                  onClick={handleOfferSubmit}
                  className={
                    !selectedOfferId || myWTSListings.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                >
                  Kirim Penawaran
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {isReportOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center"><AlertTriangle className="w-5 h-5 text-red-500 mr-2" /> Lapor ke Admin</h3>
                <button onClick={() => setIsReportOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Bantu kami menjaga lingkungan kampus tetap aman. Apa yang salah dengan postingan WTB ini?
              </p>
              
              <form onSubmit={submitReport} className="space-y-4">
                <div className="space-y-2">
                  {["Harga tidak masuk akal", "Konten tidak pantas", "Permintaan fiktif/spam", "Lainnya"].map(reason => (
                    <label key={reason} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="reportReason" 
                        required
                        value={reason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-red-600 focus:ring-red-500 mr-3"
                      />
                      <span className="text-sm font-medium text-gray-800">{reason}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="secondary" type="button" onClick={() => setIsReportOpen(false)}>Batal</Button>
                  <Button variant="danger" type="submit">Kirim Laporan</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CreateWTSView = () => {
    const [formData, setFormData] = useState({
      title: "", price: "", major: "Umum", condition: "Bekas - Baik", category: "Buku", description: "", imageUrl: ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newProduct = {
        ...formData,
        id: `p${Date.now()}`,
        price: parseInt(formData.price),
        sellerId: CURRENT_USER.id,
        sellerName: CURRENT_USER.name,
        date: "Baru saja",
        icon: formData.category === "Elektronik" ? Laptop : (formData.category === "Buku" ? Book : Package)
      };
      setProducts([newProduct, ...products]);
      showToast("Iklan berhasil dibuat!");
      navigate("dashboard");
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Buat Iklan Jual (WTS)</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
          
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 mb-6 overflow-hidden relative">
            {formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg absolute inset-0 m-auto" />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3" />
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Gambar Produk</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Masukkan URL gambar di bawah</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (Opsional)</label>
              <input type="url" className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="https://example.com/image.jpg" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
              <input required type="text" className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Cth: Buku Kalkulus Edisi 8" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (IDR)</label>
              <input required type="number" min="0" className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="50000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan Terkait</label>
              <select className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})}>
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi</label>
              <select className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
                <option>Baru</option>
                <option>Bekas - Seperti Baru</option>
                <option>Bekas - Baik</option>
                <option>Bekas - Cukup</option>
                <option>Digital/Catatan</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Lengkap</label>
              <textarea required rows={4} className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Jelaskan kondisi barang, kekurangan, kelengkapan, dll." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => navigate("home")}>Batal</Button>
            <Button type="submit">Terbitkan Iklan</Button>
          </div>
        </form>
      </div>
    );
  };

  const CreateWTBView = () => {
    const [formData, setFormData] = useState({
      title: "", budget: "", major: "Umum", description: ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newPost = {
        ...formData,
        id: `w${Date.now()}`,
        authorId: CURRENT_USER.id,
        authorName: CURRENT_USER.name,
        date: "Baru saja",
        offers: []
      };
      setWtbPosts([newPost, ...wtbPosts]);
      showToast("Permintaan WTB berhasil diposting!");
      navigate("dashboard");
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Buat Permintaan (WTB)</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Apa yang sedang kamu cari?</label>
              <input required type="text" className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Cth: Butuh pentablet murah" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimasi Anggaran</label>
              <input required type="text" className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Cth: Rp 200.000 - Rp 300.000" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan Terkait</label>
              <select className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})}>
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Detail Tambahan</label>
              <textarea required rows={4} className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Berikan info lebih spesifik tentang barang yang kamu butuhkan..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => navigate("wtb")}>Batal</Button>
            <Button type="submit">Posting Permintaan</Button>
          </div>
        </form>
      </div>
    );
  };

  const DashboardView = () => {
    const [activeTab, setActiveTab] = useState("wts");
    
    const myWTSListings = products.filter(p => p.sellerId === CURRENT_USER.id);
    const myWTBRequests = wtbPosts.filter(w => w.authorId === CURRENT_USER.id);

    const handleDeleteWTS = (id) => {
      setProducts(products.filter(p => p.id !== id));
      showToast("Iklan berhasil dihapus", "success");
    };

    const handleDeleteWTB = (id) => {
      setWtbPosts(wtbPosts.filter(w => w.id !== id));
      showToast("Permintaan berhasil dihapus", "success");
    };

    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dasbor Saya</h2>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-gray-200 flex-col sm:flex-row">
            <button 
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'wts' ? 'text-indigo-600 border-b-2 sm:border-b-2 sm:border-l-0 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('wts')}
            >
              Barang Jualan (WTS)
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{myWTSListings.length}</span>
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'wtb' ? 'text-indigo-600 border-b-2 sm:border-b-2 sm:border-l-0 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('wtb')}
            >
              Permintaan Saya (WTB)
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{myWTBRequests.length}</span>
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'wts' && (
              myWTSListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">Kamu tidak memiliki iklan aktif saat ini.</p>
                  <Button onClick={() => navigate("createWTS")}>Buat Iklan WTS Baru</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myWTSListings.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden relative">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover absolute inset-0" />
                          ) : (
                            item.icon ? <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" /> : <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</h4>
                          <p className="text-indigo-600 font-medium text-sm sm:text-base">{formatCurrency(item.price)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getMajorColor(item.major)}>{item.major}</Badge>
                            <span className="text-xs text-gray-500">Aktif</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none px-3" onClick={() => showToast("Fitur edit belum tersedia")}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="danger" className="flex-1 sm:flex-none px-3" onClick={() => handleDeleteWTS(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'wtb' && (
              myWTBRequests.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">Kamu belum membuat postingan pencarian.</p>
                  <Button onClick={() => navigate("createWTB")}>Buat WTB</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myWTBRequests.map(post => (
                    <div key={post.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-full sm:w-auto mb-4 sm:mb-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{post.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1">Anggaran: {post.budget}</p>
                        <div className="flex items-center gap-2">
                           <Badge className={getMajorColor(post.major)}>{post.major}</Badge>
                           {post.offers && post.offers.length > 0 && (
                             <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                               {post.offers.length} Penawaran Masuk
                             </span>
                           )}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none px-3 relative" onClick={() => navigate("wtbDetail", { id: post.id })}>
                          Lihat Postingan
                          {post.offers && post.offers.length > 0 && (
                             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                          )}
                        </Button>
                        <Button variant="danger" className="flex-1 sm:flex-none px-3" onClick={() => handleDeleteWTB(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProfileView = () => {
    
    // UI logic for Credit Score Shield Color
    const getShieldIcon = (score) => {
      if (score >= 80) return <ShieldCheck className="w-10 h-10 text-green-500" />;
      if (score >= 50) return <ShieldAlert className="w-10 h-10 text-yellow-500" />;
      return <Shield className="w-10 h-10 text-red-500" />;
    };

    const getScoreColor = (score) => {
      if (score >= 80) return "text-green-600";
      if (score >= 50) return "text-yellow-600";
      return "text-red-600";
    };

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-24 sm:h-32 bg-indigo-600 relative">
            <div className="absolute -bottom-10 sm:-bottom-12 left-6 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-1 shadow-md">
              <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl sm:text-2xl font-bold">
                {CURRENT_USER.avatar}
              </div>
            </div>
          </div>
          
          <div className="pt-14 sm:pt-16 px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{CURRENT_USER.name}</h2>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center"><Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {CURRENT_USER.major}</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Semester {CURRENT_USER.semester}</span>
                  <span className="flex items-center"><MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Area Kampus</span>
                </div>
              </div>
            </div>

            {/* Credit Score / Trust Status Panel */}
            <div className="mt-8 bg-gray-50 border border-gray-100 p-4 sm:p-5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getShieldIcon(CURRENT_USER.creditScore)}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 font-medium">Skor Kepercayaan</p>
                    <div className="group relative cursor-help">
                      <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center">
                        Skor akan menurun jika akun menerima peringatan, pembekuan, atau laporan valid dari admin.
                      </div>
                    </div>
                  </div>
                  <p className={`text-2xl sm:text-3xl font-bold ${getScoreColor(CURRENT_USER.creditScore)}`}>
                    {CURRENT_USER.creditScore} <span className="text-lg text-gray-400 font-medium">/ 100</span>
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <Button variant="outline" className="text-xs bg-white" onClick={() => showToast("Status akun saat ini AMAN", "success")}>Lihat Riwayat Laporan</Button>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-6 sm:pt-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Statistik Akun</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl text-center">
                  <p className="text-xl sm:text-2xl font-bold text-indigo-600">{products.filter(p => p.sellerId === CURRENT_USER.id).length}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase mt-1">WTS Aktif</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl text-center">
                  <p className="text-xl sm:text-2xl font-bold text-indigo-600">{wtbPosts.filter(p => p.authorId === CURRENT_USER.id).length}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase mt-1">WTB Aktif</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1" onClick={() => showToast("Fitur edit profil belum tersedia")}>Edit Profil</Button>
              <Button variant="danger" className="flex-1" onClick={() => showToast("Berhasil Keluar (Mock)")}>Keluar</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDER CONTROLLER ---
  const renderView = () => {
    switch (currentView) {
      case "home": return <HomeView />;
      case "productDetail": return <ProductDetailView />;
      case "wtb": return <WTBForumView />;
      case "wtbDetail": return <WTBDetailView />;
      case "createWTS": return <CreateWTSView />;
      case "createWTB": return <CreateWTBView />;
      case "dashboard": return <DashboardView />;
      case "profile": return <ProfileView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 -ml-2 mr-2 text-gray-400 hover:text-gray-500"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div 
                className="flex-shrink-0 flex items-center cursor-pointer group"
                onClick={() => navigate("home")}
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 group-hover:bg-indigo-700 transition-colors">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">ITStuku</span>
              </div>
              
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <button 
                  onClick={() => navigate("home")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${currentView === 'home' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                >
                  Cari Barang (WTS)
                </button>
                <button 
                  onClick={() => navigate("wtb")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${currentView === 'wtb' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                >
                  Forum Permintaan (WTB)
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden md:block">
                <Button 
                  variant="primary" 
                  className="!rounded-full px-5 shadow-sm"
                  onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Buat
                </Button>
                {/* Dropdown for create */}
                {isCreateDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <button onClick={() => { navigate("createWTS"); setIsCreateDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Jual Barang (WTS)</button>
                    <button onClick={() => { navigate("createWTB"); setIsCreateDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Buat Permintaan (WTB)</button>
                  </div>
                )}
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors hidden sm:block">
                <Bell className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigate("dashboard")}
                className={`p-2 transition-colors rounded-full hidden md:block ${currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500'}`}
                title="Dasbor"
              >
                <Package className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigate("profile")}
                className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold ml-2 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 transition-all hidden md:flex"
              >
                {CURRENT_USER.avatar}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-md absolute w-full z-50">
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => navigate("home")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === 'home' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
              >
                Cari Barang (WTS)
              </button>
              <button
                onClick={() => navigate("wtb")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === 'wtb' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
              >
                Forum Permintaan (WTB)
              </button>
              <button
                onClick={() => navigate("createWTS")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === 'createWTS' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
              >
                Jual Barang (WTS)
              </button>
              <button
                onClick={() => navigate("createWTB")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === 'createWTB' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
              >
                Buat Permintaan (WTB)
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {CURRENT_USER.avatar}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{CURRENT_USER.name}</div>
                  <div className="text-sm font-medium text-gray-500">{CURRENT_USER.major}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => navigate("dashboard")}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  Dasbor
                </button>
                <button
                  onClick={() => navigate("profile")}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  Profil
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderView()}
      </main>

      {/* Floating Chat Modal */}
      {chatBox.isOpen && (
        <div className="fixed bottom-4 right-4 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-indigo-600 px-4 py-3 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center font-bold text-sm text-white">
                {chatBox.user.name.charAt(0)}
              </div>
              <span className="font-semibold">{chatBox.user.name}</span>
            </div>
            <button onClick={() => setChatBox(prev => ({ ...prev, isOpen: false }))} className="text-indigo-200 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-64 sm:h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {chatBox.messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button type="submit" disabled={!chatInput.trim()} className={`p-2 rounded-lg transition-colors flex items-center justify-center ${chatInput.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400'}`}>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Toast Notification System */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
            <span className="font-medium text-sm whitespace-nowrap">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-4 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}