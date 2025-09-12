import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { Trash2, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdvisorListPage = () => {
  const [advisorList, setAdvisorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchAdvisorData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/advisor/list`);
      if (data.success) setAdvisorList(data.advisorList || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch advisors"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (advisorId) => {
    if (!window.confirm("Are you sure you want to delete this advisor?"))
      return;

    try {
      const { data } = await axios.delete(`${backendUrl}/advisor/delete`, {
        headers: { token: localStorage.getItem("token") },
        data: { id: advisorId },
      });

      if (data.success) {
        toast.success(data.message || "Advisor deleted successfully");
        fetchAdvisorData();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete advisor"
      );
    }
  };

  useEffect(() => {
    fetchAdvisorData();
  }, []);

  return (
    <section className="w-full mb-5">
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : advisorList.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-xl border-2 border-dashed border-gray-300">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No advisors
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first advisor.
          </p>
          <Button
            onClick={() => navigate("/add-advisor")}
            className="bg-violet-600 hover:bg-violet-700"
          >
            Add Advisor
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-gray-200">
          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Position
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {advisorList.map((advisor) => (
                  <tr
                    key={advisor._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={
                          advisor.advisorProfile || "/placeholder-avatar.png"
                        }
                        alt={advisor.name}
                        className="h-12 w-12 rounded-full object-cover border border-gray-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-avatar.png";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {advisor.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {advisor.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(advisor._id)}
                        className="rounded-full"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden grid gap-4 p-4">
            {advisorList.map((advisor) => (
              <div
                key={advisor._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={advisor.advisorProfile || "/placeholder-avatar.png"}
                    alt={advisor.name}
                    className="h-12 w-12 rounded-full object-cover border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder-avatar.png";
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {advisor.name}
                    </p>
                    <p className="text-xs text-gray-600">{advisor.role}</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(advisor._id)}
                  className="rounded-full"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdvisorListPage;
