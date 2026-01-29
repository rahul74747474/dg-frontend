import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import dayjs from "dayjs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

interface Order {
  _id: string;
  createdAt: string;
  payment_status: "PAID" | "PENDING" | "FAILED";
  totalAmt: number;
  products: {
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
}

export default function Orders() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    api
      .get("/orders/my-orders")
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch((err) => {
        console.error("Fetch orders failed", err);
      })
      .finally(() => setFetching(false));
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* PAGE TITLE */}
            <div>
              <h1 className="text-2xl font-bold text-brand-purple-dark">
                My Orders
              </h1>
              <p className="text-sm text-brand-gray-light">
                Track and manage your orders
              </p>
            </div>

            {/* LOADING */}
            {fetching && (
              <p className="text-sm text-gray-500">Loading orders...</p>
            )}

            {/* EMPTY STATE */}
            {!fetching && orders.length === 0 && (
              <div className="bg-white p-8 rounded-lg border text-center">
                <p className="text-gray-600 mb-4">
                  You haven’t placed any orders yet.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-5 py-2 bg-brand-purple text-white rounded-lg font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            )}

            {/* ORDERS LIST */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border rounded-lg p-5 space-y-4"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold">
                        Order #{order._id.slice(-6)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Placed on{" "}
                        {dayjs(order.createdAt).format("DD MMM YYYY")}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        order.payment_status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : order.payment_status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>

                  {/* PRODUCTS */}
                  <div className="space-y-3">
                    {order.products.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded border"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center border-t pt-3">
                    <p className="text-sm font-semibold">
                      Total: ₹{order.totalAmt}
                    </p>

                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="text-sm font-semibold text-brand-purple hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
