import { assets, events } from "@/assets/assets";
import SectionTitle from "@/components/SectionTitle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const EventPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Scroll to event-list section top
  const scrollToTop = () => {
    const section = document.getElementById("event-list");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

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

  return (
    <section className="mt-6" id="event-list">
      <SectionTitle
        title="Our Events 📅🎉"
        paragraph={`🚀 Dive into exciting coding contests, workshops, and webinars! 💻 Join TPI CPC events to learn, innovate, and level up your tech skills! 🌟`}
      />
      <div className="w-full grid grid-cols-1 gap-6 mt-10">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center flex-col md:flex-row border border-gray-400/50 dark:border-gray-500/50 backdrop-blur-sm rounded-lg overflow-hidden relative"
          >
            {/* Status badge */}
            <div
              className="absolute right-0 top-0 bg-violet-500 py-1 px-2"
              style={{ borderBottomLeftRadius: "10px" }}
            >
              <span className="text-sm font-medium text-white">
                {event.status}
              </span>
            </div>

            {/* Event Image */}
            <div className="w-full md:w-[40%] h-full">
              <img
                className="w-full h-full object-cover"
                src={assets.event_image}
                alt={event.title}
              />
            </div>

            {/* Event Info */}
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
                <span>{event.type}</span>
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
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              {/* Previous */}
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

              {/* Page numbers */}
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

              {/* Next */}
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
