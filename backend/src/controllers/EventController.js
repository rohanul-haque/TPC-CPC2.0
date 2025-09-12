import { v2 as cloudinary } from "cloudinary";
import Event from "../models/Event.js";

export const AddEvent = async (req, res) => {
  const {
    title,
    location,
    description,
    eventType,
    organizer,
    startTime,
    endTime,
    status,
  } = req.body;

  const eventImage = req.file;

  if (
    !title ||
    !location ||
    !description ||
    !eventType ||
    !organizer ||
    !startTime ||
    !endTime ||
    !status ||
    !eventImage
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const eventImageUrl = await cloudinary.uploader.upload(eventImage.path);

    const newEvent = new Event({
      title,
      location,
      description,
      eventType,
      organizer,
      startTime,
      endTime,
      status,
      eventImage: eventImageUrl.secure_url,
    });

    await newEvent.save();
    return res.status(201).json({
      success: true,
      message: "Event added successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Event add failed" });
  }
};

export const EventList = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json({
      success: true,
      message: "Event data fetched successfully",
      eventList: events,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Event data fetch failed",
    });
  }
};

export const DeleteEvent = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

export const UpdateEvent = async (req, res) => {
  const {
    id,
    title,
    description,
    eventType,
    organizer,
    startTime,
    endTime,
    status,
  } = req.body;
  const eventImage = req.file;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Event ID is required" });
  }

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (eventType) event.eventType = eventType;
    if (organizer) event.organizer = organizer;
    if (startTime) event.startTime = startTime;
    if (endTime) event.endTime = endTime;
    if (status) event.status = status;

    if (eventImage) {
      const uploadResult = await cloudinary.uploader.upload(eventImage.path);
      event.image = uploadResult.secure_url;
    }

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      updatedEvent: event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};
