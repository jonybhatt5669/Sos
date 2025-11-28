import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromoBannerProps {
  onShopClick: () => void;
}

export function PromoBanner({ onShopClick }: PromoBannerProps) {
  return (
    <section className="py-20 bg-linear-to-r from-black via-black to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-2xl bg-linear-to-r from-red-600 to-red-500 p-12 md:p-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              className="flex items-center gap-2 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-white" />
              <span className="text-white font-semibold">Limited Time Offer</span>
            </motion.div>

            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Save Up to 40%
              </motion.span>
              <br />
              <span className="text-white/80">on Premium Beauty</span>
            </h2>

            <p className="text-white/90 text-lg mb-8 max-w-2xl">
              Elevate your beauty routine with our exclusive collection. Premium quality products at unbeatable prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onShopClick}
                  className="bg-black text-red-600 hover:bg-gray-900 px-8 py-6 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <Zap className="h-5 w-5" />
                  Shop Now
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-2 border-white  hover:bg-white/20 px-8 py-6 text-lg font-semibold rounded-lg"
                >
                  View Deals
                </Button>
              </motion.div>
            </div>

            {/* Timer or countdown */}
            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {['Days', 'Hours', 'Minutes'].map((unit, i) => (
                <motion.div
                  key={unit}
                  className="text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-white/80">{unit}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
