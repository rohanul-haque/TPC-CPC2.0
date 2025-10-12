import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddTeamMember = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [memberProfile, setMemberProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const addMember = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FormData for file upload
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", position);
      if (memberProfile) {
        formData.append("memberProfile", memberProfile);
      }

      const { data } = await axios.post(`${backendUrl}/team/add`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        toast.success(data.message);

        // Reset form fields
        setName("");
        setPosition("");
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
        onSubmit={addMember}
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
            placeholder="Member Name"
            required
          />
        </div>

        {/* Position Field */}
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            id="position"
            name="position"
            placeholder="Member Position"
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

        {/* Submit Button with Loader */}
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
            "Add Member"
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddTeamMember;
