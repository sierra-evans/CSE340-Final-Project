# Meadow Market

## Project Description
Meadow Market is a full-stack e-commerce marketplace web application inspired by platforms like Etsy. It allows independent sellers to list and manage their products, while buyers can browse items, add them to a shopping cart, and place orders. Administrators oversee the platform by approving seller products, moderating content, and managing users.

The purpose of this project is to demonstrate a strong understanding of backend web development concepts, including database design, authentication and authorization, server-side rendering, and multi-stage workflows.

---

## Target Users
- Buyers looking to purchase unique products from independent sellers
- Sellers who want to list and sell their own handmade or specialty items
- Administrators who manage and moderate the platform

---

### User Roles
- **Admin**
  - Manage users and roles  
  - Approve or reject seller product listings  
  - Moderate reviews and site content  
  - View and manage all orders  

- **Seller**
  - Create, edit, and delete product listings  
  - Manage inventory  
  - View and update order statuses for their products  
  - Track sales  

- **Buyer**
  - Browse products  
  - Add items to cart  
  - Checkout and place orders  
  - View order history  
  - Leave reviews  

---

## Key Functionality
- Session-based user authentication and role-based authorization  
- Product listing and approval workflow  
- Shopping cart and checkout system  
- Order tracking with a multi-stage workflow  
- Admin dashboard for site and user management  
- Server-side rendering using EJS templates  
- PostgreSQL relational database with normalized schema  

---

## Multi-Stage Workflows

### Product Approval Workflow
submitted → under review → approved/rejected

### Order Lifecycle
cart → checkout → order placed → processing → shipped → delivered → completed


Users can track the current status of their orders, and sellers can update order progress. Admins can intervene when necessary.

---

## Technology Stack
- Node.js  
- Express.js  
- EJS (Server-Side Rendering)  
- PostgreSQL  
- express-session  
- bcrypt  
- Render (Deployment)  

---

## Planned Database Tables
- users  
- roles  
- products  
- categories  
- orders  
- order_items  
- cart_items  
- reviews  

---

## Project Status
This project is currently in the planning and initial development phase.