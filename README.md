# Draftly

A modern, full-stack web application built with **React** for creating, editing, and sharing blog posts.  
**Draftly** offers a smooth writing experience with an elegant UI, secure authentication, and Appwrite-powered backend — all wrapped in a refreshing emerald theme.

## Features

- **User Authentication** – Secure login and registration via Appwrite.
- **Post Management** – Create, edit, view, and delete your blog posts with ease.
- **Responsive Design** – Built with Tailwind CSS for a beautiful, mobile-first experience.
- **State Management** – Redux Toolkit for predictable and efficient state handling.
- **Protected Routes** – Role-based and auth-based navigation with React Router.
- **Appwrite Backend** – Cloud-based database, authentication, and file storage.
- **Modern UI** – Emerald-themed gradients and soft transitions for a clean look.

## 🧱 Tech Stack

| Category             | Technology                |
| -------------------- | ------------------------- |
| **Frontend**         | React 19 (Vite)           |
| **Styling**          | Tailwind CSS              |
| **State Management** | Redux Toolkit             |
| **Routing**          | React Router DOM          |
| **Backend (BaaS)**   | Appwrite                  |
| **Icons**            | Lucide React, React Icons |
| **Forms**            | React Hook Form           |
| **Linting**          | ESLint                    |
| **Deployment**       | Vercel                    |

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UmarKhan-codeer/Draftly.git
   cd scroll
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Appwrite configuration:

   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Builds the project for production
- `npm run lint` - Runs ESLint for code linting
- `npm run preview` - Previews the production build locally

## Project Structure

```
src/
├── backend/          # Appwrite configurations and API services
├── components/       # Reusable UI components
├── features/         # Redux slices and state logic
├── pages/            # Route-based page components
├── store/            # Redux store setup
├── assets/           # Images, icons, and static files
└── conf/             # Configuration and constants

```

## 🚀 Live Demo

👉 [Live Demo Here](#)

## 📸 Preview

![Draftly Screenshot](./public/homepage.png)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a new Pull Request

## 🧑‍💻 About the Developer

Built with ☕, logic, and a love for clean UI by [**Umer Javed**](https://www.linkedin.com/in/umerrjaved/)  
Check out more of my work on my [**Portfolio**](https://portfolio-umer-pro.vercel.app/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
