import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { PencilRuler, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");

  const { backendUrl } = useContext(AppContext);

  const fetchEventList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/event/list`);
      if (data.success) setEventList(data.events || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch events"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventList();
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(eventId);
    try {
      const { data } = await axios.delete(`${backendUrl}/event/${eventId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        toast.success(data.message);
        fetchEventList();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Delete failed"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditStatus(event.status || "planned");
    setModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!editStatus) return toast.error("Please select a status");
    try {
      const { data } = await axios.put(
        `${backendUrl}/event/update`,
        { id: editingEvent._id, status: editStatus },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        toast.success("Event status updated successfully");
        setModalOpen(false);
        fetchEventList();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Update failed"
      );
    }
  };

  const getStatusLabel = (event) => {
    switch (event.status) {
      case "planned":
        return (
          <span className="text-yellow-600 dark:text-yellow-400">Planned</span>
        );
      case "ongoing":
        return (
          <span className="text-green-600 dark:text-green-400">Ongoing</span>
        );
      case "completed":
        return (
          <span className="text-blue-600 dark:text-blue-400">Completed</span>
        );
      case "cancelled":
        return (
          <span className="text-gray-600 dark:text-gray-400">Cancelled</span>
        );
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  return (
    <section className="w-full mb-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {[
                    "Banner",
                    "Name",
                    "Location",
                    "Description",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {eventList.length > 0 ? (
                  eventList.map((event) => (
                    <tr
                      key={event._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img
                            className="h-full w-full object-cover"
                            src={event.eventImage}
                            alt={event.title || "Event"}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/50?text=No+Image";
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium max-w-[150px] truncate">
                        {event.title}
                      </td>
                      <td className="px-4 py-3 max-w-[120px] truncate">
                        {event.location}
                      </td>
                      <td className="px-4 py-3 max-w-[200px] truncate">
                        {event.description}
                      </td>
                      <td className="px-4 py-3">{getStatusLabel(event)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(event)}
                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs font-medium"
                          >
                            <PencilRuler size={14} />
                            Edit
                          </button>
                          <button
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white p-1 rounded text-xs font-medium"
                            onClick={() => handleDelete(event._id)}
                            disabled={deletingId === event._id}
                          >
                            {deletingId === event._id ? (
                              <Loader size="sm" />
                            ) : (
                              <>
                                <X size={14} />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span>No events found</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchEventList}
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

      {/* Edit Event Status Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event Status</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1">
              <Label htmlFor="status">Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger id="status" className="w-full">
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
          </div>
          <DialogFooter>
            <Button onClick={handleEditSave}>Save</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventList;
