import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";



interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  slug: string;
  countInStock:number
}

export default function ProductCard({
  id,
  title,
  image,
  price,
  slug,
  countInStock
}: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleItem, isInWishlist } = useWishlist();
  const wished = isInWishlist(id);

  return (
    <div className="group bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 hover:-translate-y-1">
    <div className="rounded-2xl overflow-hidden bg-gray-50 relative mb-4">
      <Link to={`/product/${slug}`}>
           <img
            src={image}
            alt={title}
            className="w-full aspect-square rounded-[10px] object-cover"
          />
        </Link> 
         </div>
           <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            try {
              await toggleItem({
                productId: id,
                productTitle: title,
                image,
                price,
              });
            } catch (err: any) {
              if (err.message === "NOT_AUTHENTICATED") {
                navigate("/login");
              }
            }
          }}
        >   <Heart
            className={`w-5 h-5 ${wished
                ? "fill-brand-green text-brand-green"
                : "text-brand-green"
              }`}
          />
        </button>
   
    <div className="px-2 pb-2">
      <h3 className="font-bold text-gray-900 truncate mb-1">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-brand-purple">₹{price}</span>
        <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-lg">{countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
      </div>
    </div>
  </div>

  
  );
}
