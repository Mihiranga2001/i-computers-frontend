
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsappSquare } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-[var(--color-secondary)] p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <form className="flex-1 bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              placeholder="Your Name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              placeholder="e-mail"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 font-medium">Message</label>
            <textarea
              id="message"
              rows="5"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[var(--color-gold)] text-white font-semibold px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Our Information</h2>

          <p><strong>Shop Name:</strong> i-Computers</p>
          <p><strong>Address:</strong> Jaffna, Sri Lanka</p>
          <p><strong>Email:</strong> icomputer@gmail.com</p>
          <p><strong>Phone:</strong> +94 77 818 9165</p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-[var(--color-secondary)]">
                <a href="#" className="hover:text-gold"><FaFacebookF /></a>
                <a href="#" className="hover:text-gold"><FaInstagram /></a>
                <a href="#" className="hover:text-gold"><FaTwitter /></a>
                <a href="#" className="hover:text-gold"><FaWhatsappSquare /></a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
