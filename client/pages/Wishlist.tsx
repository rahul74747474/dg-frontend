import { X, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function Wishlist() {
  const { items, removeItem, loading } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleRemove = async (productId: string) => {
    try {
      await removeItem(productId);
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.productId,
      name: item.productTitle,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    toast.success("Added to cart");
  };

  const isEmpty = !loading && items.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HEADER */}
        <section className="py-8 border-b">
          <Container>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-sm text-gray-500 mt-1">
              {items.length} item{items.length !== 1 && "s"}
            </p>
          </Container>
        </section>

        {/* EMPTY */}
        {isEmpty ? (
          <section className="py-20 text-center">
            <Container>
              <p className="text-lg mb-4">Your wishlist is empty ❤️</p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple text-white rounded-lg"
              >
                Continue Shopping <ArrowRight size={18} />
              </Link>
            </Container>
          </section>
        ) : (
          /* LIST */
          <section className="py-10">
            <Container>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border p-4 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.productTitle}
                      </h3>
                      <p className="text-brand-purple font-bold">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-brand-purple text-white rounded flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>

                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
