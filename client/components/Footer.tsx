import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-black-dark">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[360px]">
        <div className="max-w-container mx-auto px-[15px]">
          <div className="py-[55px] pb-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {/* Explore Our Store */}
            <div className="px-0 lg:px-[15px] pt-[15px] pb-[14px] flex flex-col gap-5">
              <h6 className="font-poppins text-lg font-normal text-white leading-[27px]">
                Explore Our Store
              </h6>
              <ul className="pl-5 flex flex-col gap-[10px]">
                <li className="font-poppins text-sm font-normal text-white leading-9">
                  Cow Desi Ghee
                </li>
                <li className="font-poppins text-sm font-normal text-white leading-9">
                  Organic Honey
                </li>
                <li className="font-poppins text-sm font-normal text-white leading-9">
                  Dry Fruits (Almonds, Cashews, Dates)
                </li>
                <li className="font-poppins text-sm font-normal text-white leading-9">
                  Dairy (Milk, Curd)
                </li>
              </ul>
            </div>

            {/* Shop */}
            <div className="px-0 lg:px-[15px] pt-[15px] pb-[14px] flex flex-col gap-5">
              <h6 className="font-poppins text-lg font-normal text-white leading-[27px]">
                Shop
              </h6>
              <ul className="flex flex-col">
                <li>
                  <Link
                    to="/about"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    Refund and Returns Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* My Account */}
            <div className="px-0 lg:px-[15px] pt-[15px] pb-[14px] flex flex-col gap-5">
              <h6 className="font-poppins text-lg font-normal text-white leading-[27px]">
                My Account
              </h6>
              <ul className="flex flex-col">
                <li>
                  <Link
                    to="/orders"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    Account details
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lost-password"
                    className="font-poppins text-sm font-normal text-white leading-9 block"
                  >
                    Lost password
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="px-0 lg:px-[15px] pt-[15px] pb-[10px] flex flex-col gap-5">
              <h6 className="font-poppins text-lg font-normal text-white leading-[27px]">
                Newsletter
              </h6>
              <form className="flex flex-col gap-[10px]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="max-h-[50px] py-[13px] px-5 pb-3 border-2 border-brand-gray-lightest bg-brand-gray-lightest rounded-[5px] font-poppins text-sm text-brand-blue-dark"
                />
                <button
                  type="submit"
                  className="w-full max-w-[262.5px] py-[5px] px-5 bg-brand-purple rounded-full text-white font-poppins text-sm leading-7"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#E3E3E3] py-[11px]">
            <p className="text-center font-poppins text-sm font-normal text-white leading-7">
              Copyright © 2025 Desiiglobal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
