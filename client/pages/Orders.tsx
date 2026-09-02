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
  orderNumber?: string;
  createdAt: string;
  orderStatus?: string;
  payment?: {
    method?: string;
    status?: string;
  };
  payment_status?: string;
  pricing?: {
    subTotal: number;
    discount?: number;
    shipping: number;
    tax: number;
    grandTotal: number;
  };
  totalAmt?: number;
  items?: {
    productId?: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  products?: {
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  shipping?: {
    awbCode?: string;
    courierName?: string;
    shipmentId?: string;
  };
  shipmentDetails?: {
    awbCode?: string;
  };
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
                Track and manage your previous orders
              </p>
            </div>

            {/* LOADING */}
            {fetching && (
              <div className="py-12 text-center text-gray-500">
                <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm">Loading your orders...</p>
              </div>
            )}

            {/* EMPTY STATE */}
            {!fetching && orders.length === 0 && (
              <div className="bg-white p-8 rounded-xl border text-center shadow-sm">
                <p className="text-gray-600 mb-4">
                  You haven’t placed any orders yet.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-5 py-2.5 bg-brand-purple text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Shopping
                </button>
              </div>
            )}

            {/* ORDERS LIST */}
            <div className="space-y-4">
              {orders.map((order) => {
                const orderItems = order.items || order.products || [];
                const grandTotal = order.pricing?.grandTotal ?? order.totalAmt ?? 0;
                const paymentStatus = order.payment?.status || order.payment_status || "PENDING";
                const orderIdDisplay = order.orderNumber || `#${order._id.slice(-6)}`;

                return (
                  <div
                    key={order._id}
                    className="bg-white border rounded-xl p-5 space-y-4 shadow-sm"
                  >
                    {/* HEADER */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-brand-gray-dark">
                          Order {orderIdDisplay}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Placed on {dayjs(order.createdAt).format("DD MMM YYYY, hh:mm A")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            paymentStatus === "SUCCESS" || paymentStatus === "PAID"
                              ? "bg-green-100 text-green-700"
                              : paymentStatus === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {paymentStatus === "SUCCESS" ? "PAID" : paymentStatus}
                        </span>
                        {order.orderStatus && (
                          <span className="text-xs px-2.5 py-1 bg-purple-50 text-brand-purple font-semibold rounded-full border border-purple-200">
                            {order.orderStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* PRODUCTS */}
                    <div className="space-y-3 pt-2">
                      {orderItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded-lg border"
                            />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-brand-gray-dark">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-brand-purple">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-between items-center border-t pt-4">
                      <div>
                        <span className="text-xs text-gray-500">Total Paid: </span>
                        <span className="text-base font-bold text-brand-purple-dark">
                          ₹{grandTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            navigate(
                              order.shipping?.awbCode
                                ? `/track-order?awb=${encodeURIComponent(order.shipping.awbCode)}`
                                : `/track-order`
                            )
                          }
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-brand-purple text-xs font-semibold rounded-lg border border-purple-200 transition-colors cursor-pointer"
                        >
                          Track Order 🚚
                        </button>
                        <button
                          onClick={() => navigate("/order-success", { state: { orderId: order._id } })}
                          className="text-sm font-semibold text-brand-purple hover:underline"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
