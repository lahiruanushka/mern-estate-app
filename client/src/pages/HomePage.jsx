import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { HiArrowRight, HiTag } from "react-icons/hi";
import { BsFillHouseFill, BsHouseCheckFill } from "react-icons/bs";
import ListingItem from "../components/ListingItem";
import { listingService } from "../services/listingService";

export default function HomePage() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation, Autoplay, EffectFade]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const data = await listingService.getAllListings("offer=true&limit=4");
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const data = await listingService.getAllListings("type=rent&limit=4");
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const data = await listingService.getAllListings("type=sale&limit=4");
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 py-16 sm:py-24">
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Find your next{" "}
              <span className="text-blue-600 dark:text-blue-400">perfect</span>
              <br />
              place with ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover your dream home with our extensive collection of
              properties. Whether you&apos;re looking to buy, rent, or explore
              special offers, we&apos;ve got you covered.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/search"
                className="group rounded-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 flex items-center gap-2"
              >
                Get Started
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Slider */}
      {offerListings && offerListings.length > 0 && (
        <div className="mt-8 ml-4 mr-4">
          <Swiper
            navigation
            effect="fade"
            autoplay={{ delay: 3000 }}
            className="h-[600px]"
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-full relative"
                >
                  <div className="absolute inset-0 bg-black/30">
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-2xl font-bold">{listing.name}</h3>
                      <p className="text-lg">
                        ${listing.regularPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Listings Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Offers Section */}
        {offerListings && offerListings.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <HiTag className="text-2xl text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Special Offers
                </h2>
              </div>
              <Link
                to="/search?offer=true"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View all <HiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* Rent Section */}
        {rentListings && rentListings.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BsFillHouseFill className="text-2xl text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Properties for Rent
                </h2>
              </div>
              <Link
                to="/search?type=rent"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View all <HiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* Sale Section */}
        {saleListings && saleListings.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BsHouseCheckFill className="text-2xl text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Properties for Sale
                </h2>
              </div>
              <Link
                to="/search?type=sale"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View all <HiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
