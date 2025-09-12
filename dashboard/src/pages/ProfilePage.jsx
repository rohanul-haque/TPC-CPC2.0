import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/contexts/AppContext";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { Edit, Loader2, Mail, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const { adminData, loading, setAdminData, fetchAdminData } =
    useContext(UserContext);
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });

  // Prefill form data when adminData loads
  useEffect(() => {
    if (adminData) {
      setFormData({
        name: adminData.name || "",
        email: adminData.email || "",
        password: "",
        file: null, // ✅ fixed
      });
    }
  }, [adminData]);

  // Fetch admin data on mount if not already loaded
  useEffect(() => {
    if (!adminData) {
      fetchAdminData();
    }
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      if (formData.password) form.append("password", formData.password);
      if (formData.file) form.append("adminProfile", formData.file);

      const { data } = await axios.put(`${backendUrl}/admin/update`, form, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Profile updated successfully");
        await fetchAdminData();
        setOpen(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!adminData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No profile data available.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold">Admin Profile</h2>
          <p className="text-indigo-100">
            Manage your account settings and view your profile details
          </p>
        </div>

        <div className="px-6 py-8 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 border-b border-l border-r rounded-b-xl">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mx-auto md:mx-0">
              <img
                src={adminData.adminProfile || "/default-avatar.png"}
                alt={adminData.name || "Admin"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-grow space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-700">Name</h3>
              </div>
              <p className="text-gray-900">{adminData.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-700">Email</h3>
              </div>
              <p className="text-gray-900">{adminData.email}</p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <Input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProfilePage;
