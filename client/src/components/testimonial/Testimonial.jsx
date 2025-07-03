import { assets } from "../../assets/assets";
import Title from "../../shared/TItle";

const testimonials = [
  {
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    image: assets.testimonial_image_1,
    testimonial:
      "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!",
  },
  {
    name: "Liam Johnson",
    location: "New York, USA",
    image: assets.testimonial_image_2,
    testimonial:
      "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!",
  },
  {
    name: "Sophia Lee",
    location: "Seoul, South Korea",
    image: assets.testimonial_image_1,
    testimonial:
      "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results.",
  },
];

const Testimonial = () => {
  return (
    <div className="container mx-auto py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="star icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
