import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddOurAdvisorPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [memberProfile, setMemberProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const addAdvisor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", role);
      if (memberProfile) formData.append("advisorProfile", memberProfile);

      const { data } = await axios.post(`${backendUrl}/advisor/add`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        toast.success(data.message);

        // Reset form
        setName("");
        setRole("");
        setMemberProfile(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form
        onSubmit={addAdvisor} // Fixed function name
        className="w-full lg:max-w-md space-y-5 lg:pl-1"
        encType="multipart/form-data"
      >
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            placeholder="Advisor Name"
            required
          />
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <Label htmlFor="role">Position</Label>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="role"
            name="role"
            placeholder="Advisor Position"
            required
          />
        </div>

        {/* Profile Upload */}
        <div className="space-y-2">
          <Label htmlFor="profile">Profile</Label>
          <Input
            onChange={(e) => setMemberProfile(e.target.files?.[0])}
            id="profile"
            name="profile"
            type="file"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Advisor"
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddOurAdvisorPage;
