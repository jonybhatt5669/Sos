import { useState } from 'react';
import { ChevronLeft, Trash2, CreditCard, Package, Lock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onPayment: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function Checkout({
  cart,
  onBack,
  onPayment,
  onRemoveItem,
  onUpdateQuantity
}: CheckoutProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 50;
  const tax = Math.round(cartTotal * 0.05 * 100) / 100;
  const total = cartTotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 p-6 bg-black border-b border-gray-800 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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
          Checkout
        </h1>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Checkout Form */}
          <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
            {/* Shipping Information */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-gray-700 bg-gray-900">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Truck className="h-5 w-5 text-red-600" />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Input
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Input
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <textarea
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    rows={3}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Input
                      placeholder="Postal Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-gray-700 bg-gray-900">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Package className="h-5 w-5 text-red-600" />
                  Order Items ({cart.length})
                </h2>
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-600 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.price.toFixed(0)} tk × {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-red-600 mt-1">
                          Total: {(item.price * item.quantity).toFixed(0)} tk
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 bg-gray-700 border-gray-600 text-white h-8"
                          />
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-gray-700"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="p-6 border-gray-700 bg-gray-900 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <motion.div
                  className="flex justify-between text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <span>Subtotal</span>
                  <span className="font-medium text-white">{cartTotal.toFixed(0)} tk</span>
                </motion.div>
                <motion.div
                  className="flex justify-between text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <span>Shipping</span>
                  <span className="font-medium text-white">{shippingCost.toFixed(0)} tk</span>
                </motion.div>
                <motion.div
                  className="flex justify-between text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <span>Tax (5%)</span>
                  <span className="font-medium text-white">{tax.toFixed(0)} tk</span>
                </motion.div>
                <div className="border-t border-gray-700 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <motion.span
                    className="text-3xl font-bold text-red-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {total.toFixed(0)} tk
                  </motion.span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onPayment}
                  disabled={!isFormValid || cart.length === 0}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-6 text-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Proceed to Payment
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 text-xs text-gray-400 text-center mt-4"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="h-4 w-4 text-green-500 shrink-0" />
                Your payment information is secure and encrypted.
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
