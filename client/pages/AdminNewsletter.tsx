import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  Mail,
  Send,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Search,
  RefreshCw,
  Eye,
  AlertTriangle,
  ArrowLeft,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import { toast } from "sonner";

export default function AdminNewsletter() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [stats, setStats] = useState<{
    total: number;
    active: number;
    unsubscribed: number;
  }>({ total: 0, active: 0, unsubscribed: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // Subscribers List State
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [subscribersLoading, setSubscribersLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Campaign Composer State
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<any>(null);

  // Fetch Stats
  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const res = await api.get("/newsletter/stats");
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load newsletter stats");
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch Subscribers
  const fetchSubscribers = async () => {
    try {
      setSubscribersLoading(true);
      const res = await api.get("/newsletter/subscribers", {
        params: {
          page,
          limit: 15,
          search: searchQuery || undefined,
          status: statusFilter || undefined,
        },
      });
      if (res.data.success) {
        setSubscribers(res.data.subscribers || []);
        setTotalPages(res.data.pagination?.totalPages || 1);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch subscribers");
    } finally {
      setSubscribersLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "ADMIN")) {
      toast.error("Admin access required");
      navigate("/account");
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated && user?.role === "ADMIN") {
      fetchStats();
      fetchSubscribers();
    }
  }, [isAuthenticated, user, page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSubscribers();
  };

  // Send Test Email
  const handleSendTest = async () => {
    if (!subject.trim() || !content.trim()) {
      toast.error("Please enter both a Subject and Content before sending a test.");
      return;
    }

    try {
      setIsSendingTest(true);
      const res = await api.post("/newsletter/test", {
        subject,
        title,
        content,
        testEmail: testEmail.trim() || undefined,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Test email sent successfully!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send test email");
    } finally {
      setIsSendingTest(false);
    }
  };

  // Broadcast to all active subscribers
  const handleBroadcast = async () => {
    setShowConfirmModal(false);

    if (!subject.trim() || !content.trim()) {
      toast.error("Subject and Content cannot be empty");
      return;
    }

    try {
      setIsBroadcasting(true);
      setBroadcastResult(null);

      const res = await api.post("/newsletter/broadcast", {
        subject,
        title,
        content,
      });

      if (res.data.success) {
        setBroadcastResult(res.data);
        toast.success(
          `Broadcast completed! Sent to ${res.data.sent} active subscribers.`
        );
        fetchStats();
        // Clear inputs on success
        setSubject("");
        setTitle("");
        setContent("");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Broadcast execution failed");
    } finally {
      setIsBroadcasting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <Container>
          <div className="space-y-8">
            {/* Header & Back Link */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <Link
                  to="/account"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-purple mb-2"
                >
                  <ArrowLeft size={14} /> Back to My Account
                </Link>
                <h1 className="text-3xl font-black text-brand-purple-dark">
                  Newsletter Broadcast & Subscribers
                </h1>
                <p className="text-sm text-gray-600">
                  Compose campaigns, manage subscribers, and broadcast updates to your community.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    fetchStats();
                    fetchSubscribers();
                    toast.success("Refreshed data");
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2 shadow-xs"
                >
                  <RefreshCw size={14} /> Refresh
                </button>
              </div>
            </div>

            {/* ================= METRIC STATS CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold">
                  <Users size={26} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Active Subscribers
                  </p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">
                    {statsLoading ? "..." : stats.active}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                  <Mail size={26} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Total All-Time
                  </p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">
                    {statsLoading ? "..." : stats.total}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <AlertCircle size={26} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Unsubscribed
                  </p>
                  <p className="text-2xl font-black text-gray-900 mt-0.5">
                    {statsLoading ? "..." : stats.unsubscribed}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= BROADCAST COMPOSER ================= */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Compose Broadcast Campaign
                  </h3>
                  <p className="text-xs text-gray-500">
                    This message will be dispatched individually to all {stats.active} active subscribers with private 1-click unsubscribe links.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  disabled={!subject && !content}
                  className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 inline-flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <Eye size={14} /> Preview Email
                </button>
              </div>

              {broadcastResult && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-sm text-green-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={18} className="text-brand-green" /> Broadcast Report:
                  </p>
                  <p className="text-xs text-green-800">
                    Total: {broadcastResult.totalSubscribers} | Sent: {broadcastResult.sent} | Failed: {broadcastResult.failed}
                  </p>
                  {broadcastResult.failed > 0 && (
                    <p className="text-xs text-red-600 font-semibold">
                      Failed addresses: {broadcastResult.failedEmails?.map((f: any) => f.email).join(", ")}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Subject Line <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Flavor Drop: Peri Peri Makhana is Here! 🌶️"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Banner Title (Optional Heading)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Savor Our Newest Batch of Roasted Crunchies"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Message Content (HTML or Plain Text) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={7}
                    required
                    placeholder="Enter your announcement copy here. Separate paragraphs with blank lines. HTML tags like <p>, <strong>, <ul>, <li> are supported."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
                  />
                </div>

                {/* Test Send Row */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="w-full sm:max-w-md">
                    <input
                      type="email"
                      placeholder={`Test recipient (defaults to ${user?.email || "your email"})`}
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendTest}
                    disabled={isSendingTest || !subject || !content}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    {isSendingTest ? "Sending Test..." : "Send Test Preview"}
                  </button>
                </div>

                {/* Send Broadcast Trigger Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    disabled={isBroadcasting || !subject || !content || stats.active === 0}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-brand-purple/20 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {isBroadcasting
                      ? "Broadcasting Campaign..."
                      : `Broadcast to ${stats.active} Active Subscribers`}
                  </button>
                </div>
              </div>
            </div>

            {/* ================= SUBSCRIBERS DIRECTORY ================= */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Subscriber Directory
                  </h3>
                  <p className="text-xs text-gray-500">
                    Live database list of customers subscribed to updates.
                  </p>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                  >
                    <option value="">All Statuses</option>
                    <option value="SUBSCRIBED">Subscribed Only</option>
                    <option value="UNSUBSCRIBED">Unsubscribed Only</option>
                  </select>

                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Search email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs w-48 focus:outline-none focus:ring-1 focus:ring-brand-purple"
                    />
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </form>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3 px-2">Subscriber Email</th>
                      <th className="pb-3 px-2">Status</th>
                      <th className="pb-3 px-2">Subscribed Date</th>
                      <th className="pb-3 px-2">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {subscribersLoading ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-400 text-xs">
                          Loading subscriber records...
                        </td>
                      </tr>
                    ) : subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-400 text-xs">
                          No subscribers match this criteria.
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((sub) => (
                        <tr key={sub._id} className="hover:bg-gray-50/50">
                          <td className="py-3.5 px-2 font-medium text-gray-900 text-xs md:text-sm">
                            {sub.email}
                          </td>
                          <td className="py-3.5 px-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                sub.status === "SUBSCRIBED"
                                  ? "bg-green-50 text-brand-green"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-xs text-gray-500">
                            {sub.subscribedAt
                              ? new Date(sub.subscribedAt).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "-"}
                          </td>
                          <td className="py-3.5 px-2 text-xs text-gray-400 capitalize">
                            {sub.source || "Website"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 bg-gray-100 rounded-lg font-bold disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1.5 bg-gray-100 rounded-lg font-bold disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      {/* ================= CONFIRMATION MODAL ================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mx-auto font-bold">
              <Send size={28} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">
                Confirm Newsletter Broadcast
              </h3>
              <p className="text-sm text-gray-600">
                You are about to broadcast this newsletter to{" "}
                <strong className="text-brand-purple">{stats.active} active subscribers</strong>.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl text-left text-xs text-gray-700 space-y-1">
              <p>
                <strong>Subject:</strong> {subject}
              </p>
              {title && (
                <p>
                  <strong>Title:</strong> {title}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBroadcast}
                className="flex-1 py-3 bg-brand-purple text-white font-bold rounded-xl text-xs hover:bg-brand-purple-dark shadow-md"
              >
                Yes, Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-gray-900">
              Email Template Preview
            </h3>

            {/* Simulated Email Frame */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-gradient-to-r from-brand-purple-dark to-brand-purple p-6 text-center text-white">
                <h2 className="text-2xl font-black">DesiiGlobal</h2>
                <p className="text-xs font-semibold text-brand-green-lighter uppercase tracking-wider mt-1">
                  Pure • Healthy • Roasted
                </p>
              </div>

              <div className="p-6 bg-white space-y-4">
                {title && (
                  <h3 className="text-xl font-bold text-brand-purple-dark">
                    {title}
                  </h3>
                )}
                <div
                  className="text-sm text-gray-700 leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{
                    __html:
                      content.includes("<p>") || content.includes("<div>")
                        ? content
                        : content
                            .split("\n\n")
                            .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
                            .join(""),
                  }}
                />

                <div className="pt-4 text-center">
                  <span className="inline-block px-6 py-2.5 bg-brand-purple text-white font-bold text-xs rounded-full shadow-sm">
                    Explore Our Snacks →
                  </span>
                </div>
              </div>

              <div className="bg-[#0E0819] p-4 text-center text-[11px] text-gray-400">
                <p>DesiiGlobal Snacks Private Limited • New Delhi, India</p>
                <p className="mt-1 text-gray-500">
                  [Unsubscribe link will appear here for each subscriber]
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2 bg-gray-100 font-bold text-xs rounded-xl hover:bg-gray-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
