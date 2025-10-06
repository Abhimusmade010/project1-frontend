# Hardware Complaint Management System - Frontend

A React-based frontend for the Hardware Complaint Management System designed for PICT (Pune Institute of Computer Technology).

## Features

- **Modern UI Design**: Clean, responsive design matching the provided mockups
- **Complaint Submission**: User-friendly form for submitting hardware complaints
- **Admin Authentication**: Secure admin login system
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Validation**: Form validation with helpful error messages

## Design Implementation

The frontend implements the exact design shown in the provided images:

### Landing Page
- Header with PICT logo and navigation
- Hero section with system title and call-to-action button
- Features section with three feature cards (pink, purple, green icons)

### Complaint Form
- Clean form design with required field indicators
- Email address, department, room number, and complaint description fields
- Form validation with minimum character requirements
- Success/error message handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3001`

### Building for Production

To build the application for production:
```bash
npm run build
```

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── HomePage.js
│   │   ├── ComplaintForm.js
│   │   └── AdminLogin.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## API Integration

The frontend connects to the backend API running on `http://localhost:3000`:

- **Submit Complaint**: `POST /user/submit`
- **Admin Login**: `POST /admin/login`
- **Health Check**: `GET /health`

## Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **CSS3**: Custom styling with responsive design
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Development

The application uses:
- **Proxy**: Configured to forward API requests to the backend
- **Hot Reloading**: Automatic page refresh during development
- **Error Boundaries**: Graceful error handling
- **Form Validation**: Client-side validation with helpful messages
