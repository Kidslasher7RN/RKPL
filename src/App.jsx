import React, {useState, useEffect, useMemo} from "react";
import {
  Search,
  Book,
  Laptop,
  Package,
  User,
  Plus,
  Bell,
  Heart,
  MapPin,
  Clock,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Trash2,
  Edit3,
  MessageSquare,
  Filter,
  X,
  Menu,
  Send,
  Image as ImageIcon,
} from "lucide-react";

// --- MOCK DATA ---
const CURRENT_USER = {
  id: "u1",
  name: "Alex Maba",
  major: "Teknik Informatika",
  semester: 3,
  avatar: "AM",
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
    description:
      "Bekas pakai untuk matkul Struktur Data. Ada sedikit coretan stabilo. Kondisi masih sangat baik.",
    date: "2 hari yang lalu",
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
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
    description:
      "Sudah lulus, tidak butuh kalkulator ini lagi. Berfungsi normal.",
    date: "5 jam yang lalu",
    imageUrl:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=400",
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
    imageUrl:
      "data:image/jpeg;base64,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",
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
    description:
      "Catatan berwarna dan sangat detail mencakup seluruh materi semester 1.",
    date: "1 hari yang lalu",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
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
    description:
      "Sangat cocok untuk rendering dan Adobe CC. Dijual karena mau upgrade.",
    date: "3 hari yang lalu",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
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
    description:
      "Baru dipakai sekali untuk tugas akhir. Komponen masih lengkap semua.",
    date: "Baru saja",
    imageUrl:
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=400",
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
    imageUrl:
      "https://imgx.gridoto.com/crop/0x0:0x0/700x465/filters:watermark(file/2017/gridoto/img/watermark.png,5,5,60)/photo/2021/09/08/whatsapp-image-2021-09-08-at-10-20210908102835.jpeg",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWD9YEyFn0Bcz5-58AxKuj_v3mMdxEqer3RQ&s",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0EMYKBUgl725OvfHaJPK7nZ-43EwLL3ZmP87NiXRjQ&s=10",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SnBIoTkGN3mSxuQCLwT9V3ge-frfetCWKQ&s",
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
    imageUrl:
      "https://i0.wp.com/4.bp.blogspot.com/-w5y5whLKnqU/UGMlxJyGB_I/AAAAAAAAEjA/1unCjQrTSbw/s1600/P8053533.JPG",
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
    imageUrl:
      "https://www.viralkata.com/wp-content/uploads/2018/12/iphone-x-meledak.jpg",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXU64HDpIJNXKvt859ki_-NqPpkC-PdU0eEQ&s",
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
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavME01HcHWdgckxvffQlwFVGZYWWSKDZYTw&s",
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
    description:
      "Butuh buku Kalkulus edisi 8. Kondisi nggak perlu sempurna, yang penting masih bisa dibaca jelas.",
    date: "1 jam yang lalu",
  },
  {
    id: "w2",
    title: "Butuh monitor murah untuk ngoding",
    budget: "Rp 300.000 - Rp 500.000",
    major: "Teknik Informatika",
    authorId: "u1",
    authorName: "Alex Maba",
    description: "Layar laptop kekecilan. Lagi nyari monitor ukuran 24-inch.",
    date: "2 hari yang lalu",
  },
  {
    id: "w3",
    title: "Rangkuman Hukum Bisnis",
    budget: "Rp 15.000 - Rp 25.000",
    major: "Manajemen Bisnis",
    authorId: "u7",
    authorName: "Jane Doe",
    description:
      "Sebentar lagi UTS. Ada yang punya rangkuman bagus untuk kelas Prof. Smith?",
    date: "4 jam yang lalu",
  },
];

const MAJORS = [
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Aktuaria",
  "Statistika",
  "Teknik Mesin",
  "Teknik Kimia",
  "Teknik Fisika",
  "Teknik Industri",
  "Teknik Material dan Metalurgi",
  "Teknik Pangan",
  "Teknik Sipil",
  "Arsitektur",
  "Teknik Lingkungan",
  "Teknik Geomatika",
  "Perencanaan Wilayah dan Kota",
  "Teknik Geofisika",
  "Teknik Perkapalan",
  "Teknik Sistem Perkapalan",
  "Teknik Kelautan",
  "Transportasi Laut",
  "Teknik Elektro",
  "Teknik Biomedik",
  "Teknik Informatika",
  "Sistem Informasi",
  "Teknik Komputer",
  "Teknologi Informasi",
  "Desain Produk Industri",
  "Desain Interior",
  "Desain Komunikasi Visual",
  "Manajemen Bisnis",
  "Studi Pembangunan",
  "Kedokteran",
  "Teknologi Kedokteran",
  "Teknik Infrastruktur Sipil",
  "Teknik Mesin Industri",
  "Teknik Elektro Otomasi",
  "Teknik Kimia Industri",
  "Teknik Instrumentasi",
  "Statistika Bisnis",
  "Umum",
];

const CATEGORIES = [
  "Buku",
  "Elektronik",
  "Catatan",
  "Perlengkapan",
  "Otomotif",
  "Mainan",
  "Pakaian",
  "Olahraga",
  "FnB",
  "Gadget",
  "Peralatan",
];

// --- UTILS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getMajorColor = (major) => {
  if (
    major.includes("Teknik") ||
    major.includes("Sistem") ||
    major.includes("Teknologi")
  )
    return "bg-blue-100 text-blue-800 border-blue-200";
  if (
    major.includes("Desain") ||
    major.includes("Arsitektur") ||
    major.includes("Perencanaan")
  )
    return "bg-purple-100 text-purple-800 border-purple-200";
  if (
    major.includes("Manajemen") ||
    major.includes("Bisnis") ||
    major.includes("Studi")
  )
    return "bg-green-100 text-green-800 border-green-200";
  if (major.includes("Kedokteran") || major.includes("Biologi"))
    return "bg-red-100 text-red-800 border-red-200";
  if (
    major.includes("Matematika") ||
    major.includes("Fisika") ||
    major.includes("Kimia") ||
    major.includes("Statistika") ||
    major.includes("Aktuaria")
  )
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

// --- COMPONENTS ---
const Badge = ({children, className = ""}) => (
  <span
    className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-semibold border ${className}`}
  >
    {children}
  </span>
);

const Button = ({children, variant = "primary", className = "", ...props}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
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
  const [chatBox, setChatBox] = useState({
    isOpen: false,
    user: null,
    messages: [],
  });
  const [chatInput, setChatInput] = useState("");

  const showToast = (message, type = "success") => {
    setToast({message, type});
    setTimeout(() => setToast(null), 3000);
  };

  const navigate = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
    setIsMobileMenuOpen(false); // Tutup menu mobile saat navigasi
    window.scrollTo(0, 0);
  };

  const openChatWithSeller = (sellerId, sellerName) => {
    setChatBox({
      isOpen: true,
      user: {id: sellerId, name: sellerName},
      messages: [
        {
          id: 1,
          sender: sellerName,
          text: `Halo! Ada yang mau ditanyakan tentang barang saya?`,
          time: "Otomatis",
        },
      ],
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Tambah pesan user
    setChatBox((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {id: Date.now(), sender: "me", text: chatInput, time: "Sekarang"},
      ],
    }));
    setChatInput("");

    // Balasan mock otomatis
    setTimeout(() => {
      setChatBox((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            sender: prev.user.name,
            text: "Baik, sebentar ya saya cek dulu barangnya.",
            time: "Sekarang",
          },
        ],
      }));
    }, 1500);
  };

  // --- VIEWS ---

  const HomeView = () => {
    const [search, setSearch] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("Semua");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredProducts = useMemo(() => {
      return products.filter((p) => {
        const matchSearch = p.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchMajor =
          selectedMajor === "Semua" || p.major === selectedMajor;
        const matchCategory =
          selectedCategory === "Semua" || p.category === selectedCategory;
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jurusan / Fakultas
                </label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                >
                  <option value="Semua">Semua Jurusan</option>
                  {MAJORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="Semua"
                      checked={selectedCategory === "Semua"}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Semua Kategori
                    </span>
                  </label>
                  {CATEGORIES.map((c) => (
                    <label key={c} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={c}
                        checked={selectedCategory === c}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Ingin Menjual (WTS)
            </h2>
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
              {MAJORS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border flex-shrink-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Semua">Semua Kategori</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">
                Barang tidak ditemukan
              </h3>
              <p className="text-gray-500 mt-1">
                Coba sesuaikan filter atau kata kunci pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((product) => {
                const Icon = product.icon || Package;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group flex flex-col"
                    onClick={() => navigate("productDetail", {id: product.id})}
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
                        <Badge className={getMajorColor(product.major)}>
                          {product.major}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2">
                          {product.title}
                        </h3>
                      </div>
                      <p className="text-base sm:text-xl font-bold text-indigo-600 mb-2">
                        {formatCurrency(product.price)}
                      </p>
                      <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                        <span className="flex items-center truncate max-w-full">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />{" "}
                          <span className="truncate">{product.sellerName}</span>
                        </span>
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
    const product = products.find((p) => p.id === viewParams.id);
    if (!product) return <div>Barang tidak ditemukan</div>;
    const Icon = product.icon || Package;

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("home")}
          className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Katalog
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div
            className={`md:w-1/2 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 min-h-[300px] relative overflow-hidden ${product.imageUrl ? "p-0" : "p-12"}`}
          >
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
              <Badge className={getMajorColor(product.major)}>
                {product.major}
              </Badge>
              <Badge className="bg-gray-100 text-gray-700">
                {product.category}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6">
              {formatCurrency(product.price)}
            </p>

            <div className="space-y-4 mb-8 flex-1">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Kondisi</h3>
                <p className="text-gray-900">{product.condition}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deskripsi</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                    {product.sellerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.sellerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Diposting {product.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() =>
                    openChatWithSeller(product.sellerId, product.sellerName)
                  }
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Hubungi Penjual
                </Button>
                <Button
                  variant="outline"
                  className="px-3"
                  onClick={() =>
                    showToast("Ditambahkan ke Wishlist!", "success")
                  }
                >
                  <Heart className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WTBForumView = () => {
    const [selectedMajor, setSelectedMajor] = useState("Semua");

    const filteredWtb = useMemo(() => {
      return wtbPosts.filter(
        (w) => selectedMajor === "Semua" || w.major === selectedMajor,
      );
    }, [wtbPosts, selectedMajor]);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Forum Permintaan (WTB)
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Lihat barang apa yang sedang dicari mahasiswa lain dan tawarkan
              barangmu.
            </p>
          </div>
          <Button onClick={() => navigate("createWTB")}>
            <Plus className="w-4 h-4 mr-2" /> Buat Permintaan
          </Button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center gap-4 overflow-x-auto">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:inline">
            Filter Jurusan:
          </span>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedMajor === "Semua" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => setSelectedMajor("Semua")}
            >
              Semua
            </button>
            {MAJORS.map((m) => (
              <button
                key={m}
                className={`px-3 py-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedMajor === m ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
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
            <h3 className="text-lg font-medium text-gray-900">
              Belum ada permintaan
            </h3>
            <p className="text-gray-500 mt-1">
              Jadilah yang pertama membuat permintaan (WTB) untuk jurusan ini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWtb.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getMajorColor(post.major)}>
                      {post.major}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
                    <span className="flex items-center sm:mr-4">
                      <User className="w-4 h-4 mr-1" /> {post.authorName}
                    </span>
                    <span className="font-semibold text-gray-700">
                      Anggaran: {post.budget}
                    </span>
                  </div>
                </div>
                <div className="sm:w-48 flex items-center justify-center sm:border-l border-gray-100 sm:pl-6 pt-2 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0">
                  <Button
                    className="w-full"
                    onClick={() => navigate("wtbDetail", {id: post.id})}
                  >
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

    if (!post) return <div>Postingan tidak ditemukan</div>;

    const myWTSListings = products.filter(
      (p) => p.sellerId === CURRENT_USER.id,
    );

    const handleOfferSubmit = () => {
      if (!selectedOfferId) return;
      setIsModalOpen(false);
      showToast("Penawaran barangmu berhasil dikirim!", "success");
    };

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

          <div className="flex items-center justify-between border-t border-gray-100 pt-6 mb-8">
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

          {post.authorId !== CURRENT_USER.id && (
            <Button
              className="w-full sm:w-auto py-3 px-8 text-base"
              onClick={() => setIsModalOpen(true)}
            >
              <Package className="w-5 h-5 mr-2" /> Tawarkan Barang Saya
            </Button>
          )}
        </div>

        {/* Offer Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Tawarkan Barang
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Pilih salah satu barang WTS yang kamu jual untuk ditawarkan ke{" "}
                <strong>{post.authorName}</strong>.
              </p>

              {myWTSListings.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                  <p className="text-gray-500 text-sm mb-3">
                    Kamu belum membuat iklan barang (WTS).
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate("createWTS");
                    }}
                  >
                    Buat Iklan Dulu
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                  {myWTSListings.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${selectedOfferId === item.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:bg-gray-50"}`}
                    >
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
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">
                            {item.title}
                          </p>
                          <p className="text-xs sm:text-sm text-indigo-600 font-semibold">
                            {formatCurrency(item.price)}
                          </p>
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
      </div>
    );
  };

  const CreateWTSView = () => {
    const [formData, setFormData] = useState({
      title: "",
      price: "",
      major: "Umum",
      condition: "Bekas - Baik",
      category: "Buku",
      description: "",
      imageUrl: "",
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
        icon:
          formData.category === "Elektronik"
            ? Laptop
            : formData.category === "Buku"
              ? Book
              : Package,
      };
      setProducts([newProduct, ...products]);
      showToast("Iklan berhasil dibuat!");
      navigate("dashboard");
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Buat Iklan Jual (WTS)
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 mb-6 overflow-hidden relative">
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg absolute inset-0 m-auto"
              />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3" />
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Gambar Produk
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  Masukkan URL gambar di bawah
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar (Opsional)
              </label>
              <input
                type="url"
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({...formData, imageUrl: e.target.value})
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Barang
              </label>
              <input
                required
                type="text"
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Cth: Buku Kalkulus Edisi 8"
                value={formData.title}
                onChange={(e) =>
                  setFormData({...formData, title: e.target.value})
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (IDR)
              </label>
              <input
                required
                type="number"
                min="0"
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="50000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({...formData, price: e.target.value})
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jurusan Terkait
              </label>
              <select
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.major}
                onChange={(e) =>
                  setFormData({...formData, major: e.target.value})
                }
              >
                {MAJORS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData({...formData, category: e.target.value})
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kondisi
              </label>
              <select
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({...formData, condition: e.target.value})
                }
              >
                <option>Baru</option>
                <option>Bekas - Seperti Baru</option>
                <option>Bekas - Baik</option>
                <option>Bekas - Cukup</option>
                <option>Digital/Catatan</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Lengkap
              </label>
              <textarea
                required
                rows={4}
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Jelaskan kondisi barang, kekurangan, kelengkapan, dll."
                value={formData.description}
                onChange={(e) =>
                  setFormData({...formData, description: e.target.value})
                }
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("home")}
            >
              Batal
            </Button>
            <Button type="submit">Terbitkan Iklan</Button>
          </div>
        </form>
      </div>
    );
  };

  const CreateWTBView = () => {
    const [formData, setFormData] = useState({
      title: "",
      budget: "",
      major: "Umum",
      description: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newPost = {
        ...formData,
        id: `w${Date.now()}`,
        authorId: CURRENT_USER.id,
        authorName: CURRENT_USER.name,
        date: "Baru saja",
      };
      setWtbPosts([newPost, ...wtbPosts]);
      showToast("Permintaan WTB berhasil diposting!");
      navigate("dashboard");
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Buat Permintaan (WTB)
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apa yang sedang kamu cari?
              </label>
              <input
                required
                type="text"
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Cth: Butuh pentablet murah"
                value={formData.title}
                onChange={(e) =>
                  setFormData({...formData, title: e.target.value})
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimasi Anggaran
              </label>
              <input
                required
                type="text"
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Cth: Rp 200.000 - Rp 300.000"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({...formData, budget: e.target.value})
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jurusan Terkait
              </label>
              <select
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.major}
                onChange={(e) =>
                  setFormData({...formData, major: e.target.value})
                }
              >
                {MAJORS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detail Tambahan
              </label>
              <textarea
                required
                rows={4}
                className="w-full p-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Berikan info lebih spesifik tentang barang yang kamu butuhkan..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({...formData, description: e.target.value})
                }
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("wtb")}
            >
              Batal
            </Button>
            <Button type="submit">Posting Permintaan</Button>
          </div>
        </form>
      </div>
    );
  };

  const DashboardView = () => {
    const [activeTab, setActiveTab] = useState("wts");

    const myWTSListings = products.filter(
      (p) => p.sellerId === CURRENT_USER.id,
    );
    const myWTBRequests = wtbPosts.filter(
      (w) => w.authorId === CURRENT_USER.id,
    );

    const handleDeleteWTS = (id) => {
      setProducts(products.filter((p) => p.id !== id));
      showToast("Iklan berhasil dihapus", "success");
    };

    const handleDeleteWTB = (id) => {
      setWtbPosts(wtbPosts.filter((w) => w.id !== id));
      showToast("Permintaan berhasil dihapus", "success");
    };

    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Dasbor Saya
        </h2>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="flex border-b border-gray-200 flex-col sm:flex-row">
            <button
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === "wts" ? "text-indigo-600 border-b-2 sm:border-b-2 sm:border-l-0 border-indigo-600 bg-indigo-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
              onClick={() => setActiveTab("wts")}
            >
              Barang Jualan (WTS)
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                {myWTSListings.length}
              </span>
            </button>
            <button
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === "wtb" ? "text-indigo-600 border-b-2 sm:border-b-2 sm:border-l-0 border-indigo-600 bg-indigo-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
              onClick={() => setActiveTab("wtb")}
            >
              Permintaan Saya (WTB)
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                {myWTBRequests.length}
              </span>
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "wts" &&
              (myWTSListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">
                    Kamu tidak memiliki iklan aktif saat ini.
                  </p>
                  <Button onClick={() => navigate("createWTS")}>
                    Buat Iklan WTS Baru
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myWTSListings.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden relative">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover absolute inset-0"
                            />
                          ) : item.icon ? (
                            <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          ) : (
                            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {item.title}
                          </h4>
                          <p className="text-indigo-600 font-medium text-sm sm:text-base">
                            {formatCurrency(item.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getMajorColor(item.major)}>
                              {item.major}
                            </Badge>
                            <span className="text-xs text-gray-500">Aktif</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          className="flex-1 sm:flex-none px-3"
                          onClick={() => showToast("Fitur edit belum tersedia")}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="danger"
                          className="flex-1 sm:flex-none px-3"
                          onClick={() => handleDeleteWTS(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {activeTab === "wtb" &&
              (myWTBRequests.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">
                    Kamu belum membuat postingan pencarian.
                  </p>
                  <Button onClick={() => navigate("createWTB")}>
                    Buat WTB
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myWTBRequests.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-full sm:w-auto mb-4 sm:mb-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1">
                          Anggaran: {post.budget}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className={getMajorColor(post.major)}>
                            {post.major}
                          </Badge>
                          <span className="text-xs text-gray-500">Aktif</span>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          className="flex-1 sm:flex-none px-3"
                          onClick={() => navigate("wtbDetail", {id: post.id})}
                        >
                          Lihat Penawaran
                        </Button>
                        <Button
                          variant="danger"
                          className="flex-1 sm:flex-none px-3"
                          onClick={() => handleDeleteWTB(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const ProfileView = () => {
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {CURRENT_USER.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
              <span className="flex items-center">
                <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                {CURRENT_USER.major}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Semester{" "}
                {CURRENT_USER.semester}
              </span>
              <span className="flex items-center">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Area Kampus
              </span>
            </div>

            <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-6 sm:pt-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Statistik Akun
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl text-center">
                  <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                    {
                      products.filter((p) => p.sellerId === CURRENT_USER.id)
                        .length
                    }
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase mt-1">
                    WTS Aktif
                  </p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl text-center">
                  <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                    {
                      wtbPosts.filter((p) => p.authorId === CURRENT_USER.id)
                        .length
                    }
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase mt-1">
                    WTB Aktif
                  </p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl text-center">
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    4.9
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase mt-1">
                    Rating
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => showToast("Fitur edit profil belum tersedia")}
              >
                Edit Profil
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={() => showToast("Berhasil Keluar (Mock)")}
              >
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDER CONTROLLER ---
  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeView />;
      case "productDetail":
        return <ProductDetailView />;
      case "wtb":
        return <WTBForumView />;
      case "wtbDetail":
        return <WTBDetailView />;
      case "createWTS":
        return <CreateWTSView />;
      case "createWTB":
        return <CreateWTBView />;
      case "dashboard":
        return <DashboardView />;
      case "profile":
        return <ProfileView />;
      default:
        return <HomeView />;
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
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <div
                className="flex-shrink-0 flex items-center cursor-pointer group"
                onClick={() => navigate("home")}
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 group-hover:bg-indigo-700 transition-colors">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                  ITStuku
                </span>
              </div>

              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <button
                  onClick={() => navigate("home")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${currentView === "home" ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                >
                  Cari Barang (WTS)
                </button>
                <button
                  onClick={() => navigate("wtb")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${currentView === "wtb" ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
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
                    <button
                      onClick={() => {
                        navigate("createWTS");
                        setIsCreateDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Jual Barang (WTS)
                    </button>
                    <button
                      onClick={() => {
                        navigate("createWTB");
                        setIsCreateDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Buat Permintaan (WTB)
                    </button>
                  </div>
                )}
              </div>

              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors hidden sm:block">
                <Bell className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigate("dashboard")}
                className={`p-2 transition-colors rounded-full hidden md:block ${currentView === "dashboard" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"}`}
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
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === "home" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"}`}
              >
                Cari Barang (WTS)
              </button>
              <button
                onClick={() => navigate("wtb")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === "wtb" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"}`}
              >
                Forum Permintaan (WTB)
              </button>
              <button
                onClick={() => navigate("createWTS")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === "createWTS" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"}`}
              >
                Jual Barang (WTS)
              </button>
              <button
                onClick={() => navigate("createWTB")}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentView === "createWTB" ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"}`}
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
                  <div className="text-base font-medium text-gray-800">
                    {CURRENT_USER.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {CURRENT_USER.major}
                  </div>
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
            <button
              onClick={() => setChatBox((prev) => ({...prev, isOpen: false}))}
              className="text-indigo-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-64 sm:h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {chatBox.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.sender === "me" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"}`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 bg-white flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className={`p-2 rounded-lg transition-colors flex items-center justify-center ${chatInput.trim() ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-100 text-gray-400"}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Toast Notification System */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            )}
            <span className="font-medium text-sm whitespace-nowrap">
              {toast.message}
            </span>
            <button
              onClick={() => setToast(null)}
              className="ml-4 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
