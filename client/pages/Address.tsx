import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Plus, Trash2, Check, Pencil } from "lucide-react";
import EditAddressModal from "@/components/EditAddressModal";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

interface Address {
  _id: string;
  mobile: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressPage() {
  const { user, loading } = useAuth();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [fetching, setFetching] = useState(true);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    mobile: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    if (!user) return;

    api
      .get("/address")
      .then((res) => {
        setAddresses(res.data.addresses || []);
      })
      .finally(() => setFetching(false));
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const handleAddAddress = async () => {
    if (
      !form.mobile ||
      !form.address_line ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await api.post("/address", {
        mobile: form.mobile,
        address_line: form.address_line,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        country: "India",
      });

      setAddresses((prev) => [res.data.address, ...prev]);
      setAdding(false);

      setForm({
        mobile: "",
        address_line: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
    } catch (err: any) {
      console.error("Add address failed", err.response?.data);
      alert(err.response?.data?.message || "Failed to add address");
    }
  };


  const setDefault = async (id: string) => {
    await api.put(`/address/default/${id}`);

    setAddresses((prev) =>
      prev.map((addr) =>
        addr._id === id
          ? { ...addr, isDefault: true }
          : { ...addr, isDefault: false }
      )
    );
  };


  const removeAddress = async (id: string) => {
    await api.delete(`/address/${id}`);
    setAddresses((prev) => prev.filter((a) => a._id !== id));
  };
  if (!Array.isArray(addresses)) {
    return null; // or loader
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* TITLE */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-brand-purple-dark">
                  My Addresses
                </h1>
                <p className="text-sm text-brand-gray-light">
                  Manage your delivery addresses
                </p>
              </div>

              <button
                onClick={() => setAdding((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-lg text-sm font-semibold"
              >
                <Plus size={16} />
                Add Address
              </button>
            </div>

            {/* ADD FORM */}
            {adding && (
              <div className="bg-white p-5 rounded-lg border space-y-3">
                <input
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="Address Line"
                  value={form.address_line}
                  onChange={(e) => setForm({ ...form, address_line: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="input"
                />
                <input
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="input"
                />

                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-brand-purple text-white rounded font-semibold text-sm"
                >
                  Save Address
                </button>
              </div>
            )}


            {/* EMPTY */}
            {!fetching && (!addresses || addresses.length === 0) && (
              <div className="bg-white p-8 rounded-lg border text-center text-gray-600">
                No addresses added yet.
              </div>
            )}

            {/* LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="bg-white border rounded-lg p-5 space-y-3 relative"
                >
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      Default
                    </span>
                  )}

                  <p className="text-sm text-gray-600">{addr.mobile}</p>
                  <p className="text-sm text-gray-700">
                    {addr.address_line}, {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </p>

                  <div className="flex gap-3 pt-2">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefault(addr._id)}
                        className="flex items-center gap-1 text-sm text-green-600"
                      >
                        <Check size={14} />
                        Set Default
                      </button>
                    )}

                    <button
                      onClick={() => setEditingAddress(addr)}
                      className="flex items-center gap-1 text-sm text-blue-600"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => removeAddress(addr._id)}
                      className="flex items-center gap-1 text-sm text-red-600"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </Container>
        {editingAddress && (
  <EditAddressModal
    address={editingAddress}
    onClose={() => setEditingAddress(null)}
    onUpdated={(updated) =>
      setAddresses((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      )
    }
  />
)}

      </main>

      <Footer />
    </div>
  );
}
