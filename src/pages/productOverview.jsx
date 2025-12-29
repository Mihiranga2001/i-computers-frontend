import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
  const navigate = useNavigate();
  const { productID } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Product Not Found");
        setStatus("error");
      });
  }, [productID]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${productID}`)
      .then((res) => setReviews(res.data))
      .catch(() => console.log("Failed to load reviews"));
  }, [productID]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className="text-gold inline" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-400 inline" />
        )
      );
    }
    return stars;
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (status === "loading") return <Loader />;
  if (status === "error")
    return <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>;

  return (
    <div className="w-full min-h-screen p-4 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <ImageSlider images={product.images} />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-semibold">{product.name}</h1>
          <p className="text-secondary/80">{product.productID}</p>
          <p className="text-secondary/80 flex items-center">
            <CgChevronRight className="mr-1" /> {product.category}
          </p>
          {product.altNames && (
            <p className="text-secondary/80">{product.altNames.join(" | ")}</p>
          )}
          <p className="text-secondary/90 max-h-32 overflow-y-auto">{product.description}</p>

          <div>
            {product.labelledPrice > product.price && (
              <p className="line-through text-secondary/80">
                LKR {product.labelledPrice.toFixed(2)}
              </p>
            )}
            <p className="text-accent font-semibold text-2xl">
              LKR {product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => addToCart(product, 1)}
              className="bg-accent text-white px-6 py-3 rounded hover:bg-accent/70 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() =>
                navigate("/checkout", { state: [{ ...product, quantity: 1 }] })
              }
              className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent/20 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Latest Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
              <div className="flex">{renderStars(Math.round(averageRating))}</div>
              <span className="text-gray-500">({reviews.length})</span>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center mb-4">No reviews yet.</p>
        ) : (
          reviews.slice(-2).map((r) => (
            <div
              key={r.reviewId}
              className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-secondary">{r.email}</p>
                <div className="flex">{renderStars(r.rating)}</div>
              </div>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))
        )}

        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => navigate(`/reviews/${product.productID}`)}
            className="border-2 border-gray-400 text-gray-700 px-10 py-3 rounded hover:bg-accent hover:text-primary transition"
          >
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
