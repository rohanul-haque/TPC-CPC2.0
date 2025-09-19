"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddReviewPage = () => {
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [semester, setSemester] = useState("");
  const [shift, setShift] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [department, setDepartment] = useState(""); // ✅ department added
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !semester || !shift || !reviewMessage || !profileImage || !department) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("semester", semester);
      formData.append("shift", shift);
      formData.append("reviewMessage", reviewMessage);
      formData.append("department", department); // ✅ department included
      formData.append("profileImage", profileImage);

      const { data } = await axios.post(`${backendUrl}/review/add`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);

        // Clear form fields
        setFullName("");
        setProfileImage(null);
        setSemester("");
        setShift("");
        setReviewMessage("");
        setDepartment(""); // ✅ clear department
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center mt-16">
      <div className="max-w-xl w-full bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8 sm:p-10 border">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          🌟 Add Your Review
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              className="w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Profile Image */}
          <div className="flex flex-col">
            <label
              htmlFor="profileImage"
              className="text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Profile Image
            </label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          {/* Semester + Shift + Department */}
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="semester"
                className="text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                Semester
              </label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger id="semester" className="w-full">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>
                      {i + 1}
                      {i === 0
                        ? "st"
                        : i === 1
                        ? "nd"
                        : i === 2
                        ? "rd"
                        : "th"}{" "}
                      Semester
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="shift"
                className="text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                Shift
              </label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger id="shift" className="w-full">
                  <SelectValue placeholder="Select Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="department"
                className="text-gray-700 dark:text-gray-300 font-medium mb-2"
              >
                Department
              </label>
              <Input
                id="department"
                placeholder="Department"
                className="w-full"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>

          {/* Review */}
          <div className="flex flex-col">
            <label
              htmlFor="reviewMessage"
              className="text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Your Review
            </label>
            <Textarea
              id="reviewMessage"
              placeholder="Write your review here..."
              rows={5}
              className="w-full"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-[45px] text-base flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <LoaderCircle className="animate-spin" />}
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddReviewPage;
