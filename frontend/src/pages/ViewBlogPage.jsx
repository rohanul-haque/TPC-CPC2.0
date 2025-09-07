import { assets, blogs } from "@/assets/assets";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/ViewBlog.css";

const ViewBlogPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);

  // Filter blog by id
  const filterBlogData = () => {
    const data = blogs.filter((blog) => blog.id.toString() === id);
    if (data.length > 0) {
      setBlogData(data[0]);
    }
  };

  useEffect(() => {
    filterBlogData();
  }, [id]);

  // Format date
  const formattedDate = blogData?.date
    ? new Date(blogData.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <section className="px-4 sm:px-8 lg:px-16 mt-16 min-h-screen">
      {/* Back Button */}
      <div className="mb-5">
        <Link
          to="/blogs"
          className="dark:text-white text-gray-800 md:text-lg font-medium hover:underline flex items-center gap-2"
        >
          <MoveLeft className="w-5 h-5" /> Back to Blogs
        </Link>
      </div>

      {/* Blog Image */}
      <div className="rounded-2xl overflow-hidden border dark:border-gray-600">
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
          <img
            src={assets.teamMember}
            alt={blogData?.author?.name || "Author"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">
              {blogData?.author?.name || "MD ROHANUL HAQUE."}
            </p>
            <p className="text-sm">{new Date().toDateString()}</p>
          </div>
        </div>

        <p
          className="leading-relaxed text-justify blog-description"
          dangerouslySetInnerHTML={{ __html: blogData?.description }}
        ></p>
      </div>
    </section>
  );
};

export default ViewBlogPage;
