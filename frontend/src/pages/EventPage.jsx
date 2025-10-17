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
import { useState } from "react";

const EventPage = ({ eventData = [], loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const reversedEvents = [...eventData].reverse();

  const totalPages = Math.ceil(reversedEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = reversedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const scrollToTop = () => {
    const section = document.getElementById("event-list");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
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

  return (
    <section className="mt-6" id="event-list">
      <SectionTitle
        title="Our Events 📅🎉"
        paragraph="🚀 Dive into exciting coding contests, workshops, and webinars! 💻 Join TPI CPC events to learn, innovate, and level up your tech skills! 🌟"
      />

      {error && (
        <Error
          title="🚫 No events found yet!"
          description="Stay tuned! New events will be announced soon 🎉"
        />
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 mt-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row border border-gray-400/50 dark:border-gray-500/50 rounded-lg overflow-hidden"
            >
              <Skeleton className="w-full md:w-[40%] h-48 bg-gray-400/70 dark:bg-gray-600" />
              <div className="w-full md:w-[60%] p-6 space-y-3">
                <Skeleton className="h-6 w-2/3 bg-gray-400/70 dark:bg-gray-600" />
                <Skeleton className="h-4 w-1/2 bg-gray-400/70 dark:bg-gray-600" />
                <Skeleton className="h-4 w-3/4 bg-gray-400/70 dark:bg-gray-600" />
                <Skeleton className="h-4 w-1/3 bg-gray-400/70 dark:bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
      ) : currentEvents.length === 0 && !error ? (
        <Error
          title="🚫 No events found yet!"
          description="Stay tuned! New events will be announced soon 🎉"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-10">
          {currentEvents.map((event) => (
            <div
              key={event._id}
              className="flex flex-col md:flex-row border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm rounded-lg overflow-hidden relative"
            >
              {event.status && (
                <div className="absolute right-0 top-0 bg-violet-500 text-white text-sm px-2 py-1 rounded-bl-lg">
                  {event.status}
                </div>
              )}

              <div className="w-full md:w-[40%]">
                <img
                  src={event.eventImage}
                  alt={event.title}
                  className="w-full h-[300px] object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              <div className="w-full md:w-[60%] p-6">
                <h2 className="text-2xl font-semibold mb-3">{event.title}</h2>
                <p className="mb-2">
                  <span className="font-semibold">Time:</span>{" "}
                  {formatDateTime(event.startTime)} –{" "}
                  {formatDateTime(event.endTime)}
                </p>
                <p className="mb-2">{event.description}</p>
                <p className="mb-2">
                  <span className="font-semibold">Event Type:</span>{" "}
                  {event.eventType}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Organizer:</span>{" "}
                  {event.organizer}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((p) => p - 1);
                      scrollToTop();
                    }
                  }}
                  className={
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
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
                      setCurrentPage((p) => p + 1);
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
