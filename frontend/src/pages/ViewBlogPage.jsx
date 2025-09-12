import { assets } from "@/assets/assets";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import "../styles/ViewBlog.css";

const ViewBlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);

  const findBlogById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/blog/find`, {
        blogId: id,
      });

      if (data.success) {
        setBlogData(data.blogData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findBlogById();
  }, [id]);

  // Format Date
  const formattedDate = blogData
    ? new Date(blogData?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <section className="px-4 mb-5">
      {/* Back Button */}
      <div className="mb-5">
        <Link
          to="/blogs"
          className="dark:text-white text-gray-800 md:text-lg font-medium hover:underline flex items-center gap-2"
        >
          <MoveLeft className="w-5 h-5" /> Back to Blogs
        </Link>
      </div>

      {loading ? (
        <>
          {/* Image Skeleton */}
          <Skeleton className="w-full h-64 sm:h-96 rounded-2xl mb-6" />

          {/* Title Skeleton */}
          <Skeleton className="h-10 w-3/4 mb-4" />

          {/* Author Section Skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </>
      ) : blogData ? (
        <>
          {/* Blog Image */}
          <div className="rounded-2xl overflow-hidden border">
            <img
              src={blogData?.image}
              alt={blogData?.title}
              className="w-full h-64 sm:h-96 object-cover transition-transform duration-300 hover:scale-105 rounded-md"
            />
          </div>

          {/* Blog Content */}
          <div className="mt-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              {blogData?.title}
            </h1>

            {/* Author + Time */}
            <div className="flex items-center gap-3 mb-6">
              <div className="border rounded-full">
                <img
                  src={assets.logo}
                  alt={blogData?.author?.name || "Author"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  TPI-CPC
                </p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>

            <p
              className="leading-relaxed text-gray-700 dark:text-gray-300 text-justify blog-description"
              dangerouslySetInnerHTML={{ __html: blogData?.description }}
            ></p>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-500">Blog not found.</p>
        </div>
      )}
    </section>
  );
};

export default ViewBlogPage;
