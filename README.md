# Campus Connect

A comprehensive campus management system built with React, TypeScript, and modern web technologies.

## Features

- **Multi-Role Dashboard**: Student, Faculty, Librarian, and Canteen management interfaces
- **Library Management**: Book catalog, issue/return system, QR code integration
- **Canteen Pre-Ordering**: Digital menu, shopping cart, order tracking
- **Academic Hub**: Study materials, assignments, study groups, forums
- **Campus Services**: Events, facilities booking, announcements
- **Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Mobile-first approach with dual themes

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **Authentication**: Clerk
- **State Management**: TanStack React Query, React Context
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd campus-connect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_MONGODB_URI=your_mongodb_connection_string
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── lib/                # Utility functions
└── ui/                 # shadcn/ui components
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.
