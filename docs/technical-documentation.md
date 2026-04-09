# Technical Documentation

## Overview

This portfolio website was developed using HTML, CSS, and JavaScript.  
Assignment 3 extends the previous version by introducing advanced features such as API integration, complex application logic, state management, and performance optimization.

## Implemented Features

### 1. Dynamic Project Rendering
Projects are stored in a JavaScript array and rendered dynamically into the Projects section.  
This allows easy updates and enables integration with external data sources.

### 2. GitHub API Integration
The application connects to the GitHub API to fetch repositories dynamically.  
The fetched data is converted into project objects and merged with local projects, ensuring the portfolio remains up to date.

### 3. Advanced Filtering and Sorting
Users can filter projects by type and difficulty level (beginner/advanced).  
Sorting options allow projects to be arranged alphabetically (A–Z or Z–A).  
This feature demonstrates multi-step logic and conditional data processing.

### 4. Live Project Search (Optimized)
A search input allows users to filter projects in real time.  
Debouncing is applied to delay execution, improving performance by reducing unnecessary function calls.

### 5. Theme Persistence with localStorage
The website supports light and dark mode.  
The selected theme is stored in `localStorage`, ensuring the user’s preference is maintained after page reload.

### 6. State Management Features
Additional state-based features include:
- Storing and displaying the user’s name using `localStorage`
- Toggling visibility of the projects section
These features demonstrate dynamic UI updates based on user interaction.

### 7. Contact Form Validation
The contact form validates:
- Required fields (name, email, message)
- Email format
- Minimum input length

Error messages are displayed below each field, and successful submission provides user feedback.

### 8. Visitor Timer
A timer tracks how long the user has been on the website and updates every second.  
This demonstrates continuous state updates and dynamic UI behavior.

### 9. Responsive Mobile Menu
The navigation menu adapts to smaller screens using a toggle button and responsive layout.

### 10. Feedback and Error Handling
The application provides feedback in multiple scenarios:
- Displays a message if no projects match the search or filters
- Shows an error message if the GitHub API fails
- Provides validation feedback in the contact form

## CSS and User Experience Improvements

The CSS includes:
- Responsive layout using media queries
- Consistent styling using CSS variables
- Smooth transitions and hover effects
- Structured spacing and layout for readability
- Styled form inputs, buttons, and dropdown controls

## Performance Optimization

Performance improvements include:
- Debouncing search input to reduce unnecessary processing
- Efficient DOM updates using dynamic rendering
- Avoiding repeated or redundant code
- Lightweight design with minimal external dependencies

## Files Used

- `index.html`
- `css/styles.css`
- `js/script.js`