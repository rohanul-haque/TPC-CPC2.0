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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../assets/assets";

const BlogPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const truncateText = (html, length) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Scroll to top (blog section)
  const scrollToTop = () => {
    const section = document.getElementById("blog-list");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mt-6" id="blog-list">
      <SectionTitle
        title="Our Blogs 📝🌐"
        paragraph={`💡 Explore insightful articles, coding tips, and tech updates! 🚀 Stay updated and level up your skills with TPI CPC blogs! 📚✨`}
      />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => {
          const { id, image, title, description } = blog;

          return (
            <div
              key={id}
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
                    navigate(`/blog/${id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Read More
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
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
    </section>
  );
};

export default BlogPage;
