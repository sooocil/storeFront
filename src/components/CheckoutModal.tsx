"use client";

import { useCartStore } from "@/store/cartStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: Props) {
  const cart = useCartStore((state) => state.cart);

  if (!open) return null;

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/60  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 rounded p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {cart.length === 0 ? (
          <p className="mb-4">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-3 mb-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain border rounded"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold">{item.title}</p>
                    <p>${item.price}</p>
                    <p>Qty: 1</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t pt-2 mb-4">
              <p className="font-bold text-right">Subtotal: ${total}</p>
              <p className="text-sm text-gray-600 text-right">Delivery: Free</p>
            </div>

            
          </>
        )}

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
          {cart.length > 0 && (
            <button
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              onClick={onClose}
            >
              Confirm Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
