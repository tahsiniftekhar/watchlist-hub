# WatchlistHub: Your Personal Movie Watchlist App

![WatchlistHub Demo Placeholder](https://via.placeholder.com/800x400?text=Demo+Video+Placeholder)

WatchlistHub is a modern web application for managing your personal movie watchlist. Built with React and Tailwind CSS.

## Tools & Tech Stack

- **React**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development and styling.
- **React Router DOM**: For declarative routing within the application.
- **Axios**: Promise-based HTTP client for API requests.
- **Lucide React**: Open-source icon library for clear and modern iconography.
- **TMDB API**: Public API for movie data.
- **Git + GitHub**: For version control and project hosting.

## Setup and Run Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/movie-watchlist.git
    cd movie-watchlist
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up TMDB API Key:**

    - Sign up for a free API key at [The Movie Database (TMDB)](https://www.themoviedb.org/).
    - Create a `.env` file in the project root (if it doesn't exist) and add your API key:
      ```
      VITE_TMDB_API_KEY=YOUR_API_KEY_HERE
      ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

5.  **Build for production:**
    ```bash
    npm run build
    ```

## Basic Documentation

- **Authentication**: A mock authentication system is used. You can log in with any email and password combination. The user session is stored in `localStorage`.
- **Watchlist Persistence**: The watchlist data is stored in `localStorage` under a user-specific key, ensuring each logged-in user has their unique watchlist.
- **Responsive Design**: The application utilizes Tailwind CSS breakpoints and flexible layouts to adapt to various screen sizes, from mobile phones to large desktops.

## Demo Video

[Google Drive Link to Demo Video - Coming Soon]
(https://drive.google.com/your-demo-video-link-here)

---

Feel free to explore the codebase and provide feedback!
