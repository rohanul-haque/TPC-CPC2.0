import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [eventStatus, setEventStatus] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("eventType", eventType);
      formData.append("organizer", organizer);
      formData.append("startTime", startDate?.toISOString() || "");
      formData.append("endTime", endDate?.toISOString() || "");
      formData.append("status", eventStatus);
      if (image) formData.append("eventImage", image);

      const { data } = await axios.post(`${backendUrl}/event/add`, formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);

        setTitle("");
        setLocation("");
        setDescription("");
        setEventType("");
        setOrganizer("");
        setStartDate(null);
        setEndDate(null);
        setEventStatus("");
        setImage(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pl-1">
      <form onSubmit={handleSubmit} className="space-y-6 lg:max-w-2xl">
        {/* Event Name */}
        <div className="flex flex-col gap-2">
          <Label>Event Name</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Name"
            required
          />
        </div>

        {/* Event Location */}
        <div className="flex flex-col gap-2">
          <Label>Event Location</Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Event Location"
            required
          />
        </div>

        {/* Event Description */}
        <div className="flex flex-col gap-2">
          <Label>Event Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            required
          />
        </div>

        {/* Type & Organizer */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Label>Event Type</Label>
            <Input
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="Event Type (Seminar, Workshop, Bootcamp)"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label>Organizer</Label>
            <Input
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Organizer Name"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="event-start-date">Event Start Date</Label>
            <Popover
              className="w-full"
              open={startOpen}
              onOpenChange={setStartOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="event-start-date"
                  className="w-full justify-between font-normal"
                >
                  {startDate ? startDate.toLocaleDateString() : "Select date"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setStartDate(date);
                    setStartOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="event-end-date">Event End Date</Label>
            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="event-end-date"
                  className="w-full justify-between font-normal"
                >
                  {endDate ? endDate.toLocaleDateString() : "Select date"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setEndDate(date);
                    setEndOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Status & Image */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <Label>Event Status</Label>
            <Select value={eventStatus} onValueChange={setEventStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <Label>Event Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2"
        >
          {loading && <LoaderCircle className="animate-spin h-4 w-4" />}
          {loading ? "Adding..." : "Add Event"}
        </Button>
      </form>
    </section>
  );
};

export default AddEventPage;
