# TPI-CPC 2.0 - Technical Polytechnic Institute Computer Programming Club

## Project Overview

TPI-CPC 2.0 is a comprehensive full-stack web application for the Technical Polytechnic Institute Computer Programming Club. The platform provides a complete ecosystem for club management, including member registration, event management, blog publishing, and administrative dashboards.

## Tech Stack

### Frontend
- **Framework:** React 19.1.1 with Vite
- **Routing:** React Router DOM v7
- **Styling:** TailwindCSS v4 with custom animations
- **UI Components:** Radix UI, Shadcn/ui components
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js with Express v5
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** Bcrypt
- **File Upload:** Multer & Cloudinary
- **Email Service:** Nodemailer
- **API Security:** CORS enabled

### Admin Dashboard
- **Framework:** React 19.1.1 with Vite
- **Rich Text Editor:** Quill
- **Date Management:** date-fns, react-day-picker
- **UI Components:** Radix UI, Shadcn/ui
- **Styling:** TailwindCSS v4

## Project Structure

```
TPI-CPC2.0/
├── frontend/               # Public-facing website
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── layouts/       # Layout components
│   │   └── assets/        # Static assets
│   └── package.json
│
├── backend/               # REST API server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middlewares/  # Custom middleware
│   │   ├── db/           # Database configuration
│   │   └── utils/        # Helper utilities
│   ├── Server.js         # Main server file
│   └── package.json
│
└── dashboard/            # Admin panel
    ├── src/
    │   ├── components/   # UI components
    │   ├── pages/        # Admin pages
    │   ├── contexts/     # React contexts
    │   └── layout/       # Layout components
    └── package.json
```

## Features

### Public Website (Frontend)
- **Home Page:** Hero section with club introduction
- **About:** Club information and mission
- **Team Members:** Display of club executives and members
- **Events:** Upcoming and past event listings
- **Blogs:** Technical articles and tutorials
- **Testimonials:** Member reviews and feedback
- **User Authentication:** Sign up, login, password recovery
- **User Profile:** Personal dashboard for registered members
- **Review System:** Members can submit reviews

### Admin Dashboard
- **Team Management:** Add, edit, delete team members
- **Advisor Management:** Manage club advisors
- **Event Management:** Create and manage club events
- **Blog Publishing:** Rich text editor for blog creation
- **Content Moderation:** Review and manage user submissions
- **Analytics:** View club statistics and metrics

### Backend API
- **RESTful Architecture:** Clean and organized API structure
- **JWT Authentication:** Secure token-based authentication
- **File Upload:** Cloud-based image storage with Cloudinary
- **Email Integration:** Automated email notifications
- **Data Validation:** Mongoose schema validation
- **Error Handling:** Comprehensive error management

## API Endpoints

### User Routes (`/user`)
- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /profile` - Get user profile
- `PUT /update-profile` - Update user information
- `POST /forgot-password` - Password recovery

### Admin Routes (`/admin`)
- `POST /login` - Admin authentication
- `GET /profile` - Admin profile
- `PUT /update-profile` - Update admin details

### Team Routes (`/team`)
- `GET /` - List all team members
- `POST /add` - Add new team member (Admin)
- `PUT /update/:id` - Update team member (Admin)
- `DELETE /delete/:id` - Remove team member (Admin)

### Advisor Routes (`/advisor`)
- `GET /` - List all advisors
- `POST /add` - Add new advisor (Admin)
- `PUT /update/:id` - Update advisor (Admin)
- `DELETE /delete/:id` - Remove advisor (Admin)

### Event Routes (`/event`)
- `GET /` - List all events
- `GET /:id` - Get specific event
- `POST /add` - Create new event (Admin)
- `PUT /update/:id` - Update event (Admin)
- `DELETE /delete/:id` - Delete event (Admin)

### Blog Routes (`/blog`)
- `GET /` - List all blogs
- `GET /:id` - Get specific blog
- `POST /add` - Create new blog (Admin)
- `PUT /update/:id` - Update blog (Admin)
- `DELETE /delete/:id` - Delete blog (Admin)

### Review Routes (`/review`)
- `GET /` - List all reviews
- `POST /add` - Submit new review (User)
- `DELETE /delete/:id` - Delete review (Admin)

## Installation & Setup

### Prerequisites
- Node.js v18+ and npm
- MongoDB database
- Cloudinary account for image storage
- SMTP server for email functionality

### Environment Variables

Create `.env` files in each directory:

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

#### Dashboard (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/TPI-CPC2.0.git
cd TPI-CPC2.0
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Install Dashboard Dependencies**
```bash
cd ../dashboard
npm install
```

### Running the Application

#### Development Mode

1. **Start Backend Server**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:5000

2. **Start Frontend Application**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

3. **Start Admin Dashboard**
```bash
cd dashboard
npm run dev
```
Dashboard runs on http://localhost:5174

#### Production Mode

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Build Dashboard**
```bash
cd dashboard
npm run build
```

3. **Start Backend**
```bash
cd backend
npm start
```

## Database Models

### User Schema
- fullName (String, required)
- email (String, unique, required)
- mobileNumber (String, required)
- rollNumber (String, required)
- department (String, required)
- shift (String, required)
- password (String, min: 6, required)
- profileImage (String, required)
- otp (Number, for password reset)

### Admin Schema
- name (String, required)
- email (String, unique, required)
- password (String, required)
- profilePic (String)

### Team Schema
- name (String, required)
- role (String, required)
- memberProfile (String, required)

### Advisor Schema
- name (String, required)
- designation (String, required)
- profileUrl (String, required)

### Event Schema
- title (String, required)
- location (String, required)
- description (String, required)
- eventType (String, required)
- organizer (String, required)
- startTime (String, required)
- endTime (String)
- status (String, required)
- eventImage (String, required)

### Blog Schema
- title (String, required)
- description (String, required)
- image (String, required)
- timestamps (auto-generated)

### Review Schema
- userId (ObjectId, ref: User)
- reviewText (String, required)
- timestamps (auto-generated)

## Security Features

- **Password Hashing:** Bcrypt for secure password storage
- **JWT Authentication:** Token-based authentication system
- **Protected Routes:** Middleware for route protection
- **CORS Configuration:** Cross-origin resource sharing
- **Input Validation:** Schema-based validation
- **File Upload Security:** File type and size restrictions
- **Environment Variables:** Sensitive data protection

## Deployment

### Backend Deployment (Vercel)
The backend is configured for Vercel deployment with `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "Server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "Server.js"
    }
  ]
}
```

### Frontend & Dashboard Deployment
Both frontend and dashboard can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Development Commands

### Frontend & Dashboard
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

### Manual Testing
- Test all API endpoints using Postman or similar tools
- Verify authentication flows
- Check responsive design across devices
- Test file upload functionality
- Verify email notifications

### Performance Optimization
- Lazy loading for images
- Code splitting in React applications
- Database indexing for faster queries
- Caching strategies for static content
- Compression middleware for API responses

## Known Issues & Limitations

- Maximum file upload size: 10MB
- Email service requires SMTP configuration
- MongoDB connection required for all operations
- Real-time features not yet implemented

## Future Enhancements

- [ ] Real-time notifications using WebSockets
- [ ] Advanced search and filtering
- [ ] Social media integration
- [ ] Payment gateway for event registration
- [ ] Mobile application development
- [ ] Analytics dashboard with charts
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PWA implementation
- [ ] Automated testing suite

## Support

For issues, questions, or suggestions:
- Create an issue in the GitHub repository
- Contact the development team
- Check documentation for common solutions

## License

This project is proprietary software for the Technical Polytechnic Institute Computer Programming Club. All rights reserved.

## Acknowledgments

- Technical Polytechnic Institute for support
- All club members for feedback and testing
- Open-source community for amazing tools and libraries

---

**Developed with ❤️ by TPI-CPC Development Team**

*Last Updated: January 2025*