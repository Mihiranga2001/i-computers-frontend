import React from "react";
import { useState } from "react";

export default function AboutPage() {
const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-16 bg-primary text-accent">
      
      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        About iComputers
      </h1>

      {/* Intro Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img src={hovered ? "/about-image-hover.jpg" : "/about-image.jpg"} alt="About iComputers"className="w-full h-auto rounded-lg shadow-md transition-all duration-300"
            onMouseEnter={() => setHovered(true)}  // when mouse enters
            onMouseLeave={() => setHovered(false)} // when mouse leaves
      />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-sm leading-relaxed mb-4">
            iComputers is your trusted computer shop in Jaffna. We specialize in
            gaming PCs, laptops, accessories, and provide professional tech support.
          </p>
          <p className="text-sm leading-relaxed">
            Our goal is to provide high-quality products with excellent customer service. 
            Whether you are a student, gamer, or professional, we have the right tech solution for you.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-sm leading-relaxed">
          To provide high-quality computer products and services that empower our customers 
          to achieve their goals, from gaming to professional work, with reliability and trust.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
          <p className="text-sm leading-relaxed">
            Only genuine, tested products from trusted brands.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
          <p className="text-sm leading-relaxed">
            Our team is ready to help with installation, troubleshooting, and advice.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Customer Focused</h3>
          <p className="text-sm leading-relaxed">
            We care about our customers and strive for 100% satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}
