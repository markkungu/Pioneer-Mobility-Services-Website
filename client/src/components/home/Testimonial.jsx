import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    review: "Fantastic service! The drivers are always on time, and the vehicles are very comfortable. Highly recommend!",
    location: "Seattle, WA",
  },
  {
    name: "James Anderson",
    review: "Great experience. The wheelchair accessibility made my travel so much easier. Very professional team!",
    location: "Tacoma, WA",
  },
  {
    name: "Emily Roberts",
    review: "I feel safe every time I book a ride. The GPS tracking gives me peace of mind. 10/10 service!",
    location: "Bellevue, WA",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#188754] mb-6">Customer Feedback</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="w-full md:w-3/4 lg:w-1/2 mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className=" p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 italic">"{testimonial.review}"</p>
              <h3 className="mt-4 text-xl font-semibold text-[#188754]">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.location}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
