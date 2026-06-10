"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Play, 
  Pause,
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Volume2,
  VolumeX,
  ChevronDown,
  Plus,
  Minus,
  Trash2
} from "lucide-react";

// Catalog and theme data for Gold, Silver, and Diamonds
const catalogData = {
  gold: {
    heroImage1: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    heroImage2: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
    heroImage3Oval: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    discover: [
      {
        id: "gold-rings",
        title: "Rings for Joyful Connection",
        desc: "Exquisite gold bands handcrafted to represent eternal bonds and refined styling.",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
        category: "Rings"
      },
      {
        id: "gold-necklaces",
        title: "Inspiration with necklaces",
        desc: "Gleaming gold chains and pendants that outline grace and high fashion statement.",
        image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
        category: "Necklaces"
      },
      {
        id: "gold-earrings",
        title: "Discover Amazing Earrings",
        desc: "Striking gold studs and dangles designed to elevate your everyday wear.",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop",
        category: "Earrings"
      }
    ],
    arrivals: [
      { id: "g1", name: "Gold Infinity Ring", price: "$450.00", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop" },
      { id: "g2", name: "Classic Gold Bangle", price: "$1,200.00", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
      { id: "g3", name: "Gold Hoop Earrings", price: "$380.00", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop" },
      { id: "g4", name: "Link Chain Necklace", price: "$850.00", image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop" },
      { id: "g5", name: "Gold Diamond Band", price: "$950.00", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop" },
      { id: "g6", name: "Gold Snake Chain", price: "$640.00", image: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?q=80&w=600&auto=format&fit=crop" },
      { id: "g7", name: "Gold Textured Hoops", price: "$420.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
      { id: "g8", name: "Gold Signet Ring", price: "$780.00", image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=600&auto=format&fit=crop" }
    ],
    traditionImage1: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?q=80&w=800&auto=format&fit=crop",
    traditionImage2: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop"
  },
  silver: {
    heroImage1: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop",
    heroImage2: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    heroImage3Oval: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    discover: [
      {
        id: "silver-rings",
        title: "Rings for Joyful Connection",
        desc: "Minimalist silver bands designed with modern geometries and polished finish.",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
        category: "Rings"
      },
      {
        id: "silver-necklaces",
        title: "Inspiration with necklaces",
        desc: "Sleek sterling silver chains showcasing timeless design and delicate beauty.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
        category: "Necklaces"
      },
      {
        id: "silver-earrings",
        title: "Discover Amazing Earrings",
        desc: "Stunning silver studs and drop earrings with high-polish craftsmanship.",
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
        category: "Earrings"
      }
    ],
    arrivals: [
      { id: "s1", name: "Silver Knot Ring", price: "$180.00", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop" },
      { id: "s2", name: "Silver Curb Bracelet", price: "$320.00", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop" },
      { id: "s3", name: "Silver Stud Earrings", price: "$120.00", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop" },
      { id: "s4", name: "Silver Pendant Chain", price: "$220.00", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop" },
      { id: "s5", name: "Silver Rope Ring", price: "$160.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
      { id: "s6", name: "Silver Choker", price: "$450.00", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop" },
      { id: "s7", name: "Silver Hammered Hoops", price: "$190.00", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop" },
      { id: "s8", name: "Silver Cuff Bangle", price: "$280.00", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" }
    ],
    traditionImage1: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    traditionImage2: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop"
  },
  diamonds: {
    heroImage1: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    heroImage2: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    heroImage3Oval: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=800&auto=format&fit=crop",
    discover: [
      {
        id: "diamond-rings",
        title: "Rings for Joyful Connection",
        desc: "Breathtaking diamond bands of unmatched brilliance, set in premium platinum or gold.",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
        category: "Rings"
      },
      {
        id: "diamond-necklaces",
        title: "Inspiration with necklaces",
        desc: "Magnificent diamond chokers and pendants that catch the light from every single angle.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
        category: "Necklaces"
      },
      {
        id: "diamond-earrings",
        title: "Discover Amazing Earrings",
        desc: "Elegant diamond studs and drops, crafting an unforgettable high-fashion style.",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
        category: "Earrings"
      }
    ],
    arrivals: [
      { id: "d1", name: "Solitaire Diamond Ring", price: "$3,500.00", image: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=600&auto=format&fit=crop" },
      { id: "d2", name: "Diamond Tennis Bracelet", price: "$5,800.00", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
      { id: "d3", name: "Diamond Halo Studs", price: "$2,200.00", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop" },
      { id: "d4", name: "Diamond Eternity Necklace", price: "$8,500.00", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop" },
      { id: "d5", name: "Diamond Princess Cut Ring", price: "$4,200.00", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop" },
      { id: "d6", name: "Diamond Drop Earrings", price: "$3,100.00", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop" },
      { id: "d7", name: "Diamond Tennis Anklet", price: "$2,900.00", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop" },
      { id: "d8", name: "Diamond Cluster Ring", price: "$4,900.00", image: "https://images.unsplash.com/photo-1588444839799-eaa4344eae19?q=80&w=600&auto=format&fit=crop" }
    ],
    traditionImage1: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=800&auto=format&fit=crop",
    traditionImage2: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
  }
};

export default function Home() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  
  // Interactive Video Modal states
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef(null);

  // Brand Film scroll autoplay refs
  const brandVideoContainerRef = useRef(null);
  const brandIframeRef = useRef(null);

  // Material state
  const [material, setMaterial] = useState("gold");
  const [materialDropdownOpen, setMaterialDropdownOpen] = useState(false);

  // Cart & Wishlist states
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Responsive visible count for arrivals slider
  const [visibleCount, setVisibleCount] = useState(4);

  // Load cart/wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("eglanto_cart");
      const savedWishlist = localStorage.getItem("eglanto_wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("eglanto_cart", JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("eglanto_wishlist", JSON.stringify(newWishlist));
  };

  // Add to Cart, update, remove helpers
  const addToCart = (product) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.material === product.material
    );
    let newCart;
    if (existingIndex > -1) {
      newCart = [...cart];
      newCart[existingIndex].quantity += 1;
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    saveCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    saveCart(newCart);
  };

  const updateCartQuantity = (productId, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean);
    saveCart(newCart);
  };

  const toggleWishlist = (product) => {
    const existingIndex = wishlist.findIndex(
      (item) => item.id === product.id && item.material === product.material
    );
    let newWishlist;
    if (existingIndex > -1) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      newWishlist = [...wishlist, product];
    }
    saveWishlist(newWishlist);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return acc + (priceNum * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    saveCart([]);
    setCartOpen(false);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 4500);
  };

  // Responsive columns check for arrivals slider
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Background Video Player ref
  const bgPlayerRef = useRef(null);

  // Load and control background video
  useEffect(() => {
    let checkInterval = null;
    let apiPollInterval = null;

    // Safe script load
    if (typeof window !== "undefined" && !window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const initBgPlayer = () => {
      const container = document.getElementById("hero-bg-video");
      if (!container) {
        // Retry shortly if DOM is not ready
        setTimeout(initBgPlayer, 100);
        return;
      }

      try {
        if (bgPlayerRef.current && typeof bgPlayerRef.current.destroy === "function") {
          bgPlayerRef.current.destroy();
        }
      } catch (e) {}

      try {
        bgPlayerRef.current = new window.YT.Player("hero-bg-video", {
          videoId: "eCpAgLeMCb8",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
            loop: 1,
            playlist: "eCpAgLeMCb8",
            end: 53,
            start: 0,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.playVideo();
              
              if (checkInterval) clearInterval(checkInterval);
              checkInterval = setInterval(() => {
                if (event.target && typeof event.target.getCurrentTime === "function") {
                  const currentTime = event.target.getCurrentTime();
                  if (currentTime >= 53) {
                    event.target.seekTo(0, true);
                    event.target.playVideo();
                  }
                }
              }, 500);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(0, true);
                event.target.playVideo();
              }
              if (event.data === window.YT.PlayerState.PAUSED) {
                event.target.playVideo();
              }
            }
          }
        });
      } catch (err) {
        console.error("Eglanto background video init error:", err);
      }
    };

    const pollForAPI = () => {
      if (window.YT && window.YT.Player) {
        initBgPlayer();
      } else {
        apiPollInterval = setTimeout(pollForAPI, 100);
      }
    };

    pollForAPI();

    // Register on window just in case
    if (typeof window !== "undefined") {
      window.onYouTubeIframeAPIReady = initBgPlayer;
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (apiPollInterval) clearTimeout(apiPollInterval);
      try {
        if (bgPlayerRef.current && typeof bgPlayerRef.current.destroy === "function") {
          bgPlayerRef.current.destroy();
        }
      } catch (e) {}
    };
  }, []);

  // Navigation scroll function
  const navigateToSection = (tabName) => {
    setActiveTab(tabName);
    const elementId = tabName === "Product's" ? "products" : tabName.toLowerCase();
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // 1. YouTube Iframe Scroll Autoplay
    const iframe = brandIframeRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!iframe || !iframe.contentWindow) return;
        try {
          if (entry.isIntersecting) {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "playVideo", args: "" }),
              "*"
            );
          } else {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
              "*"
            );
          }
        } catch (e) {
          // ignore transient postMessage errors before iframe is ready
        }
      },
      { threshold: 0.15 }
    );

    if (brandVideoContainerRef.current) {
      observer.observe(brandVideoContainerRef.current);
    }

    // 2. Active Section Scroll Listener for Navbar Highlight
    const sectionIds = ["home", "discover", "products", "blogs"];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            let tabName = "Home";
            if (id === "products") tabName = "Product's";
            else if (id === "discover") tabName = "Discover";
            else if (id === "blogs") tabName = "Blogs";
            setActiveTab(tabName);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-90px 0px -40% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Testimonial states
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    {
      quote: "Amazing service. My ring was a bit too big and they offered to resize it for free and very swiftly.",
      name: "Kathryn Murphy",
      role: "Customer, Poland",
      image: "/diamond-collection.png"
    },
    {
      quote: "Absolutely gorgeous collection. The customer service team helped me pick the perfect necklace for our anniversary.",
      name: "Sophia R.",
      role: "Customer, France",
      image: "/bridal-collection.png"
    },
    {
      quote: "Fast delivery and exquisite packaging. The earrings feel so lightweight and premium.",
      name: "Elena G.",
      role: "Collector, Italy",
      image: "/signature-collection.png"
    }
  ];

  // New Arrival Product Carousel state
  const [arrivalIndex, setArrivalIndex] = useState(0);

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevArrival = () => {
    setArrivalIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextArrival = () => {
    setArrivalIndex((prev) => Math.min(8 - visibleCount, prev + 1));
  };

  const toggleModalPlay = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log(err));
    }
    setVideoPlaying(!videoPlaying);
  };

  const toggleModalMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoMuted;
    setVideoMuted(!videoMuted);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] text-[#103033] flex flex-col font-sans overflow-x-hidden selection:bg-[#103033] selection:text-[#FAF6F0]">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="w-full bg-[#FAF6F0] py-6 px-6 md:px-12 lg:px-20 flex items-center justify-between z-40 border-b border-[#103033]/[0.04] sticky top-0">
        
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-widest font-semibold uppercase">
          {["Home", "Product's", "Discover", "Blogs"].map((link) => (
            <button
              key={link}
              onClick={() => navigateToSection(link)}
              className={`relative py-1 transition-colors duration-300 hover:text-[#B38E6B] cursor-pointer ${
                activeTab === link ? "text-[#103033]" : "text-[#103033]/60"
              }`}
            >
              {link}
              {activeTab === link && (
                <span className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#103033]" />
              )}
            </button>
          ))}

          {/* Material Switcher Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setMaterialDropdownOpen(!materialDropdownOpen)}
              className="flex items-center gap-1.5 py-1 text-[#103033] hover:text-[#B38E6B] font-semibold text-[13px] tracking-widest uppercase cursor-pointer transition-colors"
            >
              Material: <span className="text-[#B38E6B] font-bold">{material}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            
            <AnimatePresence>
              {materialDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-40 bg-[#FAF6F0] border border-[#103033]/10 shadow-xl rounded-none z-50 flex flex-col font-sans"
                >
                  {["gold", "silver", "diamonds"].map((mat) => (
                    <button
                      key={mat}
                      onClick={() => {
                        setMaterial(mat);
                        setMaterialDropdownOpen(false);
                      }}
                      className={`px-4 py-2.5 text-left text-xs tracking-wider uppercase font-semibold hover:bg-[#103033]/5 transition-colors cursor-pointer ${
                        material === mat ? "text-[#B38E6B] bg-[#103033]/[0.02]" : "text-[#103033]"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Center Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#103033] flex items-center justify-center text-white">
            {/* Minimalist Eglanto circular logo emblem */}
            <svg viewBox="0 0 100 100" className="w-4 h-4 fill-none stroke-current" strokeWidth="6">
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="12" className="stroke-[#B38E6B]" />
            </svg>
          </div>
          <span className="font-serif text-2xl tracking-[0.1em] font-medium text-[#103033]">
            Eglanto
          </span>
        </a>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-[#103033]">
          <button className="hover:text-[#B38E6B] transition-colors cursor-pointer" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          
          {/* Wishlist Icon with count badge */}
          <button 
            onClick={() => setWishlistOpen(true)}
            className="relative hover:text-[#B38E6B] transition-colors cursor-pointer" 
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#B38E6B] text-[#FAF6F0] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon with count badge */}
          <button 
            onClick={() => setCartOpen(true)}
            className="relative hover:text-[#B38E6B] transition-colors cursor-pointer" 
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#103033] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <span className={`h-0.5 w-full bg-[#103033] transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-full bg-[#103033] transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-[#103033] transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden w-full bg-[#FAF6F0] px-6 py-6 border-b border-[#103033]/0.1 flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider z-30"
          >
            {["Home", "Product's", "Discover", "Blogs"].map((link) => (
              <button
                key={link}
                onClick={() => {
                  navigateToSection(link);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#103033]/0.03 hover:text-[#B38E6B]"
              >
                {link}
              </button>
            ))}

            {/* Mobile Material Selector */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#103033]/0.1">
              <span className="text-[10px] text-[#103033]/40 tracking-widest font-bold uppercase">Select Material</span>
              <div className="flex gap-2">
                {["gold", "silver", "diamonds"].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => {
                      setMaterial(mat);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 border text-[11px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                      material === mat 
                        ? "border-[#B38E6B] bg-[#103033] text-white" 
                        : "border-[#103033]/20 text-[#103033] hover:border-[#103033]"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO LANDING SECTION */}
      <section id="home" className="relative px-6 md:px-12 lg:px-20 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center overflow-hidden min-h-[90vh]">
        
        {/* Background YouTube Video */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black select-none">
          {/* Overlays to ensure text legibility and brand styling */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/90 to-[#FAF6F0]/40 z-10" />
          <div className="absolute inset-0 bg-[#FAF6F0]/40 backdrop-blur-[2px] z-10" />
          
          <div id="hero-bg-video" className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] sm:w-[150%] sm:h-[150%] sm:-top-[25%] sm:-left-[25%] lg:w-[120%] lg:h-[120%] lg:-top-[10%] lg:-left-[10%]" />
        </div>

        {/* Left Text details */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left z-10">
          
          {/* Giant Title with inline oval image */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-[5.5rem] leading-[1.05] text-[#103033] mb-8 font-light select-none">
            Desire Meets <br />
            <span className="flex items-center gap-4 flex-wrap">
              <span className="inline-block w-28 h-14 rounded-full overflow-hidden border border-[#103033] rotate-[-12deg] bg-[#FAF6F0] flex-shrink-0 shadow-sm relative">
                <img 
                  src={catalogData[material].heroImage3Oval} 
                  className="w-full h-full object-cover scale-150 origin-center absolute inset-0" 
                  alt={`${material} Preview`}
                />
              </span>
              New Style
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#103033]/70 font-sans tracking-wide leading-relaxed max-w-md mb-10">
            Anyone can get dressed up and glamorous, but it is how people dress in their days off.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-6">
            <button className="px-8 py-3.5 bg-[#103033] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-[#B38E6B] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer">
              See All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Images Layout */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] z-10">
          {/* Decorative Vector Line in background */}
          <svg viewBox="0 0 100 100" className="absolute w-full h-full text-[#B38E6B]/15 pointer-events-none z-0">
            <path d="M 10 50 Q 50 10 90 50 T 10 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square flex items-center justify-between z-10 gap-6">
            
            {/* Center-left rectangular image */}
            <div className="w-[52%] aspect-[3/4] overflow-hidden shadow-xl border border-white/20">
              <img 
                src={catalogData[material].heroImage1} 
                className="w-full h-full object-cover scale-[1.05]" 
                alt={`${material} Collection 1`} 
              />
            </div>

            {/* Right arched image */}
            <div className="w-[42%] aspect-[3/4] rounded-t-full overflow-hidden shadow-xl border border-white/20">
              <img 
                src={catalogData[material].heroImage2} 
                className="w-full h-full object-cover" 
                alt={`${material} Collection 2`} 
              />
            </div>

          </div>
        </div>

      </section>

      {/* 3. HERO STATS BAR */}
      <section className="px-6 md:px-12 lg:px-20 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch border-t border-b border-[#103033]/[0.04]">
        
        {/* Left Dark Teal Square block */}
        <div className="md:col-span-3 bg-[#103033] min-h-[140px] flex items-center justify-center p-4 relative overflow-hidden group">
          <img 
            src={catalogData[material].heroImage1} 
            className="w-[80%] h-[80%] object-contain opacity-90 transition-transform duration-700 group-hover:scale-105" 
            alt={`${material} Featured`} 
          />
        </div>

        {/* Center Stats block */}
        <div className="md:col-span-6 bg-[#F0E6D8] rounded-none px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-serif text-3xl md:text-4xl font-light text-[#103033]">12</span>
            <span className="text-[10px] font-sans font-semibold tracking-widest text-[#103033]/60 uppercase mt-1">All over World</span>
          </div>
          <div className="w-[1px] h-10 bg-[#103033]/10 hidden sm:block" />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-serif text-3xl md:text-4xl font-light text-[#103033]">150+</span>
            <span className="text-[10px] font-sans font-semibold tracking-widest text-[#103033]/60 uppercase mt-1">Product Available</span>
          </div>
          <div className="w-[1px] h-10 bg-[#103033]/10 hidden sm:block" />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-serif text-3xl md:text-4xl font-light text-[#103033]">1K+</span>
            <span className="text-[10px] font-sans font-semibold tracking-widest text-[#103033]/60 uppercase mt-1">Product Reviews</span>
          </div>
        </div>

        {/* Right rotating circular badge */}
        <div className="md:col-span-3 flex items-center justify-center p-4">
          <div className="relative flex items-center justify-center">
            {/* Spinning Text Path SVG */}
            <svg viewBox="0 0 100 100" className="w-28 h-28 animate-spin-slow text-[#103033]/80">
              <path id="statsCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text fill="currentColor" className="font-sans text-[5px] uppercase tracking-[0.2em] font-semibold">
                <textPath href="#statsCirclePath">
                  Explore All • Explore All • Explore All •
                </textPath>
              </text>
            </svg>
            {/* Center Down Arrow Circle */}
            <button className="absolute w-12 h-12 rounded-full bg-[#103033] hover:bg-[#B38E6B] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-colors cursor-pointer" aria-label="Explore Down">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>

      </section>

      {/* 4. DISCOVER COLLECTION GRID */}
      <section id="discover" className="px-6 md:px-12 lg:px-20 py-20 lg:py-28 flex flex-col items-center">
        
        {/* Section Title with circled Jewellery keyword */}
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-center text-[#103033] mb-16 select-none">
          Discover <span className="heading-oval-accent italic">Jewellery</span> <br className="sm:hidden" /> Collection
        </h2>

        {/* Staggered Side-by-Side Video-inspired Layout */}
        <div className="flex flex-col gap-24 w-full">
          
          {/* Row 1: Rings & Necklaces Side-by-Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            
            {/* Card 1: Rings */}
            <div className="flex flex-col sm:flex-row items-center gap-6 group w-full">
              <div className="w-full sm:w-1/2 flex flex-col items-start gap-4">
                <h3 className="font-serif text-2xl md:text-3xl text-[#103033] tracking-wide font-normal leading-tight">
                  {catalogData[material].discover[0].title}
                </h3>
                <p className="text-xs text-[#103033]/70 font-sans tracking-wide leading-relaxed">
                  {catalogData[material].discover[0].desc}
                </p>
                <button className="px-5 py-2 border border-[#103033]/20 hover:border-[#103033] hover:bg-[#103033] hover:text-white rounded-full text-[#103033] font-sans text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
                  See All &rarr;
                </button>
              </div>
              <div className="w-full sm:w-1/2 aspect-square bg-[#F0E6D8]/50 p-8 flex items-center justify-center overflow-hidden border border-[#103033]/0.04 relative shadow-sm rounded-none">
                <img 
                  src={catalogData[material].discover[0].image} 
                  className="w-[85%] h-[85%] object-contain transition-transform duration-700 group-hover:scale-105" 
                  alt={catalogData[material].discover[0].title} 
                />
              </div>
            </div>

            {/* Card 2: Necklaces */}
            <div className="flex flex-col sm:flex-row items-center gap-6 group w-full">
              <div className="w-full sm:w-1/2 aspect-[4/3] rounded-t-full bg-slate-100 flex items-center justify-center overflow-hidden relative shadow-sm">
                <img 
                  src={catalogData[material].discover[1].image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                  alt={catalogData[material].discover[1].title} 
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col items-start gap-4">
                <h3 className="font-serif text-2xl md:text-3xl text-[#103033] tracking-wide font-normal leading-tight">
                  {catalogData[material].discover[1].title}
                </h3>
                <p className="text-xs text-[#103033]/70 font-sans tracking-wide leading-relaxed">
                  {catalogData[material].discover[1].desc}
                </p>
                <button className="px-5 py-2 border border-[#103033]/20 hover:border-[#103033] hover:bg-[#103033] hover:text-white rounded-full text-[#103033] font-sans text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
                  See All &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Row 2: Earrings Centered/Staggered Below */}
          <div className="flex justify-center w-full">
            <div className="w-full lg:w-3/4 flex flex-col md:flex-row items-center gap-8 group">
              <div className="w-full md:w-1/2 flex flex-col items-start gap-4 justify-center">
                <h3 className="font-serif text-2xl md:text-4xl text-[#103033] tracking-wide font-normal leading-tight">
                  {catalogData[material].discover[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#103033]/70 font-sans tracking-wide leading-relaxed">
                  {catalogData[material].discover[2].desc}
                </p>
                <button className="px-5 py-2 border border-[#103033]/20 hover:border-[#103033] hover:bg-[#103033] hover:text-white rounded-full text-[#103033] font-sans text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
                  See All &rarr;
                </button>
              </div>
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-none overflow-hidden relative shadow-sm border border-[#103033]/0.04 bg-[#F0E6D8]/20">
                <img 
                  src={catalogData[material].discover[2].image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={catalogData[material].discover[2].title} 
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4.5 CINEMATIC BRAND FILM SECTION */}
      <section className="px-6 md:px-12 lg:px-20 py-16 bg-[#FAF6F0] flex flex-col items-center border-t border-[#103033]/[0.02]">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left order-2 lg:order-1">
            <span className="text-[10px] font-sans font-semibold tracking-widest text-[#B38E6B] uppercase mb-3 block">
              Craftsmanship Film
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-[#103033] mb-6 leading-tight select-none">
              Making of <br />
              <span className="heading-oval-accent italic">Eglanto</span> Masterpieces
            </h2>
            <p className="text-xs sm:text-sm text-[#103033]/70 font-sans tracking-wide leading-relaxed mb-8 max-w-sm">
              Discover the intricate details and hand-forged precision that goes into selecting, cutting, and placing every single diamond and gold thread.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#103033]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38E6B] animate-ping" />
              Playing In Loop
            </div>
          </div>

          {/* Right Video Player Column */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div 
              ref={brandVideoContainerRef}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#103033]/10 bg-[#103033]"
            >
              {/* YouTube Iframe Embedded with Pointer Events Blocked & Scaled to crop watermark/controls */}
              <iframe
                ref={brandIframeRef}
                src="https://www.youtube.com/embed/ivzPXht4C5E?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=ivzPXht4C5E&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
                className="absolute w-[130%] h-[130%] -top-[15%] -left-[15%] pointer-events-none"
                allow="autoplay; encrypted-media"
                title="Eglanto Brand Film"
              />
              
              {/* Subtle visual gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#103033]/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Elegant floating badge overlay */}
              <div className="absolute right-6 top-6 bg-[#FAF6F0] text-[#103033] border border-[#103033]/10 px-4 py-2 text-[9px] tracking-widest font-semibold uppercase rounded-full shadow-md backdrop-blur-sm bg-opacity-90 z-10 select-none">
                Est. 1970
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. NEW ARRIVAL CAROUSEL (DEEP TEAL BLOCK) */}
      <section id="products" className="bg-[#103033] text-white px-6 md:px-12 lg:px-20 py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-white/10">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white mb-4 select-none">
                New <span className="heading-oval-accent-white italic">Arrival</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/60 font-sans tracking-wide leading-relaxed">
                Anyone can get dressed up and glamorous, but it is how people dress in their days off.
              </p>
            </div>

            {/* Arrow controllers */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePrevArrival}
                disabled={arrivalIndex === 0}
                className={`p-3 border border-white/20 hover:border-white text-white hover:text-[#B38E6B] transition-colors rounded-none cursor-pointer ${
                  arrivalIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
                }`}
                aria-label="Previous Product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextArrival}
                disabled={arrivalIndex >= 8 - visibleCount}
                className={`p-3 border border-white/20 hover:border-white text-white hover:text-[#B38E6B] transition-colors rounded-none cursor-pointer ${
                  arrivalIndex >= 8 - visibleCount ? "opacity-30 cursor-not-allowed" : ""
                }`}
                aria-label="Next Product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product slider */}
          <div className="relative overflow-hidden w-full py-4">
            <motion.div 
              animate={{ x: `-${arrivalIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="flex w-full"
            >
              {catalogData[material].arrivals.map((prod) => {
                const liked = wishlist.some(item => item.id === prod.id && item.material === material);
                return (
                  <div 
                    key={prod.id}
                    className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-4 flex flex-col gap-4 group"
                  >
                    {/* Square light cream image box */}
                    <div className="w-full aspect-square bg-[#FAF6F0] p-8 flex items-center justify-center overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
                      
                      {/* Heart like toggle at top right */}
                      <button 
                        onClick={() => toggleWishlist({ ...prod, material })}
                        className="absolute top-4 right-4 p-1.5 text-[#103033] hover:text-red-500 transition-colors z-10 cursor-pointer"
                        aria-label="Like product"
                      >
                        <Heart className={`w-4.5 h-4.5 transition-transform active:scale-125 ${liked ? "fill-red-500 text-red-500" : "text-[#103033]/30"}`} />
                      </button>

                      <img 
                        src={prod.image} 
                        className="w-[80%] h-[80%] object-contain transition-transform duration-700 group-hover:scale-105" 
                        alt={prod.name} 
                      />
                    </div>

                    {/* Meta details */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-white font-normal group-hover:text-[#B38E6B] transition-colors">
                          {prod.name}
                        </span>
                        <span className="text-sm text-white/50 font-sans tracking-wide mt-1">
                          {prod.price}
                        </span>
                      </div>

                      {/* Small cart button */}
                      <button 
                        onClick={() => addToCart({ ...prod, material })}
                        className="p-2 border border-white/10 hover:border-white hover:bg-white hover:text-[#103033] transition-all cursor-pointer" 
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. TRADITION CARED FOR SINCE 1970 */}
      <section id="blogs" className="px-6 md:px-12 lg:px-20 py-24 lg:py-32 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Overlapping arched and circle images */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Giant arched portrait (main) */}
            <div className="w-[65%] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl z-10 border border-white/20">
              <img 
                src={catalogData[material].traditionImage1} 
                className="w-full h-full object-cover" 
                alt={`${material} tradition 1`} 
              />
            </div>

            {/* Overlapping circular product box (bottom right) */}
            <div className="absolute right-4 bottom-2 w-[42%] aspect-square rounded-full overflow-hidden shadow-2xl z-20 border-4 border-[#FAF6F0]">
              <img 
                src={catalogData[material].traditionImage2} 
                className="w-full h-full object-cover" 
                alt={`${material} tradition 2`} 
              />
            </div>
          </div>

          {/* Right Side: Copy text */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#103033] leading-tight mb-8 select-none">
              Tradition Cared <br />
              For Since <span className="heading-oval-accent italic font-normal">1970</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#103033]/70 font-sans tracking-wide leading-relaxed mb-10 max-w-lg">
              In celebration of Mental Health Awareness Week, Team Eglanto have pledged to donate 15% of all Smiley Face Cord Bracelet.
            </p>

            <div>
              <button className="px-8 py-3.5 bg-[#103033] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-[#B38E6B] transition-colors duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer">
                See More &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. WHAT PEOPLE SAY (TESTIMONIALS SLIDER) */}
      <section className="px-6 md:px-12 lg:px-20 py-24 lg:py-32 bg-[#FAF6F0] border-t border-[#103033]/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Title with Say accented */}
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-center text-[#103033] mb-20 select-none">
            What People <span className="heading-oval-accent italic">Say</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full items-center">
            
            {/* Left Column: Quote text details */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              
              {/* Quote Icon */}
              <div className="text-[#B38E6B] mb-8">
                <svg viewBox="0 0 100 100" className="w-14 h-14 fill-none stroke-current" strokeWidth="2.5">
                  <path d="M 25,65 C 25,40 40,30 50,25 C 40,35 38,48 40,55 M 65,65 C 65,40 80,30 90,25 C 80,35 78,48 80,55" />
                  <path d="M 15,65 A 15,15 0 1,1 45,65 A 15,15 0 1,1 15,65 Z" strokeWidth="2" />
                  <path d="M 55,65 A 15,15 0 1,1 85,65 A 15,15 0 1,1 55,65 Z" strokeWidth="2" />
                </svg>
              </div>

              {/* Slider content */}
              <div className="min-h-[160px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6"
                  >
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light italic text-[#103033] leading-relaxed tracking-wide">
                      "{testimonials[testimonialIndex].quote}"
                    </p>

                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-semibold text-[#FAF6F0] bg-[#103033] inline-block px-4 py-1 tracking-wider uppercase">
                        {testimonials[testimonialIndex].name}
                      </h4>
                      <p className="text-xs text-[#B38E6B] uppercase tracking-[0.15em] font-semibold mt-2">
                        {testimonials[testimonialIndex].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6 mt-12">
                <button 
                  onClick={handlePrevTestimonial}
                  className="p-3 border border-[#103033]/20 hover:border-[#103033] text-[#103033] hover:text-[#B38E6B] transition-all cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextTestimonial}
                  className="p-3 border border-[#103033]/20 hover:border-[#103033] text-[#103033] hover:text-[#B38E6B] transition-all cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Right Column: Arched portrait */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[400px] aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl border border-[#103033]/0.04">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={testimonialIndex}
                    src={testimonials[testimonialIndex].image}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover" 
                    alt={testimonials[testimonialIndex].name} 
                  />
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. INSTAGRAM GRID & FOOTER */}
      <section className="bg-[#FAF6F0] pt-12 relative z-10">
        
        {/* Instagram cards overlapping grid */}
        <div className="px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transform translate-y-16 max-w-7xl mx-auto">
          
          <div className="aspect-square bg-slate-100 overflow-hidden shadow-lg border border-[#103033]/0.04 group relative">
            <img 
              src="/bridal-collection.png" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Insta post 1" 
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
          </div>

          <div className="aspect-square bg-slate-100 overflow-hidden shadow-lg border border-[#103033]/0.04 group relative">
            <img 
              src="/gold-collection.png" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Insta post 2" 
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
          </div>

          <div className="aspect-square bg-slate-100 overflow-hidden shadow-lg border border-[#103033]/0.04 group relative">
            <img 
              src="/diamond-collection.png" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Insta post 3" 
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
          </div>

          {/* Card 4: Terracotta background block */}
          <div className="aspect-square bg-[#A36B3F] text-white p-8 flex flex-col justify-between items-start shadow-lg group relative cursor-pointer">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            
            <div className="flex flex-col gap-3">
              <span className="font-serif text-2xl font-light text-white leading-tight">
                Join our <br />
                Instagram
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#A36B3F] transition-colors mt-2">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-[#A36B3F] transition-colors" />
              </div>
            </div>
          </div>

        </div>

        {/* Deep Teal Footer Block */}
        <footer className="bg-[#103033] text-[#FAF6F0] pt-36 pb-8 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Brand logo and info */}
              <div className="md:col-span-4 flex flex-col items-start">
                
                {/* Logo */}
                <a href="#" className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#103033]">
                    <svg viewBox="0 0 100 100" className="w-4 h-4 fill-none stroke-current" strokeWidth="6">
                      <circle cx="50" cy="50" r="30" />
                      <circle cx="50" cy="50" r="12" className="stroke-[#B38E6B]" />
                    </svg>
                  </div>
                  <span className="font-serif text-2xl tracking-[0.1em] font-medium text-white">
                    Eglanto
                  </span>
                </a>

                <p className="text-xs text-white/50 tracking-wider font-semibold uppercase mb-4">
                  +1915 9969 739
                </p>

                <p className="text-xs text-white/50 leading-relaxed tracking-wide mb-8">
                  3891 Ranchview Dr. Richardson, <br />
                  California 62639
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-4 text-white/60">
                  <a href="#" aria-label="Facebook" className="hover:text-white transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-3.3 0-5 1.7-5 5v2z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:text-white transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-white transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.6c-.9.4-1.8.6-2.8.7 1-.6 1.8-1.6 2.2-2.7-1 .6-2 1-3.1 1.2-.9-1-2.2-1.6-3.6-1.6-2.7 0-5 2.2-5 5 0 .4 0 .8.1 1.1C7.9 8.1 4.2 6.1 1.7 3.1c-.4.8-.7 1.6-.7 2.6 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.9-.4.1-.9.2-1.4.2-.3 0-.7 0-1-.1.6 2 2.5 3.5 4.7 3.5-1.7 1.4-3.9 2.2-6.3 2.2-.4 0-.8 0-1.2-.1 2.2 1.4 4.9 2.2 7.7 2.2 9.3 0 14.3-7.7 14.3-14.3v-.7c1-.7 1.8-1.6 2.5-2.5z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>

              </div>

              {/* Middle Link columns */}
              <div className="md:col-span-4 grid grid-cols-2 gap-8">
                
                <div className="flex flex-col gap-6">
                  <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">About</h5>
                  <div className="flex flex-col gap-3 text-sm text-white/60">
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Our company</a>
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Our products</a>
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Latest Blogs</a>
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Why us</a>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">Support</h5>
                  <div className="flex flex-col gap-3 text-sm text-white/60">
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Terms & conditions</a>
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Privacy policie</a>
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">Call support</a>
                    <a href="#" className="hover:text-[#B38E6B] transition-colors cursor-pointer">FAQ</a>
                  </div>
                </div>

              </div>

              {/* Right Newsletter register column */}
              <div className="md:col-span-4 flex flex-col items-start">
                <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-white mb-6">Subscribe Newsletter</h5>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  New Customer Get 50% Offf...
                </p>

                {/* E-mail submit form */}
                <form 
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full bg-[#FAF6F0] rounded-none overflow-hidden p-1 shadow-md focus-within:ring-1 focus-within:ring-[#B38E6B] transition-all"
                >
                  <input
                    type="email"
                    required
                    className="bg-transparent border-none text-xs font-sans tracking-wide text-[#103033] outline-none w-full py-3 px-4"
                    placeholder="E-mail Address"
                  />
                  <button 
                    type="submit" 
                    className="p-3 bg-[#B38E6B] text-[#103033] hover:bg-[#103033] hover:text-white transition-all cursor-pointer flex items-center justify-center" 
                    aria-label="Submit Newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

            {/* Bottom Copyright bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[11px] text-white/40 uppercase tracking-widest">
              <span>Copyright &copy; 2022 Musemind | All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms</a>
                <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
              </div>
            </div>

          </div>
        </footer>

      </section>

      {/* 9. INTERACTIVE VIDEO PLAYBACK MODAL */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setVideoModalOpen(false)} />

            <div className="relative w-full max-w-[800px] aspect-[16/9] bg-black shadow-2xl z-10 flex flex-col">
              
              {/* Close button */}
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest cursor-pointer"
              >
                <X className="w-5 h-5" />
                Close
              </button>

              {/* Video Player */}
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/j1.mp4"
                  autoPlay
                  loop
                  muted={videoMuted}
                  playsInline
                  className="w-full h-full object-contain"
                />

                {/* Floating Video Controllers */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                  <button
                    onClick={toggleModalPlay}
                    className="p-3.5 rounded-full bg-black/75 text-white border border-white/10 hover:border-[#B38E6B] hover:text-[#B38E6B] transition-colors cursor-pointer"
                    title={videoPlaying ? "Pause" : "Play"}
                  >
                    {videoPlaying ? <Pause className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleModalMute}
                    className="p-3.5 rounded-full bg-black/75 text-white border border-white/10 hover:border-[#B38E6B] hover:text-[#B38E6B] transition-colors cursor-pointer"
                    title={videoMuted ? "Unmute" : "Mute"}
                  >
                    {videoMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. STATEFUL CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF6F0] shadow-2xl z-50 flex flex-col border-l border-[#103033]/10"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#103033]/10 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#103033] font-light">Shopping Bag</h3>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1 text-[#103033] hover:text-[#B38E6B] transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                    <ShoppingBag className="w-12 h-12 text-[#103033]/20" />
                    <p className="font-sans text-sm text-[#103033]/60 tracking-wider">Your shopping bag is empty.</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-2.5 bg-[#103033] text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#B38E6B] transition-colors cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.material}`} className="flex gap-4 items-center pb-4 border-b border-[#103033]/[0.06]">
                      {/* Product image */}
                      <div className="w-20 h-20 bg-[#FAF6F0] p-2 border border-[#103033]/10 flex items-center justify-center flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="font-serif text-base text-[#103033] font-normal leading-tight">{item.name}</h4>
                        <span className="text-[10px] text-[#B38E6B] uppercase font-bold tracking-widest block mt-0.5">{item.material} Collection</span>
                        <span className="text-xs text-[#103033]/60 font-sans block mt-1">{item.price}</span>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 border border-[#103033]/20 hover:border-[#103033] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 border border-[#103033]/20 hover:border-[#103033] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#103033]/40 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Footer Section */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#103033]/10 bg-[#F0E6D8]/30 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-sm font-sans tracking-wide">
                    <span className="text-[#103033]/60 uppercase font-semibold">Subtotal</span>
                    <span className="font-serif text-lg text-[#103033] font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-sans tracking-wide text-[#103033]/50">
                    <span>SHIPPING & TAXES</span>
                    <span>CALCULATED AT CHECKOUT</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#103033] text-white hover:bg-[#B38E6B] text-xs font-semibold uppercase tracking-widest transition-colors duration-300 rounded-none shadow-md cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 11. STATEFUL WISHLIST DRAWER */}
      <AnimatePresence>
        {wishlistOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF6F0] shadow-2xl z-50 flex flex-col border-l border-[#103033]/10"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#103033]/10 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#103033] font-light">My Wishlist</h3>
                <button 
                  onClick={() => setWishlistOpen(false)}
                  className="p-1 text-[#103033] hover:text-[#B38E6B] transition-colors cursor-pointer"
                  aria-label="Close wishlist"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {wishlist.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                    <Heart className="w-12 h-12 text-[#103033]/20" />
                    <p className="font-sans text-sm text-[#103033]/60 tracking-wider">Your wishlist is empty.</p>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <div key={`${item.id}-${item.material}`} className="flex gap-4 items-center pb-4 border-b border-[#103033]/[0.06]">
                      {/* Product image */}
                      <div className="w-16 h-16 bg-[#FAF6F0] p-1 border border-[#103033]/10 flex items-center justify-center flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="font-serif text-sm text-[#103033] font-normal leading-tight">{item.name}</h4>
                        <span className="text-[9px] text-[#B38E6B] uppercase font-bold tracking-widest block mt-0.5">{item.material} Collection</span>
                        <span className="text-xs text-[#103033]/60 font-sans block mt-1">{item.price}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item); // Remove from wishlist when added to cart
                          }}
                          className="px-3 py-1.5 bg-[#103033] text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-[#B38E6B] transition-colors cursor-pointer"
                        >
                          Add to Bag
                        </button>
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="text-red-500 hover:text-red-700 transition-colors text-xs font-sans font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 12. ELEGANT CHECKOUT SUCCESS TOAST */}
      <AnimatePresence>
        {checkoutSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#103033] text-white border border-[#B38E6B]/30 px-8 py-5 shadow-2xl z-50 flex flex-col items-center gap-2 text-center rounded-none max-w-md w-[90%]"
          >
            <div className="w-10 h-10 rounded-full bg-[#B38E6B]/20 flex items-center justify-center mb-1">
              <svg fill="none" stroke="#B38E6B" strokeWidth="2.5" viewBox="0 0 24 24" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h4 className="font-serif text-lg tracking-wider font-semibold">Order Placed Successfully!</h4>
            <p className="text-[11px] text-white/70 font-sans tracking-wide leading-relaxed">
              Thank you for your simulated purchase at Eglanto. Your handcrafted masterpieces are being prepared.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
