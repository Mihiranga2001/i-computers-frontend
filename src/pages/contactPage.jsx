import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">Contact Us</h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-200">Our Information</h2>

          <div className="space-y-4 text-gray-700">
            <p><span className="font-semibold">Shop Name:</span> i-Computers</p>
            <p><span className="font-semibold">Address:</span> Jaffna, Sri Lanka</p>
            <p><span className="font-semibold">Email:</span> icomputer@gmail.com</p>
            <p><span className="font-semibold">Phone:</span> +94 77 818 9165</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-5 text-gray-600">
              <a href="#" className="hover:text-blue-600 transition text-2xl"><FaFacebookF /></a>
              <a href="#" className="hover:text-pink-500 transition text-2xl"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-400 transition text-2xl"><FaTwitter /></a>
              <a href="#" className="hover:text-green-500 transition text-2xl"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
          <img
            src="/map.png" 
            alt="Shop Location"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
