# Restaurant Ordering System

A modern, responsive restaurant ordering web application built with React, TypeScript, and Tailwind CSS.

## Project Description

This is a full-featured restaurant ordering system that allows customers to browse menu items, add them to cart, and place orders. The system includes an admin dashboard for managing menu items and viewing orders.

## Features

- Browse restaurant menu by categories (Burgers, Pizzas, Pasta, Salads, Desserts, Beverages)
- Add items to cart and manage quantities
- User authentication (Login/Register)
- Order tracking
- Admin dashboard for menu management
- Responsive design for mobile and desktop
- Interactive map showing restaurant location in Beirut

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Map Integration**: Mapbox GL
- **Build Tool**: Vite
- **UI Components**: Custom components with Radix UI primitives

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-ordering-system
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Mapbox token:
```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Start the development server:
```bash
npm run dev
# or
bun run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
├── contexts/        # React Context providers (Auth, Cart)
├── data/           # Static data (menu items)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
│   ├── admin/      # Admin dashboard pages
│   └── ...         # Other pages
└── main.tsx        # Application entry point
```

## Pages

1. **Home** - Landing page with hero section and featured items
2. **Menu** - Browse all menu items by category
3. **Cart** - View and manage cart items
4. **Orders** - Track order history
5. **About** - Information about the restaurant
6. **Services** - Restaurant services and features
7. **Contact** - Contact form and location map
8. **Login/Register** - User authentication
9. **Admin Dashboard** - Manage menu items (admin only)

## Admin Credentials

Use the admin dashboard to manage menu items and view orders.

## Deployment

### GitHub Pages
```bash
npm run build
# Deploy the dist folder to GitHub Pages
```

### Vercel
1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

## Screenshots

[Add screenshots of your application here]

## License

This project is developed as part of a web development course assignment.

## Contributors

[Add your name(s) here]
