import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const imageFile = req.file;

  if (!title || !description || !imageFile) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const imageUploadUrl = await cloudinary.uploader.upload(imageFile.path);

    const blog = new Blog({
      title,
      description,
      image: imageUploadUrl.secure_url,
    });

    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog upload failed",
    });
  }
};

export const blogList = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
        blogList: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog list fetched successfully",
      blogList: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog list fetch failed",
      blogList: [],
    });
  }
};

export const blogFindById = async (req, res) => {
  const { blogId } = req.body;

  if (!blogId) {
    return res.status(400).json({
      success: false,
      message: "Blog id is required",
    });
  }

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog found successfully",
      blogData: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

export const blogDelete = async (req, res) => {
  const { blogId } = req.body;

  if (!blogId) {
    return res.status(400).json({
      success: false,
      message: "Blog id is required",
    });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog deletion failed",
    });
  }
};
