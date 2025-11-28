import { useState, useMemo } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, Star, Plus, Minus, Trash2, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductDetails } from '@/pages/ProductDetails';
import { Checkout } from '@/pages/Checkout';
import { PaymentPage } from '@/pages/Payment';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { PromoBanner } from '@/components/PromoBanner';

const PRODUCTS = [
  {
    id: 1,
    name: "Hydrating Face Serum",
    category: "Skincare",
    price: 1200,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    description: "Intensive hydration with hyaluronic acid"
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    price: 650,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    description: "Long-lasting matte finish"
  },
  {
    id: 3,
    name: "Vitamin C Brightening Cream",
    category: "Skincare",
    price: 1350,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    description: "Brightens and evens skin tone"
  },
  {
    id: 4,
    name: "Natural Glow Foundation",
    category: "Makeup",
    price: 1000,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 203,
    description: "Lightweight, buildable coverage"
  },
  {
    id: 5,
    name: "Rose Water Toner",
    category: "Skincare",
    price: 750,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 98,
    description: "Refreshing and balancing toner"
  },
  {
    id: 6,
    name: "Luxury Eye Shadow Palette",
    category: "Makeup",
    price: 1300,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 167,
    description: "12 stunning shades"
  },
  {
    id: 7,
    name: "Anti-Aging Night Cream",
    category: "Skincare",
    price: 1700,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b7f7e2?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 142,
    description: "Reduces fine lines overnight"
  },
  {
    id: 8,
    name: "Volumizing Mascara",
    category: "Makeup",
    price: 600,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 211,
    description: "Dramatic volume and length"
  },
  {
    id: 9,
    name: "Gentle Cleansing Oil",
    category: "Skincare",
    price: 850,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 178,
    description: "Melts away makeup effortlessly"
  },
  {
    id: 10,
    name: "Cream Blush Duo",
    category: "Makeup",
    price: 780,
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fe31?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 93,
    description: "Natural flush of color"
  },
  {
    id: 11,
    name: "SPF 50 Sunscreen",
    category: "Skincare",
    price: 900,
    image: "https://images.unsplash.com/photo-1556228994-1b1f0b8b3a3e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 189,
    description: "Broad spectrum protection"
  },
  {
    id: 12,
    name: "Brow Defining Kit",
    category: "Makeup",
    price: 690,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 134,
    description: "Perfect brows made easy"
  }
];

export default function CosmeticsStore() {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Skincare', 'Makeup'];

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'priceLow':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.reverse();
        break;
      default:
        break;
    }

    return products;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const addToCart = (product: any, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCheckoutQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle page navigation
  if (currentPage === 'productDetails' && selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => {
          setCurrentPage('home');
          setSelectedProduct(null);
        }}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={wishlist.includes(selectedProduct.id)}
      />
    );
  }

  if (currentPage === 'checkout') {
    return (
      <Checkout
        cart={cart}
        onBack={() => setCurrentPage('home')}
        onPayment={() => setCurrentPage('payment')}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCheckoutQuantity}
      />
    );
  }

  if (currentPage === 'payment') {
    return (
      <PaymentPage
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 50 + Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05 * 100) / 100}
        onBack={() => setCurrentPage('checkout')}
        onPaymentComplete={() => {
          setCart([]);
          setCurrentPage('home');
        }}
      />
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <motion.button
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedProduct(null);
                }}
                className="text-2xl font-bold text-white hover:text-red-600 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SOS
              </motion.button>
              <nav className="hidden md:flex gap-6">
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600"
                />
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="text-white hover:text-red-600 hover:bg-gray-900">
                  <User className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-white hover:text-red-600 hover:bg-gray-900"
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-white hover:text-red-600 hover:bg-gray-900"
                  onClick={() => setShowCart(!showCart)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </motion.div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-red-600 hover:bg-gray-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-800 bg-black"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-4 py-4 space-y-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border-gray-700 text-white"
              />
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? 'bg-red-600 text-white font-medium'
                        : 'text-gray-400 hover:bg-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <HeroSection onShopClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} />

      {/* Hero Section */}
      {/* <HeroSection onShopClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} /> */}

      {/* Promo Banner */}
      <PromoBanner onShopClick={() => {}} />

      {/* Featured Products Section */}
      <FeaturedProducts
        products={filteredProducts.slice(0, 8)}
        onProductClick={(product) => {
          setSelectedProduct(product);
          setCurrentPage('productDetails');
        }}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={(productId) => wishlist.includes(productId)}
      />

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h3>
          <p className="text-gray-400">{filteredProducts.length} products</p>
        </div>

        {/* Filter and Sort Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <Card className="p-4 border-gray-700 bg-gray-900 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-white">Filters</h3>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-white mb-3 text-sm">Price Range</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400">Min: {priceRange.min} tk</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      className="w-full accent-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Max: {priceRange.max} tk</label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full accent-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="font-medium text-white mb-3 text-sm">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg text-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="border-gray-700 bg-gray-900 hover:border-red-600 transition-all cursor-pointer h-full"
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentPage('productDetails');
                    }}
                  >
                    <CardHeader className="p-0">
                      <div className="relative group overflow-hidden rounded-t-lg">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-3 right-3 p-2 bg-black/70 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              wishlist.includes(product.id)
                                ? 'fill-red-600 text-red-600'
                                : 'text-white'
                            }`}
                          />
                        </motion.button>
                        <Badge className="absolute top-3 left-3 bg-red-600">
                          {product.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-semibold text-white mb-2">
                        {product.name}
                      </CardTitle>
                      <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-red-600 text-red-600" />
                          <span className="text-sm font-medium text-white ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                      <p className="text-2xl font-bold text-red-600">{product.price.toFixed(0)} tk</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <motion.div
                        className="w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Add to Cart
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowCart(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-black shadow-xl border-l border-gray-700"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Shopping Cart</h3>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCart(false)}
                    className="text-white hover:text-red-600"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 border-b border-gray-700 pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.name}</h4>
                          <p className="text-sm text-gray-400">{item.price.toFixed(0)} tk</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-gray-600 hover:bg-gray-800"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3 text-white" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center text-white">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-gray-600 hover:bg-gray-800"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3 text-white" />
                            </Button>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="ml-auto"
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-600 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-red-600">
                      {cartTotal.toFixed(0)} tk
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => {
                        setShowCart(false);
                        setCurrentPage('checkout');
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                    >
                      Checkout
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>SOS</h4>
              <p className="text-gray-400 text-sm">
                Premium beauty products for the modern woman
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Shop</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="cursor-pointer hover:text-red-600 transition-colors">Skincare</li>
                <li className="cursor-pointer hover:text-white">Makeup</li>
                <li className="cursor-pointer hover:text-white">New Arrivals</li>
                <li className="cursor-pointer hover:text-white">Best Sellers</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="cursor-pointer hover:text-red-600 transition-colors">Contact Us</li>
                <li className="cursor-pointer hover:text-red-600 transition-colors">Shipping Info</li>
                <li className="cursor-pointer hover:text-red-600 transition-colors">Returns</li>
                <li className="cursor-pointer hover:text-red-600 transition-colors">FAQ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Newsletter</h5>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe for exclusive offers
              </p>
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Sos . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}