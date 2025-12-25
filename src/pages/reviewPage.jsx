import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ReviewPage() {
  const { productID } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${productID}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    if (productID) fetchReviews();
  }, [productID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!rating || !comment) {
      toast.error("Rating and comment required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews`,
        { productID, rating: Number(rating), comment },
        {
          headers: { Authorization: "Bearer " + token }
        }
      );
      setReviews([res.data, ...reviews]);
      setComment("");
      setRating(0);
      setHoverRating(0);
      toast.success("Review added");
    } catch (err) {
      console.error("Error adding review:", err);
      toast.error("Failed to add review");
    }
  };

  const renderStars = (value) =>
    [...Array(5)].map((_, i) =>
      i < value ? (
        <AiFillStar key={i} className="text-yellow-500 inline" />
      ) : (
        <AiOutlineStar key={i} className="text-gray-400 inline" />
      )
    );

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Reviews</h1>

      <div className="space-y-4 mb-8">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <div key={r.reviewId} className="border p-4 rounded">
              <div className="flex justify-between mb-2">
                <p className="font-semibold">{r.email}</p>
                <div>{renderStars(r.rating)}</div>
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <AiFillStar
              key={i}
              className={`cursor-pointer ${
                i <= (hoverRating || rating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review"
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-accent text-white px-4 py-2 rounded hover:bg-accent/80">
          Submit Review
        </button>
      </form>
    </div>
  );
}
