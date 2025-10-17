import Advisor from "../models/Adviser.js";
import Blog from "../models/Blog.js";
import Event from "../models/Event.js";
import ExTeam from "../models/ExTeam.js";
import Review from "../models/Review.js";
import Team from "../models/Team.js";

export const getAllHomePageData = async (req, res) => {
  try {
    const [advisors, exTeams, teamMembers, events, blogs, reviews] =
      await Promise.all([
        Advisor.find(),
        ExTeam.find(),
        Team.find(),
        Event.find(),
        Blog.find(),
        Review.find(),
      ]);

    res.status(200).json({
      success: true,
      advisors,
      exTeams,
      teamMembers,
      events,
      blogs,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Home Page Data Not Found",
    });
  }
};
