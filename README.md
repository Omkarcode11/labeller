# Photo Gallery View

This is a simple photo gallery project built using **React** with **Vite** as the bundler and **Pexels API** for fetching images based on various categories. The application allows users to browse images by category and navigate to a detailed view for each category. Clicking on a category adds the category to the search filters and redirects the user to a filtered view.

## Features

- Browse multiple image categories (e.g., Nature, Cars, Technology, etc.)
- Fetch images dynamically from the **Pexels API**
- Display 5 photos for each category
- Click on a category to filter and view detailed results
- Use of **React Router** for smooth navigation between the gallery and filtered views

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Vite](https://vitejs.dev/) (already configured in the project)
- [Pexels API key](https://www.pexels.com/api/) (already included in the project)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**

   Use `npm` to install the project dependencies:

   ```bash

   # OR using npm
   npm install
   ```

3. **Start the development server:**

   You can run the project locally using the following command:

   ```bash
   
   # OR using npm
   npm run dev
   
   ```

   After running this command, Vite will start the development server. You can open the project by visiting `http://localhost:5173` in your browser.

### Project Structure

```
├── src
│   ├── components
│   │   ├── ClusterView.tsx        # Main component for gallery view
│   │   └── FileView.tsx           # Component for filtered view based on category
│   ├── App.tsx                    # Main app file with routing
│   └── main.tsx                   # Entry point for the React app
├── public                         # Public folder for static assets
├── index.html                     # Main HTML file
├── vite.config.ts                 # Vite configuration
└── README.md                      # This README file
```

### How it Works

1. **ClusterView Component**: 
   - This component is responsible for displaying the categories of images.
   - It uses the Pexels API to fetch 5 images for each category.
   - Users can click on any category to add it to the search filter and view more images related to that category.

2. **FileView Component**:
   - Once a category is clicked, the user is redirected to this view, where filtered images are displayed based on the selected category.

3. **Pexels API**:
   - I have **intentionally included the API key** in this project so you can easily run it without needing to generate your own API key.

4. **Routing**:
   - The project uses **React Router** for navigation between the main gallery view and the filtered file view.

### Example of the Main Cluster View

This is how the gallery is displayed, with multiple categories arranged in a grid:

```
Nature      Cars        Technology
Animals     Sports      People
Travel      Architecture   Food
```

Each category will display 5 photos fetched from the Pexels API.

### Pexels API Key

The **Pexels API key** is already included in the project, so you **don’t need to generate a new API key**. It is securely used in the `ClusterView.tsx` component to fetch the images for each category.

### Technologies Used

- **React**: Frontend UI library
- **Vite**: Fast build tool for frontend development
- **Axios**: HTTP client for making API requests
- **Pexels API**: Used for fetching category-based photos
- **React Router**: For handling navigation and routing between components

### Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Starts the development server.


