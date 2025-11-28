import { useState } from 'react';
import { ShoppingCart, Heart, Star, ChevronLeft, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: number) => void;
  isInWishlist: boolean;
}

export function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 p-6 bg-black border-b border-gray-800 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:text-red-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {product.name}
        </h1>
      </motion.div>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image */}
          <motion.div
            className="flex items-center justify-center bg-gray-900 rounded-lg p-6 border border-gray-800"
            variants={itemVariants}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg max-h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Details */}
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <Badge className="bg-red-600 text-white">{product.category}</Badge>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-red-600 text-red-600" />
                  <span className="text-lg font-semibold text-white ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {product.name}
              </h2>
              <p className="text-gray-400 text-lg">{product.description}</p>
            </motion.div>

            {/* Price */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <p className="text-sm text-gray-400">Price</p>
              <motion.p
                className="text-5xl font-bold text-red-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {product.price.toFixed(0)} tk
              </motion.p>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <p className="text-sm text-white font-medium">Quantity</p>
              <div className="flex items-center gap-4 bg-gray-900 rounded-lg w-fit p-2 border border-gray-700">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 hover:bg-gray-800 hover:text-white"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </motion.div>
                <span className="text-lg font-semibold w-8 text-center text-white">{quantity}</span>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 hover:bg-gray-800 hover:text-white"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex gap-4 pt-6" variants={itemVariants}>
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAddToCart}
                  className={`w-full py-6 text-lg flex items-center justify-center gap-2 transition-all ${
                    addedToCart
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 border-gray-700 hover:bg-gray-900 hover:border-red-600"
                  onClick={() => onToggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isInWishlist
                        ? 'fill-red-600 text-red-600'
                        : 'text-white'
                    }`}
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* Benefits */}
            <motion.div className="grid grid-cols-3 gap-4 pt-6" variants={containerVariants}>
              {[
                { icon: Truck, label: 'Fast Delivery' },
                { icon: Shield, label: 'Secure' },
                { icon: RotateCcw, label: 'Easy Return' },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <benefit.icon className="h-6 w-6 mx-auto text-red-600 mb-2" />
                  <p className="text-sm text-gray-400">{benefit.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Product Info */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-gray-700 bg-gray-900">
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Product Information
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium text-white">{product.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Rating:</span>
                    <span className="font-medium text-white">{product.rating}/5</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Reviews:</span>
                    <span className="font-medium text-white">{product.reviews}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>In Stock:</span>
                    <span className="font-medium text-green-400">Yes</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
