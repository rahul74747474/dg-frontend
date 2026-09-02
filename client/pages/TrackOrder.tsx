import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  CheckCircle,
  Truck,
  RefreshCw,
  ExternalLink,
  MapPin,
  Calendar,
  AlertCircle,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "../api/axios";
import { toast } from "sonner";

interface TrackingActivity {
  date: string;
  status: string;
  activity: string;
  location: string | null;
  srStatus?: string | number | null;
  srStatusLabel?: string | null;
}

interface TrackingData {
  awb_code: string;
  current_status: string;
  current_status_id?: number | string | null;
  shipment_status?: number | string | null;
  courier_name: string;
  courier_company_id?: number | string | null;
  shipment_id?: number | string | null;
  order_id?: number | string | null;
  pickup_date?: string | null;
  delivered_date?: string | null;
  origin?: string | null;
  destination?: string | null;
  delivered_to?: string | null;
  edd?: string | null;
  etd?: string | null;
  updated_time_stamp?: string | null;
  track_url?: string | null;
  shipment_track_activities?: TrackingActivity[];
  is_return?: boolean;
  orderDetails?: {
    orderNumber?: string;
    items?: any[];
    address?: any;
    amount?: number;
    orderDate?: string;
  } | null;
}

function formatDisplayDate(
  dateStr?: string | null,
  includeTime = false
): string | null {
  if (!dateStr || dateStr === "NA" || dateStr === "null") return null;
  try {
    const cleanStr = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T");
    const d = new Date(cleanStr);
    if (isNaN(d.getTime())) return dateStr;
    if (includeTime) {
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function TrackOrder() {
  const [searchParams] = useSearchParams();

  const [awbInput, setAwbInput] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchTracking = useCallback(
    async (awbToTrack: string, isManualRefresh = false) => {
      const cleanAwb = awbToTrack.trim();
      if (!cleanAwb) {
        setError("Please enter an AWB code.");
        return;
      }

      try {
        if (isManualRefresh) {
          setIsRefreshing(true);
        } else {
          setLoading(true);
        }
        setError("");

        const res = await api.get(`/track/${encodeURIComponent(cleanAwb)}`);

        if (res.data?.success && res.data.data) {
          setTrackingInfo(res.data.data);
          setIsSearched(true);
          if (isManualRefresh) {
            toast.success("Tracking information refreshed");
          }
        } else {
          setError(
            res.data?.message || "Tracking information not found for this AWB."
          );
          setTrackingInfo(null);
          setIsSearched(true);
        }
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          "Unable to fetch tracking information right now. Please try again.";

        setError(message);
        setTrackingInfo(null);
        setIsSearched(true);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Auto-search if ?awb= is present in URL
  useEffect(() => {
    const paramAwb =
      searchParams.get("awb") ||
      searchParams.get("orderId") ||
      searchParams.get("orderNumber");

    if (paramAwb) {
      const clean = paramAwb.trim();
      setAwbInput(clean);
      fetchTracking(clean);
    }
  }, [searchParams, fetchTracking]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awbInput.trim()) {
      setError("Please enter an AWB code.");
      return;
    }
    fetchTracking(awbInput);
  };

  const handleRefresh = () => {
    if (awbInput.trim()) {
      fetchTracking(awbInput, true);
    }
  };

  const handleReset = () => {
    setIsSearched(false);
    setAwbInput("");
    setTrackingInfo(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-brand-peach-bg border-b border-orange-100">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Track Order
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-sm sm:text-base">
                Track your shipment in real-time using your Shiprocket AWB code
              </p>
            </div>
          </Container>
        </section>

        {/* Search Form */}
        <Container>
          <div className="max-w-3xl mx-auto py-10">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                  AWB Code
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="e.g. 372174630537"
                      value={awbInput}
                      onChange={(e) => {
                        setAwbInput(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-brand-gray-border rounded-xl text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !awbInput.trim()}
                    className="py-3 px-6 bg-brand-purple text-white font-semibold rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md shadow-brand-purple/20"
                  >
                    <Search size={18} />
                    {loading ? "Tracking..." : "Track Order"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Enter the Air Waybill (AWB) tracking number assigned to your package by the courier.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}
            </form>

            {/* Loading Indicator */}
            {loading && (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-brand-gray text-sm">
                  Querying Shiprocket tracking network...
                </p>
              </div>
            )}

            {/* TRACKING RESULTS */}
            {isSearched && trackingInfo && !loading && (
              <div className="mt-8 space-y-6">
                {/* Status & Courier Header Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Current Status
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-purple capitalize flex items-center gap-2.5 mt-1">
                        <Truck className="text-brand-purple flex-shrink-0" size={26} />
                        <span>{trackingInfo.current_status || "In Transit"}</span>
                      </h2>
                      <p className="text-sm font-semibold text-gray-700 mt-1">
                        {trackingInfo.courier_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw
                          size={14}
                          className={isRefreshing ? "animate-spin text-brand-purple" : ""}
                        />
                        {isRefreshing ? "Refreshing..." : "Refresh"}
                      </button>

                      {trackingInfo.track_url && (
                        <a
                          href={trackingInfo.track_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink size={14} /> Track on Shiprocket
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Key Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-5">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">AWB Code</p>
                      <p className="font-semibold font-mono text-sm sm:text-base text-brand-purple break-all">
                        {trackingInfo.awb_code}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">Origin</p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {trackingInfo.origin || "Origin Hub"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">Destination</p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {trackingInfo.destination || trackingInfo.delivered_to || "Destination Hub"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">Expected Delivery</p>
                      <p className="font-semibold text-emerald-600 text-sm sm:text-base flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDisplayDate(trackingInfo.edd || trackingInfo.etd) || "3-5 Business Days"}
                      </p>
                    </div>
                  </div>

                  {/* Last Updated Timestamp */}
                  {trackingInfo.updated_time_stamp && (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={13} className="text-gray-400" />
                      <span>
                        Last Updated:{" "}
                        <strong>
                          {formatDisplayDate(trackingInfo.updated_time_stamp, true) ||
                            trackingInfo.updated_time_stamp}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Tracking Activities Timeline */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Package size={20} className="text-brand-purple" />
                    Tracking History
                  </h3>

                  {trackingInfo.shipment_track_activities &&
                  trackingInfo.shipment_track_activities.length > 0 ? (
                    <div className="space-y-6">
                      {trackingInfo.shipment_track_activities.map(
                        (step, index) => {
                          const isLatest = index === 0;

                          return (
                            <div key={index} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                                    isLatest
                                      ? "bg-brand-purple shadow-md shadow-brand-purple/30"
                                      : "bg-emerald-500"
                                  }`}
                                >
                                  <CheckCircle size={18} />
                                </div>
                                {index <
                                  trackingInfo.shipment_track_activities!.length -
                                    1 && (
                                  <div className="w-0.5 flex-1 bg-gray-200 my-1 min-h-[36px]"></div>
                                )}
                              </div>

                              <div className="pb-3 flex-1">
                                <div className="flex flex-wrap items-baseline gap-2">
                                  <h4
                                    className={`text-sm font-semibold capitalize ${
                                      isLatest
                                        ? "text-brand-purple"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {step.activity ||
                                      step.status ||
                                      step.srStatusLabel ||
                                      "Status Update"}
                                  </h4>
                                  {step.date && (
                                    <span className="text-xs text-gray-400">
                                      {formatDisplayDate(step.date, true) ||
                                        step.date}
                                    </span>
                                  )}
                                </div>

                                {step.location && (
                                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <MapPin size={12} className="text-gray-400" />
                                    {step.location}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center bg-gray-50 rounded-xl border border-gray-100">
                      <Truck
                        size={32}
                        className="mx-auto text-gray-400 mb-2 opacity-60"
                      />
                      <p className="text-sm font-medium text-gray-700">
                        Package manifest created with courier partner.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Tracking events will appear as the courier scans the package at transit hubs.
                      </p>
                    </div>
                  )}
                </div>

                {/* Optional Enriched Order Details (if AWB exists in MongoDB) */}
                {trackingInfo.orderDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trackingInfo.orderDetails.items &&
                      trackingInfo.orderDetails.items.length > 0 && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-base font-bold text-gray-900 mb-4">
                            Items in this Order
                          </h3>
                          <div className="space-y-3">
                            {trackingInfo.orderDetails.items.map(
                              (item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-14 h-14 object-cover rounded-lg border border-gray-100"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-800 text-sm">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      Qty: {item.quantity} × ₹{item.price}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {trackingInfo.orderDetails.address && (
                      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4">
                          Delivery Address
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {trackingInfo.orderDetails.address.name && (
                            <p className="font-semibold text-gray-800">
                              {trackingInfo.orderDetails.address.name}
                            </p>
                          )}
                          <p>
                            {trackingInfo.orderDetails.address.address_line}
                          </p>
                          <p>
                            {trackingInfo.orderDetails.address.city},{" "}
                            {trackingInfo.orderDetails.address.state}{" "}
                            {trackingInfo.orderDetails.address.pincode}
                          </p>
                          <p>
                            {trackingInfo.orderDetails.address.country ||
                              "India"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reset Search Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-3.5 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-center cursor-pointer shadow-sm"
                  >
                    Track Another AWB
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>

        {/* FAQ Section */}
        <section className="bg-brand-gray-lightest border-t border-gray-200 mt-12">
          <Container>
            <div className="py-12">
              <h2 className="text-2xl font-bold text-brand-purple-dark text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <details className="bg-white rounded-xl p-5 border border-gray-100 cursor-pointer group">
                  <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                    Where can I find my AWB code?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-brand-gray mt-3">
                    Your Air Waybill (AWB) tracking number is sent via SMS and email as soon as your package is dispatched. You can also view it in your Orders section.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-5 border border-gray-100 cursor-pointer group">
                  <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                    How long does delivery take?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-brand-gray mt-3">
                    Most orders are delivered within 3-5 business days depending on your delivery location. You can view the live Expected Delivery Date (EDD) above.
                  </p>
                </details>

                <details className="bg-white rounded-xl p-5 border border-gray-100 cursor-pointer group">
                  <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                    What if my AWB tracking shows no checkpoints yet?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-brand-gray mt-3">
                    When an AWB is newly assigned, it may take 2-6 hours for the courier hub to scan the package and update initial movement. Please refresh tracking after a few hours.
                  </p>
                </details>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
