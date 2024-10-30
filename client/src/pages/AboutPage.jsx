import React from "react";
import { Building2, Users2, Target, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Expert Real Estate Services",
      description:
        "Specializing in buying, selling, and renting properties in the most desirable neighborhoods.",
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Experienced Team",
      description:
        "Our team of experienced agents provides exceptional service and expert guidance.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Client-Focused Approach",
      description:
        "Dedicated to helping clients achieve their real estate goals with personalized service.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Leadership",
      description:
        "A leading real estate agency with deep understanding of the local market.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About{" "}
            <span className="text-blue-600 dark:text-blue-400">EstateLink</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property, backed by
            years of expertise and dedication to excellence.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  {React.cloneElement(feature.icon, {
                    className: "w-6 h-6 text-blue-600 dark:text-blue-400",
                  })}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white p-8 rounded-2xl mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-blue-100">
              To revolutionize the real estate experience by providing unmatched
              expertise, personalized service, and innovative solutions that
              help our clients achieve their property dreams.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Learn More
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>
        </div>
      </div>
    </div>
  );
}
