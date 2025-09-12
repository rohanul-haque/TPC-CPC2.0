import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { Trash2, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TeamList = () => {
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/team/list`);
      if (data.success) setMemberList(data.teamList || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch team members"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/team/delete`, {
        headers: { token: localStorage.getItem("token") },
        data: { id: memberId },
      });

      if (data.success) {
        toast.success(data.message || "Member deleted successfully");
        fetchTeamData();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete member"
      );
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  return (
    <section className="w-full mb-5">
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : memberList.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-xl border-2 border-dashed border-gray-300">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No team members
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first team member.
          </p>
          <Button
            onClick={() => navigate("/add-team-member")}
            className="bg-violet-600 hover:bg-violet-700"
          >
            Add Member
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
                {memberList.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={member.memberProfile || "/placeholder-avatar.png"}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover border border-gray-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-avatar.png";
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(member._id)}
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
            {memberList.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={member.memberProfile || "/placeholder-avatar.png"}
                    alt={member.name}
                    className="h-12 w-12 rounded-full object-cover border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder-avatar.png";
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(member._id)}
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

export default TeamList;
