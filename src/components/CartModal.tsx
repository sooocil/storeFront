"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartModal({ open, onClose }: Props) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!open) return null;

  const handleCheckout = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 rounded p-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="flex items-center gap-3"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain border rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.title}</p>
                </div>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
          {cart.length > 0 && (
            <button
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
