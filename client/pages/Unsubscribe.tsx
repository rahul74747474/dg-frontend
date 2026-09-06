import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, Send } from "lucide-react";
import api from "@/api/axios";
import { toast } from "sonner";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "link-sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleTokenUnsubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!tokenFromUrl) {
      toast.error("An unsubscribe token is required.");
      return;
    }

    try {
      setStatus("loading");
      const res = await api.post("/newsletter/unsubscribe", {
        token: tokenFromUrl,
      });

      if (res.data.success) {
        setStatus("success");
        setMessage(
          res.data.message ||
            "You have been successfully unsubscribed from DesiiGlobal promotional emails."
        );
        toast.success("Unsubscribed successfully");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          "Failed to process unsubscribe request. Please verify the link from your email."
      );
      toast.error(err?.response?.data?.message || "Unsubscribe failed");
    }
  };

  const handleRequestLink = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email format");
      return;
    }

    try {
      setStatus("loading");
      const res = await api.post("/newsletter/request-unsubscribe-link", {
        email: cleanEmail,
      });

      if (res.data.success) {
        setStatus("link-sent");
        setMessage(
          res.data.message ||
            "If your email is subscribed, a secure unsubscribe link has been sent to your inbox."
        );
        toast.success("Link sent to inbox");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.response?.data?.message || "Failed to send unsubscribe link.");
      toast.error(err?.response?.data?.message || "Request failed");
    }
  };

  const handleResubscribe = async () => {
    if (!email) return;
    try {
      setStatus("loading");
      const res = await api.post("/newsletter/subscribe", { email: email.trim() });
      if (res.data.success) {
        setStatus("idle");
        toast.success("Welcome back! You have re-subscribed to DesiiGlobal updates.");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resubscribe");
      setStatus("success");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <Container>
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-brand-purple/5 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-peach-bg text-brand-purple flex items-center justify-center mx-auto">
              <Mail size={32} />
            </div>

            {/* STATE: SUCCESS (Unsubscribed) */}
            {status === "success" && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-brand-green rounded-full text-xs font-bold uppercase">
                  <CheckCircle2 size={14} /> Unsubscribed
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  We're sorry to see you go!
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {message}
                </p>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <p className="text-xs text-gray-500">
                    Unsubscribed by mistake?
                  </p>
                  <button
                    onClick={handleResubscribe}
                    className="px-5 py-2.5 bg-brand-purple/10 text-brand-purple hover:bg-brand-purple hover:text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Re-subscribe to Newsletter
                  </button>
                </div>

                <div className="pt-2">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                  >
                    <ArrowLeft size={14} /> Return to Store
                  </Link>
                </div>
              </div>
            )}

            {/* STATE: LINK SENT */}
            {status === "link-sent" && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-brand-blue rounded-full text-xs font-bold uppercase">
                  <ShieldCheck size={14} /> Check Your Inbox
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  Unsubscribe Link Dispatched
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {message}
                </p>
                <p className="text-xs text-gray-400">
                  For your privacy and security, we only allow unsubscriptions through a verified link sent directly to your registered email.
                </p>

                <div className="pt-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:underline"
                  >
                    <ArrowLeft size={14} /> Return to Home
                  </Link>
                </div>
              </div>
            )}

            {/* STATE: IDLE / ERROR WITH TOKEN */}
            {(status === "idle" || status === "loading" || status === "error") && tokenFromUrl && (
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-black text-brand-purple-dark">
                  Newsletter Unsubscribe
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Click the button below to confirm that you wish to stop receiving marketing emails from DesiiGlobal.
                </p>

                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 text-left">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{message}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => handleTokenUnsubscribe()}
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-md disabled:opacity-60"
                  >
                    {status === "loading" ? "Processing..." : "Confirm Unsubscribe"}
                  </button>
                </div>

                <p className="text-[11px] text-gray-400">
                  Note: Transactional emails regarding placed orders and account security will still be delivered.
                </p>
              </div>
            )}

            {/* STATE: IDLE / ERROR WITHOUT TOKEN (Request Link Form) */}
            {(status === "idle" || status === "loading" || status === "error") && !tokenFromUrl && (
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-black text-brand-purple-dark">
                  Manage Email Subscription
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enter your email address below. We'll send you a secure 1-click unsubscribe link to verify your inbox.
                </p>

                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 text-left">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{message}</span>
                  </div>
                )}

                <form onSubmit={handleRequestLink} className="space-y-4 pt-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-xl text-sm transition-all shadow-md disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    {status === "loading" ? "Sending Link..." : "Send Secure Unsubscribe Link"}
                  </button>
                </form>

                <p className="text-[11px] text-gray-400">
                  To prevent unauthorized unsubscriptions, we verify ownership via your inbox.
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
