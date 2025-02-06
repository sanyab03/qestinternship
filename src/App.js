import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const services = [
  { id: 1, name: "Fitness Class", price: 20, image: "images/workoutnew.avif", discount: "10% Off" },
  { id: 2, name: "Therapy Session", price: 50, image: "images/therapy.jpg", discount: "15% Off" },
  { id: 3, name: "Workshop", price: 30, image: "images/workshopnew.avif", discount: "15% Off" },
];

export default function POS() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [showReceipt, setShowReceipt] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!customer.name || !customer.email || !customer.phone) {
      alert("Please enter your details before checkout.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty! Please add items before checkout.");
      return;
    }

    setShowReceipt(true);
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountPercentage = parseInt(discount);
    return price - price * (discountPercentage / 100);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-900">
      <div className="lg:w-3/4 w-full p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-2 sm:mb-0">Smart POS System</h1>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded-lg pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-3 text-gray-500" />
          </div>
        </div>

        <h2 className="text-2xl font-medium mt-6">Recommended Services</h2>
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {filteredServices.map((service) => {
              const discountedPrice = calculateDiscountedPrice(service.price, service.discount.replace("% Off", ""));
              return (
                <div
                  key={service.id}
                  className="bg-white p-4 rounded-lg shadow-md relative flex flex-col justify-between"
                >
                  <span className="absolute top-2 left-2 bg-white text-black text-xs px-3 py-1 rounded-full shadow-md">
                    {service.discount}
                  </span>

                  <div className="w-full h-49 overflow-hidden rounded-lg">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <h3 className="text-lg font-semibold mt-2">{service.name}</h3>

                  <div className="flex items-center">
                    <p className="text-gray-500 line-through mr-2">${service.price}</p>
                    <p className="text-lg font-semibold">${discountedPrice.toFixed(2)}</p>
                  </div>

                  <button
                    className="mt-2 bg-pink-900 hover:bg-pink-700 text-white py-2 px-3 rounded w-full"
                    onClick={() => addToCart({ ...service, price: discountedPrice })}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center mt-6 text-gray-500">No services found matching your search.</p>
        )}
      </div>

      <div className="lg:w-1/4 w-full bg-black text-white p-6 rounded-l-lg">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">No items in cart</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between py-2 border-b border-gray-700">
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-400">${item.price}</p>
                </div>
                <button className="text-red-400" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Customer Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full p-2 text-black rounded-md mb-2"
            onChange={handleInputChange}
            value={customer.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full p-2 text-black rounded-md mb-2"
            onChange={handleInputChange}
            value={customer.email}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone"
            className="w-full p-2 text-black rounded-md mb-2"
            onChange={handleInputChange}
            value={customer.phone}
          />
        </div>

        <p className="mt-4 font-semibold text-lg">Total: ${total.toFixed(2)}</p>
        <button
          className="mt-4 bg-pink-700 hover:bg-pink-500 text-white py-2 px-4 rounded w-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>

      {showReceipt && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-11/12 sm:w-1/2 md:w-1/3">
            <h2 className="text-xl font-bold text-center mb-4">Receipt</h2>
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <hr className="my-3" />
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <hr className="my-3" />
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              className="mt-4 bg-pink-900 hover:bg-pink-700 text-white py-2 px-4 rounded w-full"
              onClick={() => setShowReceipt(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
