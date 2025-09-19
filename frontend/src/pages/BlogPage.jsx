import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const { backendUrl } = useContext(AppContext);

  const truncateText = (html, length) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogList.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogList.length / blogsPerPage);

  // Scroll to top (blog section)
  const scrollToTop = () => {
    const section = document.getElementById("blog-list");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/blog/list`);
      if (data.success) {
        setBlogList(data?.blogList || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <section className="mt-6" id="blog-list">
      <SectionTitle
        title="Our Blogs 📝🌐"
        paragraph={`💡 Explore insightful articles, coding tips, and tech updates! 🚀 Stay updated and level up your skills with TPI CPC blogs! 📚✨`}
      />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: blogsPerPage }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-gray-400/50 dark:border-gray-700 backdrop-blur-md"
              >
                <Skeleton className="w-full h-48 rounded-md bg-gray-400/70 dark:bg-gray-600" />
                <div className="mt-5 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-gray-400/70 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-full bg-gray-400/70 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-2/3 bg-gray-400/70 dark:bg-gray-600" />
                  <Skeleton className="h-10 w-32 bg-gray-400/70 dark:bg-gray-600" />
                </div>
              </div>
            ))
          : currentBlogs.length > 0
          ? currentBlogs.map((blog) => {
              const { _id, image, title, description } = blog;

              return (
                <div
                  key={_id}
                  className="p-6 rounded-lg border border-gray-400/50 dark:border-gray-700 backdrop-blur-md"
                >
                  <img
                    src={image || "/placeholder-project.png"}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="mt-5 space-y-3">
                    <h3 className="text-2xl font-bold mb-4">
                      {truncateText(title, 23)}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {truncateText(description, 100)}
                    </p>
                    <Button
                      onClick={() => {
                        navigate(`/blog/${_id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              );
            })
          : // No blogs message
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
              No blogs available at the moment. Please check back later! 📝
            </p>
        }
      </div>

      {/* Pagination */}
      {!loading && blogList.length > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      scrollToTop();
                    }
                  }}
                  className={
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => {
                      setCurrentPage(i + 1);
                      scrollToTop();
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      scrollToTop();
                    }
                  }}
                  className={
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
