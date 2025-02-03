import React, { useState } from "react";

const services = [
  { id: 1, name: "Fitness Class", price: 20 },
  { id: 2, name: "Therapy Session", price: 50 },
  { id: 3, name: "Workshop", price: 30 },
];

export default function POS() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [refNumber] = useState(Math.floor(Math.random() * 1000000000000));
  const paymentTime = new Date().toLocaleString();

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (cart.length === 0 || !customer.name || !customer.email || !customer.phone) {
      alert("Please fill in customer details and add items to the cart before checkout.");
      return;
    }
    setCheckoutComplete(true);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white text-gray-900 min-h-screen rounded-lg shadow-lg">
      {checkoutComplete ? (
        /** ✅ Cleaned Up Receipt */
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <div className="p-4 rounded-lg flex flex-col items-center">
            <div className="text-green-500 text-3xl mb-2">✔</div>
            <h2 className="text-2xl font-bold">Payment Success!</h2>
            <p className="text-xl font-semibold">${total.toFixed(2)}</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg mt-4 text-left">
            <h3 className="text-lg font-bold">Payment Details</h3>
            <p className="text-gray-600">Ref Number: {refNumber}</p>
            <p className="text-gray-600">Payment Status: <span className="text-green-600">✔ Success</span></p>
            <p className="text-gray-600">Payment Time: {paymentTime}</p>
            <p className="text-gray-600 font-semibold">Total Payment: ${total.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mt-4 text-left">
            <h3 className="text-lg font-bold">Need Help?</h3>
            <p className="text-gray-600">Contact our support team anytime.</p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">Smart POS System - Service Sales Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className="p-4 bg-gray-200 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <p className="text-gray-700">${service.price}</p>
                <button
                  className="mt-2 bg-gray-900 hover:bg-gray-700 text-white py-1 px-3 rounded"
                  onClick={() => addToCart(service)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">No items in cart</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between py-2 border-b border-gray-300">
                    {item.name} - ${item.price}
                    <button className="text-red-500" onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Customer Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 rounded bg-gray-100 text-gray-900 mb-2"
              value={customer.name}
              onChange={handleCustomerChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-gray-100 text-gray-900 mb-2"
              value={customer.email}
              onChange={handleCustomerChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full p-2 rounded bg-gray-100 text-gray-900 mb-2"
              value={customer.phone}
              onChange={handleCustomerChange}
            />
          </div>
          <button
            className="mt-4 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded w-full"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
