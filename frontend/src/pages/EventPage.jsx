import { Error } from "@/components/Error";
import SectionTitle from "@/components/SectionTitle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const EventPage = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const { backendUrl } = useContext(AppContext);

  const totalPages = Math.ceil(eventList?.length / eventsPerPage);

  const scrollToTop = () => {
    const section = document.getElementById("event-list");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventList?.slice(indexOfFirstEvent, indexOfLastEvent);

  const formatDateTime = (isoString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(isoString).toLocaleString(undefined, options);
  };

  const fetchEventDataList = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(`${backendUrl}/event/list`);

      if (data.success) {
        setEventList(data.events || []);
      }
    } catch (err) {
      setError("🚫 No events found Yet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDataList();
  }, []);

  return (
    <section className="mt-6" id="event-list">
      <SectionTitle
        title="Our Events 📅🎉"
        paragraph={`🚀 Dive into exciting coding contests, workshops, and webinars! 💻 Join TPI CPC events to learn, innovate, and level up your tech skills! 🌟`}
      />

      {error && (
        <Error
          title={"🚫 No events found Yet!"}
          description={" Stay tuned! New events will be announced soon 🎉!"}
        />
      )}

      <div className="w-full grid grid-cols-1 gap-6 mt-10">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center flex-col md:flex-row border border-gray-400/50 dark:border-gray-500/50 rounded-lg overflow-hidden"
            >
              <Skeleton className="w-full md:w-[40%] h-48 bg-gray-400/70 dark:bg-gray-600" />
              <div className="w-full md:w-[60%] p-6 space-y-3">
                <Skeleton className="h-6 w-2/3 bg-gray-400/70 dark:bg-gray-600" />
                <Skeleton className="h-4 w-1/2 bg-gray-400/70 dark:bg-gray-600" />
                <Skeleton className="h-4 w-3/4 bg-gray-400/70 dark:bg-gray-600" />
                <Skeleton className="h-4 w-1/3 bg-gray-400/70 dark:bg-gray-600" />
              </div>
            </div>
          ))
        ) : eventList.length === 0 && !error ? (
          <Error
            title={"🚫 No events found Yet!"}
            description={" Stay tuned! New events will be announced soon 🎉!"}
          />
        ) : (
          currentEvents
            .slice()
            .reverse()
            .map((event) => (
              <div
                key={event._id}
                className="flex items-center flex-col md:flex-row border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm rounded-lg overflow-hidden relative"
              >
                <div
                  className="absolute right-0 top-0 bg-violet-500 py-1 px-2"
                  style={{ borderBottomLeftRadius: "10px" }}
                >
                  <span className="text-sm font-medium text-white">
                    {event.status}
                  </span>
                </div>

                <div className="w-full md:w-[40%] h-full">
                  <img
                    className="w-full h-[300px] object-cover"
                    src={event.eventImage}
                    alt={event.title}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>

                <div className="w-full md:w-[60%] p-6 h-full">
                  <h2 className="text-2xl font-semibold mb-3">{event.title}</h2>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">Time:</span>
                    <span>
                      {formatDateTime(event.startTime)} –{" "}
                      {formatDateTime(event.endTime)}
                    </span>
                  </div>
                  <p className="mb-2">{event.description}</p>
                  <p className="mb-2">
                    <span className="font-semibold">Event Type:</span>{" "}
                    <span>{event.eventType}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Organizer:</span>{" "}
                    <span>{event.organizer}</span>
                  </p>
                  {event.collaboration && (
                    <p className="mb-2">
                      <span className="font-semibold">Collaboration:</span>{" "}
                      <span>{event.collaboration}</span>
                    </p>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      {!loading && eventList.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      scrollToTop();
                    }
                  }}
                  className={
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => {
                      setCurrentPage(i + 1);
                      scrollToTop();
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      scrollToTop();
                    }
                  }}
                  className={
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default EventPage;
