import { useState } from "react";
import { X } from "lucide-react";
import api from "@/api/axios";

interface Address {
  _id: string;
  mobile?: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

interface Props {
  address: Address;
  onClose: () => void;
  onUpdated: (address: Address) => void;
}

export default function EditAddressModal({
  address,
  onClose,
  onUpdated,
}: Props) {
  const [form, setForm] = useState({
    address_line: address.address_line,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    country: address.country || "India",
    mobile: address.mobile || "",
  });

  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const res = await api.put(`/address/${address._id}`, form);
      onUpdated(res.data.address);
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update address");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Address</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            className="input"
            placeholder="Address Line"
            value={form.address_line}
            onChange={(e) =>
              setForm({ ...form, address_line: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            className="input"
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
          <input
            className="input"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />
          <input
            className="input"
            placeholder="Mobile (optional)"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="px-4 py-2 text-sm bg-brand-purple text-white rounded-lg"
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
