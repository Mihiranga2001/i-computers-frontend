import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { AiFillStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      setReviews(res.data);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      setReviews(reviews.filter(r => r._id !== id));
      toast.success("Review deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-primary p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Reviews
      </h1>

      <div className="max-w-5xl mx-auto space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews found</p>
        ) : (
          reviews.map(r => (
            <div key={r._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{r.email}</p>
                  <p className="text-sm text-gray-500">
                    Product: {r.productID}
                  </p>
                </div>

                <button
                  onClick={() => deleteReview(r._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <AiFillDelete size={22} />
                </button>
              </div>

              <div className="my-2">
                {[1,2,3,4,5].map(i =>
                  i <= r.rating
                    ? <AiFillStar key={i} className="text-gold inline" />
                    : <AiOutlineStar key={i} className="text-gray-400 inline" />
                )}
              </div>

              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
