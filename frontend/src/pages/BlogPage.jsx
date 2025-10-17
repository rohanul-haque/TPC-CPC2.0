import { Error } from "@/components/Error";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = ({ blogData = [], loading, error }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const totalPages = Math.ceil(blogData.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = [...blogData]
    .reverse()
    .slice(startIndex, startIndex + blogsPerPage);

  const scrollToTop = () => {
    const section = document.getElementById("blog-list");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const truncateText = (html, length) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <section className="mt-6" id="blog-list">
      <SectionTitle
        title="Our Blogs 📝🌐"
        paragraph="💡 Explore insightful articles, coding tips, and tech updates! 🚀 Stay updated and level up your skills with TPI CPC blogs! 📚✨"
      />

      {/* 🔹 Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {Array.from({ length: blogsPerPage }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-gray-400/50 dark:border-gray-700 backdrop-blur-md"
            >
              <Skeleton className="w-full h-48 rounded-md bg-gray-400/70 dark:bg-gray-600" />
              <div className="mt-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Error / Empty */}
      {!loading && (error || blogData.length === 0) && (
        <div className="flex justify-center items-center w-full my-10">
          <Error
            title="🚫 No Blogs Found Yet!"
            description="✨ Stay tuned — exciting new posts are on the way! 🎉"
          />
        </div>
      )}

      {/* 🔹 Blog Grid */}
      {!loading && currentBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {currentBlogs.map(({ _id, image, title, description }) => (
            <div
              key={_id}
              className="p-6 rounded-lg border border-gray-400/50 dark:border-gray-700 backdrop-blur-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={image || "/placeholder-project.png"}
                alt={title || "Blog Image"}
                className="w-full h-48 object-cover rounded-md"
                loading="lazy"
              />
              <div className="mt-5 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {truncateText(title, 40)}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {truncateText(description, 120)}
                </p>
                <Button
                  onClick={() => {
                    navigate(`/blog/${_id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Read More →
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Pagination */}
      {!loading && blogData.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                      scrollToTop();
                    }
                  }}
                  className={
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
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

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage((prev) => prev + 1);
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
