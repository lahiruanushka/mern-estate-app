import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listingService } from "../services/listingService";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusMessage from "../components/StatusMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";

function ListingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);

  const params = useParams();
  const listingId = params.listingId;

  useEffect(() => {
    async function fetchSingleListing() {
      try {
        setIsLoading(true);
        const data = await listingService.getSingleListing(listingId);
        setListing(data);
      } catch (error) {
        console.error("Listing fetching error:", error);
        setError("Failed to fetch the listing. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleListing();
  }, [listingId]);

  if (isLoading) {
    return <LoadingSpinner size="16" color="blue-600" />;
  }

  return (
    <main>
      {error && <StatusMessage type="error" message={error} />}

      {listing && !isLoading && !error && (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <img
                  src={url}
                  alt="Listing"
                  className="w-full h-[550px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}

export default ListingPage;
