import { useState, useEffect } from "react";
import { Camera, LogOut, User, Package, Settings, Edit2, AlertCircle, Eye, EyeOff, Check } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

export default function Account() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedAddress, setSelectedAddress] = useState(null);

const [editForm, setEditForm] = useState({
  mobile: "",
  address_line: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
});

  // Tabs
  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "settings" | "addresses"
  >("profile");

  // Avatar state
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Profile form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Password form state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUserData(res.data.user);
    } catch (err) {
      setUserData(null);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/address");
      setAddresses(res.data.addresses || []);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "addresses") {
      fetchAddresses();
    }
  }, [activeTab]);

  // Update form when user changes
  useEffect(() => {
    if (userData) {
      setProfileForm({
        name: userData.name || "",
        mobile: userData.mobile || "",
      });
    }
  }, [userData]);

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Container>
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
              <p className="mt-4 text-brand-gray-light">Loading account...</p>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  const handleDelete = async (id) => {
    try {
      await api.delete(`/address/${id}`);
      toast.success("Address deleted");
      fetchAddresses();
    } catch {
      toast.error("Delete failed");
    }
  };
  const handleDefault = async (id) => {
    try {
      await api.put(`/address/default/${id}`);
      toast.success("Default address updated");
      fetchAddresses();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleEdit = (addr) => {
  setSelectedAddress(addr);

  setEditForm({
    country: addr.country || "",
    mobile: addr.mobile || "",
    address_line: addr.address_line || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.pincode || "",
  });

  setIsEditOpen(true);
};

const handleUpdateAddress = async () => {
  try {
    await api.put(`/address/${selectedAddress._id}`, editForm);
    toast.success("Address updated");
    setIsEditOpen(false);
    fetchAddresses();
  } catch {
    toast.error("Update failed");
  }
};
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setAvatarUploading(true); // 🔥 START loading

      const formData = new FormData();
      formData.append("avatar", file);

      await api.put("/auth/avatar", formData);
      await fetchUser();

      toast.success("Avatar updated!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setAvatarUploading(false); // 🔥 STOP loading
    }
  };

  const handleSaveProfile = async () => {
    setProfileError("");

    // Validation
    const name = profileForm.name.trim();

    // required
    if (!name) {
      setProfileError("Name is required");
      return;
    }

    // only letters + spaces
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setProfileError("Name can only contain letters");
      return;
    }

    // minimum length
    if (name.length < 3) {
      setProfileError("Name must be at least 3 characters");
      return;
    }
    const mobile = profileForm.mobile.trim();

    // required check
    if (!mobile) {
      setProfileError("Mobile is required");
      return;
    }

    // only digits check
    if (!/^\d+$/.test(mobile)) {
      setProfileError("Mobile must contain only numbers");
      return;
    }

    // length check
    if (mobile.length !== 10) {
      setProfileError("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      setIsSavingProfile(true);

      await api.put("/auth/profile", {
        name: profileForm.name,
        mobile: profileForm.mobile,
      });

      await fetchUser(); // 🔥 fresh DB data
      setIsEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to update profile";
      setProfileError(message);
      toast.error(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError("");

    // Validation
    if (!passwordForm.currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setIsSavingPassword(true);

      await api.patch("/auth/change-password", {
      oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
      toast.success("Password changed successfully!");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to change password";
      setPasswordError(message);
      toast.error(message);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch { }
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-brand-gray-border p-4 sticky top-20">
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "profile"
                        ? "bg-brand-purple text-white"
                        : "hover:bg-brand-gray-lightest text-brand-gray-dark"
                        }`}
                    >
                      <User size={20} />
                      <span className="font-semibold">Profile</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "orders"
                        ? "bg-brand-purple text-white"
                        : "hover:bg-brand-gray-lightest text-brand-gray-dark"
                        }`}
                    >
                      <Package size={20} />
                      <span className="font-semibold">Orders</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("addresses")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === "addresses"
                        ? "bg-brand-purple text-white"
                        : "hover:bg-brand-gray-lightest"
                        }`}
                    >
                      <User size={20} />
                      <span className="font-semibold">My Addresses</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "settings"
                        ? "bg-brand-purple text-white"
                        : "hover:bg-brand-gray-lightest text-brand-gray-dark"
                        }`}
                    >
                      <Settings size={20} />
                      <span className="font-semibold">Change Password</span>
                    </button>
                  </nav>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full mt-6 pt-4 border-t border-brand-gray-border flex items-center gap-2 text-brand-red hover:text-red-700 font-semibold transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="bg-white rounded-lg border border-brand-gray-border p-8 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-brand-gray-dark mb-6">
                        Profile Information
                      </h2>

                      {/* Avatar Section */}
                      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-brand-gray-border">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-gray-border flex-shrink-0">
                          {userData.avatar?.url ? (
                            <img
                              src={userData.avatar.url}
                              alt={userData.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-brand-purple text-white flex items-center justify-center text-2xl font-bold">
                              {userData.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          )}

                          <label className="absolute bottom-0 right-0 bg-brand-purple text-white p-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity">
                            <Camera size={16} />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                              disabled={avatarUploading}
                            />
                          </label>
                        </div>

                        <div>
                          <p className="font-semibold text-brand-gray-dark text-lg">{userData.name}</p>
                          <p className="text-sm text-brand-gray-light">{userData.email}</p>
                          {userData?.isEmailVerified !== true && (
                            <span>Email not verified</span>
                          )}
                          {userData?.mobile || "Not provided"}
                          {avatarUploading && (
                            <p className="text-xs text-brand-gray-light mt-2">Uploading...</p>
                          )}
                        </div>
                      </div>

                      {/* Profile Form */}
                      {!isEditingProfile ? (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-brand-gray-light mb-1">Full Name</p>
                            <p className="text-lg font-semibold text-brand-gray-dark">{profileForm.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray-light mb-1">Email</p>
                            <p className="text-lg font-semibold text-brand-gray-dark">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-brand-gray-light mb-1">Mobile</p>
                            <p className="text-lg font-semibold text-brand-gray-dark">
                              {profileForm.mobile || "Not provided"}
                            </p>
                          </div>

                          <button
                            onClick={() => setIsEditingProfile(true)}
                            className="mt-6 px-6 py-2 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                          >
                            <Edit2 size={18} />
                            Edit Profile
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {profileError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-red-700">{profileError}</p>
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={profileForm.name}
                              onChange={(e) => {
                                setProfileForm({ ...profileForm, name: e.target.value });
                                setProfileError("");
                              }}
                              className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
                              Mobile *
                            </label>
                            <input
                              type="tel"
                              value={profileForm.mobile}
                              onChange={(e) => {
                                setProfileForm({ ...profileForm, mobile: e.target.value });
                                setProfileError("");
                              }}
                              className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleSaveProfile}
                              disabled={isSavingProfile}
                              className="px-6 py-2 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center gap-2"
                            >
                              {isSavingProfile ? "Saving..." : "Save Changes"}
                              {!isSavingProfile && <Check size={18} />}
                            </button>
                            <button
                              onClick={() => {
                                setIsEditingProfile(false);
                                setProfileError("");
                                setProfileForm({
                                  name: user.name,
                                  mobile: user.mobile || "",
                                });
                              }}
                              className="px-6 py-2 border border-brand-gray-border text-brand-gray-dark font-semibold rounded-lg hover:bg-brand-gray-lightest transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div className="bg-white rounded-lg border border-brand-gray-border p-8">
                    <h2 className="text-2xl font-bold text-brand-gray-dark mb-6">
                      My Orders
                    </h2>

                    {ordersLoading ? (
                      <p>Loading orders...</p>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package size={48} className="mx-auto text-brand-gray-light mb-4" />
                        <p className="text-brand-gray-light mb-6">
                          You haven't placed any orders yet.
                        </p>
                        <button
                          onClick={() => navigate("/shop")}
                          className="px-6 py-2 bg-brand-purple text-white font-semibold rounded-lg"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            className="border border-brand-gray-border rounded-lg p-6"
                          >
                            {/* Header */}
                            <div className="flex justify-between mb-4">
                              <div>
                                <p className="font-semibold">
                                  Order ID: {order.orderNumber}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>

                              <span className="px-3 py-1 text-sm rounded bg-green-100 text-green-700">
                                {order.orderStatus}
                              </span>
                            </div>

                            {/* Items */}
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item._id} className="flex gap-4 items-center">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />

                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>

                                  <p className="font-semibold">₹{item.total}</p>
                                </div>
                              ))}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between mt-4 pt-4 border-t">
                              <p className="text-sm text-gray-500">
                                Payment: {order.payment.method}
                              </p>
                              <p className="font-bold text-lg">
                                ₹{order.pricing.grandTotal}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "addresses" && (
  <div className="bg-white rounded-xl border border-brand-gray-border p-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-brand-gray-dark">
        My Addresses
      </h2>

      {/* future: add address button */}
      <button className="px-4 py-2 bg-brand-purple text-white rounded-lg text-sm">
        + Add New
      </button>
    </div>

    {addressLoading ? (
      <div className="text-center py-10 text-gray-500">
        Loading addresses...
      </div>
    ) : addresses.length === 0 ? (
      <div className="text-center py-10 text-gray-500">
        No addresses saved yet.
      </div>
    ) : (
      <div className="grid md:grid-cols-2 gap-5">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className={`border rounded-xl p-5 transition hover:shadow-md ${
              addr.isDefault
                ? "border-brand-purple bg-purple-50"
                : "border-brand-gray-border"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-lg">
                  {addr.name}
                </p>
                <p className="text-sm text-gray-500">
                  {addr.mobile}
                </p>
              </div>

              {addr.isDefault && (
                <span className="text-xs bg-brand-purple text-white px-2 py-1 rounded">
                  Default
                </span>
              )}
            </div>

            {/* Address */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {addr.address_line}, {addr.city}, {addr.state}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {addr.pincode}, {addr.country}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-3 border-t">
              <button
                onClick={() => handleEdit(addr)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(addr._id)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>

              {!addr.isDefault && (
                <button
                  onClick={() => handleDefault(addr._id)}
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  Make Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
{isEditOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold">Edit Address</h2>

      <input
        type="text"
        placeholder="Country"
        value={editForm.country}
        onChange={(e) =>
          setEditForm({ ...editForm, country: e.target.value })
        }
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Mobile"
        value={editForm.mobile}
        onChange={(e) =>
          setEditForm({ ...editForm, mobile: e.target.value })
        }
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Address"
        value={editForm.address_line}
        onChange={(e) =>
          setEditForm({ ...editForm, address_line: e.target.value })
        }
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="City"
        value={editForm.city}
        onChange={(e) =>
          setEditForm({ ...editForm, city: e.target.value })
        }
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="State"
        value={editForm.state}
        onChange={(e) =>
          setEditForm({ ...editForm, state: e.target.value })
        }
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Pincode"
        value={editForm.pincode}
        onChange={(e) =>
          setEditForm({ ...editForm, pincode: e.target.value })
        }
        className="w-full border px-3 py-2 rounded"
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setIsEditOpen(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateAddress}
          className="px-4 py-2 bg-brand-purple text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="bg-white rounded-lg border border-brand-gray-border p-8 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-brand-gray-dark mb-6">Security Settings</h2>

                      {!isChangingPassword ? (
                        <div>
                          <p className="text-brand-gray-light mb-6">
                            Keep your account secure by changing your password regularly.
                          </p>
                          <button
                            onClick={() => setIsChangingPassword(true)}
                            className="px-6 py-2 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                          >
                            Change Password
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {passwordError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-red-700">{passwordError}</p>
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
                              Current Password *
                            </label>
                            <div className="relative">
                              <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={passwordForm.currentPassword}
                                onChange={(e) => {
                                  setPasswordForm({
                                    ...passwordForm,
                                    currentPassword: e.target.value,
                                  });
                                  setPasswordError("");
                                }}
                                className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-light"
                              >
                                {showCurrentPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
                              New Password *
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordForm.newPassword}
                                onChange={(e) => {
                                  setPasswordForm({
                                    ...passwordForm,
                                    newPassword: e.target.value,
                                  });
                                  setPasswordError("");
                                }}
                                placeholder="Min. 6 characters"
                                className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-light"
                              >
                                {showNewPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-brand-gray-dark mb-2">
                              Confirm New Password *
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwordForm.confirmPassword}
                                onChange={(e) => {
                                  setPasswordForm({
                                    ...passwordForm,
                                    confirmPassword: e.target.value,
                                  });
                                  setPasswordError("");
                                }}
                                placeholder="Re-enter password"
                                className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-light"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleChangePassword}
                              disabled={isSavingPassword}
                              className="px-6 py-2 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center gap-2"
                            >
                              {isSavingPassword ? "Updating..." : "Update Password"}
                              {!isSavingPassword && <Check size={18} />}
                            </button>
                            <button
                              onClick={() => {
                                setIsChangingPassword(false);
                                setPasswordError("");
                                setPasswordForm({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                              }}
                              className="px-6 py-2 border border-brand-gray-border text-brand-gray-dark font-semibold rounded-lg hover:bg-brand-gray-lightest transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
