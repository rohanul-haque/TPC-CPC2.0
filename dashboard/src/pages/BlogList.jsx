import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchBlogListData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/blog/list`);
      if (data.success) {
        setBlogList(data.blogList);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch blog list"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogListData();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/blog/delete`, {
        data: { blogId },
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogListData();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Delete failed"
      );
    }
  };

  return (
    <section className="w-full mb-3">
      {loading ? (
        <Loader />
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    View
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {blogList.length > 0 ? (
                  blogList.map((list) => (
                    <tr
                      key={list._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {/* Blog Image */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="h-13 w-13 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img
                            className="h-full w-full object-cover p-1 rounded-md"
                            src={list.image}
                            alt={list.title}
                            loading="lazy"
                          />
                        </div>
                      </td>
                      {/* Blog Title */}
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 max-w-[120px] sm:max-w-[180px] truncate">
                          {list.title}
                        </div>
                      </td>
                      {/* Blog Description */}
                      <td className="hidden md:table-cell px-4 py-4">
                        <div
                          className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-w-[200px] lg:max-w-[300px]"
                          dangerouslySetInnerHTML={{
                            __html: list.description,
                          }}
                        ></div>
                      </td>
                      {/* View Blog link */}

                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap">
                        <span
                          onClick={() => navigate(`/blog/${list._id}`)}
                          className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                          role="button"
                        >
                          View
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(list._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                            aria-label="Delete blog"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span>No blogs found</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchBlogListData}
                          className="mt-2"
                        >
                          Refresh
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogList;
