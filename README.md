
# Arcodify Storefront & Admin 

Welcome to the Arcodify Storefront, a simple e-commerce project.

-----

## Tech Stack

This project is a great example of a modern, well-structured frontend application.

  - **nextjs**
  - **typescript**
  - **tenstack query**
  - **zustand**
  - **shadcnui**
  - **tailwindcss**
  - **react-hook-form**
  - **zod**

-----

## Key Features

### For Shoppers (Public Site)

  - **Storefront (`/`)**: Browse products in a clean grid layout.
  - **Products List (`/products`)**: Find exactly what you're looking for with search, filters, and pagination.
  - **Product Details (`/product/[id]`)**: See full product info and add items to your cart.
  - **Shopping Cart**: A slick floating cart button lets you view your items and head to a mock checkout.

### For Admins (Back Office)

  - **Secure Login & Signup**: Mock authentication using a token stored in your browser's local storage.
  - **Dashboard**: Manage products and users with dedicated pages for each.
  - **CRUD Operations**: Add and remove products (all changes are mocked and stay local to your browser).

-----



## Non-Functional Goodies

Beyond the main features, I focused on creating a great user and developer experience:

  - **Modular Code**: Clean, well-organized, and typed components for easy maintenance.
  - **No Prop Drilling**: State is managed efficiently using Zustand stores.
  - **Error Handling**: Data fetching errors are handled gracefully.
  - **Sleek UI/UX**: Enjoy fast loading with skeleton loaders.

-----

## How to Run Locally

Get the project up and running in a few simple steps.

1.  **Clone the repository**:

    ```bash
    git clone <repo-url>
    cd <project-folder>
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn
    ```

3.  **Start the development server**:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

-----

## Project Structure Walkthrough

Here’s a quick overview of the key folders to help you navigate the codebase:

```
/app              # Next.js routes
  /product/[id]   # The dynamic product detail page
  /dashboard      # The admin back office routes
/components       # Reusable UI components (like Navbar, Card, etc.)
/hooks            # Custom React hooks
/store            # The Zustand stores for state management
/types            # All TypeScript type definitions
/utils            # Helper functions for things like authentication and API calls
```



