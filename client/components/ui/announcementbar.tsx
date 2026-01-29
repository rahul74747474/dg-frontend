export default function AnnouncementBar() {
  return (
    <div className="w-full bg-green-700 text-white overflow-hidden">
      <div className="relative flex">
        <div className="animate-marquee whitespace-nowrap py-2 text-sm font-medium">
          <span className="mx-8">
            🚚 Free Shipping on Orders Above ₹499
          </span>
          <span className="mx-8">
            🌱 100% Natural & Gluten-Free Foxnuts
          </span>
          <span className="mx-8">
            🔥 Flat 30% OFF – Limited Time Offer
          </span>
        </div>

        {/* duplicate for seamless loop */}
        <div className="animate-marquee whitespace-nowrap py-2 text-sm font-medium">
          <span className="mx-8">
            🚚 Free Shipping on Orders Above ₹499
          </span>
          <span className="mx-8">
            🌱 100% Natural & Gluten-Free Foxnuts
          </span>
          <span className="mx-8">
            🔥 Flat 30% OFF – Limited Time Offer
          </span>
        </div>
      </div>
    </div>
  );
}
