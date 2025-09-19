import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import {
  Building2,
  Edit,
  IdCard,
  Loader2,
  Mail,
  Phone,
  Sun,
  User,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const { userData, fetchUserData, loading } = useContext(UserContext);
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNumber: "",
    department: "",
    shift: "",
    mobileNumber: "",
    password: "",
    file: null,
  });

  // Prefill form data
  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        rollNumber: userData.rollNumber || "",
        department: userData.department || "",
        shift: userData.shift || "",
        mobileNumber: userData.mobileNumber || "",
        password: "",
        file: null,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [userData, fetchUserData]);

  const handleSave = async () => {
    try {
      if (
        !formData.fullName &&
        !formData.email &&
        !formData.rollNumber &&
        !formData.department &&
        !formData.shift &&
        !formData.mobileNumber &&
        !formData.password &&
        !formData.file
      ) {
        toast.error("Please update at least one field");
        return;
      }

      setSaving(true);
      const form = new FormData();
      if (formData.fullName) form.append("fullName", formData.fullName);
      if (formData.email) form.append("email", formData.email);
      if (formData.rollNumber) form.append("rollNumber", formData.rollNumber);
      if (formData.department) form.append("department", formData.department);
      if (formData.shift) form.append("shift", formData.shift);
      if (formData.mobileNumber)
        form.append("mobileNumber", formData.mobileNumber);
      if (formData.password) form.append("password", formData.password);
      if (formData.file) form.append("profileImage", formData.file);

      const { data } = await axios.put(`${backendUrl}/user/update`, form, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Profile updated successfully");
        await fetchUserData();
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
    return (
      <section className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <div className="flex items-center space-x-6 mt-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">
          No profile data available.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-16">
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
        {/* Header */}
        <div className="bg-indigo-600 dark:bg-indigo-700 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-indigo-100">
            Manage your account settings and view profile details
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-8 flex flex-col md:flex-row gap-8 border-b border-l border-r rounded-b-xl dark:border-gray-700">
          {/* Left Column: Profile Image */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 shadow-md">
              <img
                src={userData.profileImage || "/default-avatar.png"}
                alt={userData.fullName || "User"}
                className="h-full w-full object-cover"
              />
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Profile</span>
            </Button>
          </div>

          {/* Right Column: Profile Details */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <ProfileCard
              icon={<User className="h-5 w-5 text-indigo-600" />}
              title="Full Name"
              value={userData.fullName}
            />
            <ProfileCard
              icon={<IdCard className="h-5 w-5 text-indigo-600" />}
              title="Roll Number"
              value={userData.rollNumber}
            />
            <ProfileCard
              icon={<Building2 className="h-5 w-5 text-indigo-600" />}
              title="Department"
              value={userData.department}
            />
            <ProfileCard
              icon={<Sun className="h-5 w-5 text-indigo-600" />}
              title="Shift"
              value={userData.shift}
            />
            <ProfileCard
              icon={<Phone className="h-5 w-5 text-indigo-600" />}
              title="Mobile"
              value={userData.mobileNumber}
            />
            <ProfileCard
              icon={<Mail className="h-5 w-5 text-indigo-600" />}
              title="Email"
              value={userData.email}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg dark:bg-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              value={formData.fullName}
              onChange={(v) => setFormData({ ...formData, fullName: v })}
            />
            <FormInput
              label="Email"
              value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
            />
            <FormInput
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(v) => setFormData({ ...formData, rollNumber: v })}
            />
            <FormInput
              label="Department"
              value={formData.department}
              onChange={(v) => setFormData({ ...formData, department: v })}
            />
            <FormInput
              label="Shift"
              value={formData.shift}
              onChange={(v) => setFormData({ ...formData, shift: v })}
            />
            <FormInput
              label="Mobile Number"
              value={formData.mobileNumber}
              onChange={(v) => setFormData({ ...formData, mobileNumber: v })}
            />

            {/* Profile Image */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
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

/* Reusable Card Component */
const ProfileCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
    <div className="flex items-center space-x-2">
      {icon}
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {title}
      </h3>
    </div>
    <p className="text-gray-900 dark:text-gray-100 mt-1">
      {value || "Not provided"}
    </p>
  </div>
);

/* Reusable Input Field */
const FormInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="dark:bg-gray-800 dark:text-white"
    />
  </div>
);

export default Profile;
