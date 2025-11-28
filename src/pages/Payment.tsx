import { useState } from 'react';
import { ChevronLeft, Lock, Check, CreditCard, Smartphone, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface PaymentPageProps {
  total: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export function PaymentPage({ total, onBack, onPaymentComplete }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [mobileData, setMobileData] = useState({
    provider: '',
    phoneNumber: '',
    pin: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'bkash',
      name: 'bKash',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Mobile wallet payment'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'Mobile banking service'
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: <Landmark className="h-6 w-6" />,
      description: 'Digital payment solution'
    }
  ];

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMobileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isCardValid = cardData.cardNumber && cardData.cardName && cardData.expiry && cardData.cvv;
  const isMobileValid = mobileData.provider && mobileData.phoneNumber && mobileData.pin;

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setPaymentComplete(true);
  };

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

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Check className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Payment Successful!
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Your order has been confirmed. Thank you for your purchase.
          </p>
          <motion.div
            className="text-5xl font-bold text-red-600 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {total.toFixed(0)} tk
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onPaymentComplete}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

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
          Payment
        </h1>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Payment Methods & Form */}
          <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
            {/* Select Payment Method */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-gray-700 bg-gray-900">
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedMethod === method.id
                          ? 'border-red-600 bg-gray-800'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className={`${selectedMethod === method.id ? 'text-red-600' : 'text-gray-400'}`}>
                        {method.icon}
                      </div>
                      <h3 className="font-semibold text-white mt-2">{method.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{method.description}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Card Payment Form */}
            {selectedMethod === 'card' && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="p-6 border-gray-700 bg-gray-900">
                  <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Card Details
                  </h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Card Number"
                      name="cardNumber"
                      maxLength={16}
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Input
                      placeholder="Cardholder Name"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleCardChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="MM/YY"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                      <Input
                        placeholder="CVV"
                        name="cvv"
                        maxLength={4}
                        type="password"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Mobile Payment Form */}
            {(selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="p-6 border-gray-700 bg-gray-900">
                  <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Mobile Wallet Details
                  </h3>
                  <div className="space-y-4">
                    <select
                      name="provider"
                      value={mobileData.provider}
                      onChange={handleMobileChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Select Provider</option>
                      <option value="bkash">bKash</option>
                      <option value="nagad">Nagad</option>
                      <option value="rocket">Rocket</option>
                    </select>
                    <Input
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={mobileData.phoneNumber}
                      onChange={handleMobileChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Input
                      placeholder="Transaction PIN"
                      name="pin"
                      type="password"
                      maxLength={6}
                      value={mobileData.pin}
                      onChange={handleMobileChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Payment Summary Sidebar */}
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
                  <span>Amount to Pay</span>
                  <span className="font-medium text-white">{total.toFixed(0)} tk</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-sm text-green-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="h-4 w-4" />
                  Secure Payment
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
                  onClick={handlePayment}
                  disabled={
                    isProcessing ||
                    (selectedMethod === 'card' && !isCardValid) ||
                    ((selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && !isMobileValid)
                  }
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-6 text-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Lock className="h-5 w-5" />
                      </motion.div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay {total.toFixed(0)} tk
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 text-xs text-gray-400 text-center mt-4"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="h-4 w-4 text-green-500 shrink-0" />
                Your payment is protected by SSL encryption.
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
