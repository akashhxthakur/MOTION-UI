'use client';

import { motion } from 'framer-motion';
import type { DemoProduct } from '@/lib/commerceDemoData';
import { getDevicePalette } from '@/lib/deviceDesignSystem';
import { useDevice } from './deviceContext';
import { DeviceGlassCard } from './DeviceGlassCard';

interface DeviceProductCardProps {
  product: DemoProduct;
}

export function DeviceProductCard({ product }: DeviceProductCardProps) {
  const { deviceMode, cart, favorites, addToCart, removeFromCart, toggleFavorite } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const qty = cart[product.id] ?? 0;
  const fav = favorites[product.id] ?? false;

  return (
    <DeviceGlassCard className="!p-[0.55rem]">
      <div className="relative">
        <div
          className="flex aspect-[4/3] items-center justify-center rounded-[0.65rem] text-[1.5rem]"
          style={{ backgroundColor: palette.input }}
        >
          {product.emoji}
        </div>
        {product.promo ? (
          <span className="absolute left-1 top-1 rounded-full bg-blue-600 px-1 py-0.5 text-[0.45rem] font-semibold text-white">
            PROMO
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full text-[0.55rem]"
          style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>
      <p className="font-ui mt-1 truncate text-[0.65rem] font-medium">{product.name}</p>
      <p className="font-tabular text-[0.7rem] font-semibold">${product.price.toFixed(2)}</p>
      <div className="mt-1 flex items-center justify-between gap-1">
        {qty === 0 ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product.id)}
            className="font-ui flex-1 rounded-md py-1 text-[0.55rem] font-semibold text-white"
            style={{ backgroundColor: palette.primary }}
          >
            Add
          </motion.button>
        ) : (
          <div
            className="flex flex-1 items-center justify-between rounded-md px-1 py-0.5"
            style={{ backgroundColor: palette.input }}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromCart(product.id)}
              className="px-1 text-[0.7rem]"
            >
              −
            </motion.button>
            <span className="font-tabular text-[0.6rem] font-semibold">{qty}</span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product.id)}
              className="px-1 text-[0.7rem]"
            >
              +
            </motion.button>
          </div>
        )}
      </div>
    </DeviceGlassCard>
  );
}
