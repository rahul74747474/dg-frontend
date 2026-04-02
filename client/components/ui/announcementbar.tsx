export default function AnnouncementBar() {
  return (
    <div className="w-full bg-green-700 text-white overflow-hidden group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        
        {/* First Set */}
        <div className="whitespace-nowrap py-2 text-sm font-medium">
          <span className="mx-8">🚚 Free Shipping on Orders Above ₹499</span>
          <span className="mx-8">🌱 100% Natural & Gluten-Free Foxnuts</span>
          <span className="mx-8">🔥 Flat 30% OFF – Limited Time Offer</span>
        </div>

        {/* Duplicate */}
        <div className="whitespace-nowrap py-2 text-sm font-medium">
          <span className="mx-8">🚚 Free Shipping on Orders Above ₹499</span>
          <span className="mx-8">🌱 100% Natural & Gluten-Free Foxnuts</span>
          <span className="mx-8">🔥 Flat 30% OFF – Limited Time Offer</span>
        </div>

      </div>
    </div>
  );
}