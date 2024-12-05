# 🏡 EstateLink - Full-Stack Real Estate Marketplace

## 🌟 Project Overview
**EstateLink** is a comprehensive full-stack real estate application designed to simplify property listing and discovery. Built using the MERN (MongoDB, Express, React, Node.js) stack, the platform empowers users to seamlessly create, manage, and explore property listings with a modern, intuitive interface.

## 🎥 Tutorial Credit

This project was developed following the tutorial by **React & Next js Projects with Sahand**:

- **Video Tutorial**: [React & Next js Projects with Sahand](https://youtu.be/VAaUy_Moivw?si=an8GTcDYqrjuzRwI)
- **YouTube Channel**: React & Next js Projects with Sahand
- **Special Thanks:** 🙏 Sahand for providing an excellent learning resource

> **Note:** While the project is based on the tutorial, some modifications and personal touches have been added to make it unique.

## ✨ Key Features

### 🔐 Authentication & Security
- Secure user registration and login
- JWT-based authentication
- Password encryption with Bcrypt.js
- Protected routes for authenticated users

### 📋 Listing Management
- Create detailed property listings
- Full CRUD functionality for listings
- Support for sale and rental properties
- Rich property information input

### 🔍 Search & Discovery
- Advanced property search functionality
- Filter properties by:
  - Price range
  - Property type
  - Sale/Rent status
  - Features

### 🗺️ Enhanced Visualization
- Interactive map integration
- Geolocation for property listings
- Visual property exploration

### 📱 Responsive Design
- Dark mode and Light mode support
- Mobile-friendly interface
- Consistent user experience across devices
- Tailwind CSS for adaptive styling

## 🚀 Tech Stack

### Frontend Technologies
- **React** (v18+)
- **Vite** for rapid development
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Hook Form** for form handling
- **React-Leaflet** for interactive maps
- **React Toastify** for notifications

### Backend Technologies
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt.js** for password hashing

### Additional Integrations
- **Firebase** for authentication & image storage
- **Leaflet.js** for mapping

## 🛠️ Quick Setup Guide

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Git
- Firebase project (for authentication & image storage)

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/lahiruanushka/mern-estate-app.git
cd mern-estate-app
```

2. **Backend Configuration**
```bash
cd backend
npm install
```

3. **Frontend Configuration**
```bash
cd ../client
npm install
```

4. **Environment Setup**
Create `.env` files in both `backend` and `client` directories:

Backend `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Client `.env`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

5. **Run the Application**
```bash
# In backend directory
npm run dev

# In client directory
npm run dev
```

## 📂 Project Structure
```
mern-estate-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   └── utils/
    └── vite.config.js
```

## 🚧 Planned Improvements
- [ ] Implement advanced search filters
- [ ] Add user review system
- [ ] Integrate payment gateway
- [ ] Enhance mobile responsiveness
- [ ] Implement email notifications
- [ ] Add property recommendation system
- [ ] Implement real-time chat for property inquiries

## 📸 Application Screenshots

### 🏠 Homepage
![Homepage](/screenshots/home-page.png)

### 🔑 Login Page
![Login Page](/screenshots/login-page.png)

### 📋 Create Listing
![Create Listing](/screenshots/create-listing-page.png)

### 📄 My Listings
![My Listings](/screenshots/my-listings-page.png)

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 🧪 Code of Conduct
- Follow proper coding standards
- Write clean, readable code
- Add comments and documentation
- Be respectful in discussions and reviews

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- **Email**: [lahiruanushkaofficial@gmail.com](mailto:lahiruanushkaofficial@gmail.com)
- **LinkedIn**: [Lahiru Anushka](https://www.linkedin.com/in/lahiruanushka/)

## 🙏 Acknowledgments
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Leaflet.js](https://leafletjs.com/)
