 <div align="center">

<img src="https://raw.githubusercontent.com/ABiR994/booknook-client/Main/src/app/icon.svg" alt="BookNook Logo" width="90" />

# BookNook – A Small Online Library

### Add a book, borrow a book, return a book.

A small online library where readers can discover books, share their own collections, and borrow books from other members. Browse the library, explore different categories, manage your books, and keep track of everything you've borrowed.

<br />

<a href="https://booknook-mocha.vercel.app/">
  <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-15803d?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
</a>
<a href="https://github.com/ABiR994/booknook-client">
  <img src="https://img.shields.io/badge/Client%20Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Client Repository" />
</a>
<a href="https://github.com/ABiR994/booknook-server">
  <img src="https://img.shields.io/badge/Server%20Source-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Server Repository" />
</a>

<br />
<br />

<img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/shadcn%2Fui-Components-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
<img src="https://img.shields.io/badge/BetterAuth-Authentication-6C47FF?style=flat-square" alt="BetterAuth" />
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/Motion-Animations-FF4154?style=flat-square" alt="Motion" />
<img src="https://img.shields.io/badge/Swiper-Slider-6332F6?style=flat-square" alt="Swiper" />

</div>

---

## 📖 About the Project

**BookNook** is a small online library built around a simple idea: **Add a book, borrow a book, return a book.**

Readers can explore a shared collection of books, discover new arrivals, and browse titles across different categories. Registered users can contribute books to the library, manage their own listings, borrow books from other members, and return them when finished.

The application provides a complete book management experience with authentication, protected routes, database-backed CRUD operations, and a borrowing system.

BookNook is built with Next.js and TypeScript on the frontend, BetterAuth for authentication, and a separate Express.js REST API connected to MongoDB for book and borrowing data.

---

## 🔗 Links

- **Live Site:** [booknook-mocha.vercel.app](https://booknook-mocha.vercel.app/)
- **Client Repository:** [github.com/ABiR994/booknook-client](https://github.com/ABiR994/booknook-client)
- **Server Repository:** [github.com/ABiR994/booknook-server](https://github.com/ABiR994/booknook-server)

---

## ✨ Key Features

### 🏠 Interactive Home Page

The home page introduces the library with a responsive banner section and multiple slides featuring titles, descriptions, and Browse Books buttons.

Additional sections introduce the borrowing process and available book categories, helping visitors understand how the platform works.

The **New Arrivals** section dynamically displays the latest 6 books from the database, with each card showing:

- Book cover image
- Title and author
- Category
- View Details button

A See All Books button takes visitors to the complete library.

### 📚 All Books Library

Browse the complete collection of books shared by library members.

- Responsive card grid with 3 columns on desktop.
- Book cover, title, author, and category.
- View Details button for each book.
- Dynamically loaded data from the Express API.

### 🔍 Book Details

Each book has a dedicated details page displaying its information:

- Book cover and title.
- Author and category.
- Full description.
- Information about the member who added it.
- Borrow This Book action.

The borrowing action opens a confirmation modal with the logged-in user's information.

### ➕ Add New Books

Authenticated users can contribute books to the shared library through the Add Book page.

The form includes:

- Book title
- Author name
- Category selection (Fiction, Science, History, Kids, Others)
- Book image upload using ImgBB
- Short description
- User name and email (automatically populated and read-only)
- Total copies

After submission, the book is saved to MongoDB with its creation date and available copy information.

A success toast confirms the operation.

### 📖 My Books – Manage Your Collection

The My Books page displays only the books added by the currently authenticated user.

Users can:

- View their own book listings.
- Edit existing books through a prefilled edit modal.
- Update book information using a PATCH request.
- Delete books using a custom confirmation modal.
- See changes reflected in the interface after successful operations.

Ownership checks prevent users from modifying or deleting books added by other members.

### 🔄 Borrow and Return System

BookNook includes a borrowing system that connects readers with books shared by other members.

**Borrowing:**

- Open a book's details page.
- Click Borrow This Book.
- Review the borrowing confirmation modal.
- Confirm the borrowing operation.
- Save the borrowing record to the database.
- Automatically decrease the available copy count.

**Returning:**

- Open My Borrows.
- View borrowed books in a table.
- Check borrowing and return dates.
- Click Return Book to complete the return.
- Automatically increase the available copy count.

Additional safeguards include:

- Users cannot borrow the same book multiple times simultaneously.
- Books with zero available copies cannot be borrowed.
- Available copies are updated through MongoDB atomic operations.

### 🔐 Authentication with BetterAuth

Authentication is implemented using BetterAuth with the MongoDB adapter.

Supported authentication methods:

- Email and password registration.
- Email and password login.
- Google social login.

Registration collects the user's name, email, profile photo URL, and password.

Password validation requires:

- At least one uppercase letter.
- At least one lowercase letter.
- A minimum length of 6 characters.

After successful authentication, users are redirected to their intended destination or the home page.

Private routes are protected, and authentication state is maintained across page reloads.

### 👤 User Profile and Navigation

The responsive navbar adapts to the user's authentication state.

**For guests:**

- Login button.
- Register button.
- Public navigation links.

**For authenticated users:**

- Profile avatar.
- Dropdown menu with user information.
- My Profile option.
- Logout action.
- Access to private library features.

### 🌙 Dark and Light Theme

The application includes a theme-switching option, allowing users to switch between dark and light appearances.

Theme preferences are managed using next-themes.

### 🎨 Animations and Interactive UI

The interface uses Motion for smooth animations and transitions, creating a more engaging browsing experience.

Swiper powers the home page slider, while shadcn/ui provides reusable interface components and interactive dialogs.

### 🔔 Toasts, Loading States and 404

The application provides feedback throughout user interactions.

- Success and error toast notifications.
- Loading indicators while fetching data.
- Custom not-found page with a Back to Home button.
- Dynamic page titles across routes.
- Custom confirmation dialogs instead of browser alerts.

### 📱 Fully Responsive

The interface adapts to mobile phones, tablets, and desktop screens.

- Responsive navigation.
- Flexible book card grids.
- Consistent card dimensions.
- Mobile-friendly forms and dialogs.
- Horizontally scrollable tables on smaller screens.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| ⬛ Next.js 16 (App Router) | Routing, layouts, server rendering and dynamic routes |
| ⚛️ React 19 | UI components and interactive interfaces |
| 🔷 TypeScript | Type-safe components, API data and application logic |
| 🎨 Tailwind CSS 4 | Utility-first styling and responsive layouts |
| 🧩 shadcn/ui | Dialogs, dropdowns, avatars, cards, inputs, labels and buttons |
| 🔐 BetterAuth | Email/password and Google authentication |
| 🍃 MongoDB | Users, sessions, books and borrowing records |
| 🚀 Express.js | Backend REST API |
| 🎞️ Motion | UI animations and transitions |
| 🖼️ Swiper | Responsive home page slider |
| 🔔 Sonner | Toast notifications |
| 🎨 next-themes | Dark and light theme management |
| 🖼️ ImgBB | Book cover image hosting |
| ▲ Vercel | Application deployment |

---

## 🧭 Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page, banner, categories and new arrivals | Public |
| `/books` | Browse all available books | Public |
| `/books/[id]` | Individual book details | 🔒 Login required |
| `/add-book` | Add a new book to the library | 🔒 Login required |
| `/my-books` | Manage books added by the user | 🔒 Login required |
| `/my-borrows` | View and return borrowed books | 🔒 Login required |
| `/login` | User login | Public |
| `/register` | User registration | Public |
| `/my-profile` | User profile and account information | 🔒 Login required |

---

## 🔌 Backend API Integration

BookNook uses a separate Express.js REST API connected to MongoDB.

### API Endpoints Used

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/books` | Public | Retrieve all books |
| GET | `/books/:id` | Public | Retrieve a single book |
| POST | `/books` | Private | Add a new book |
| PATCH | `/books/:id` | Private | Update a book (owner only) |
| DELETE | `/books/:id` | Private | Delete a book (owner only) |
| POST | `/borrows` | Private | Borrow a book |
| GET | `/borrows` | Private | Retrieve the logged-in user's borrows |
| DELETE | `/borrows/:id` | Private | Return a borrowed book |

Private API requests include:

```http
Authorization: Bearer <token>
```

The backend validates JWTs using BetterAuth's JWKS endpoint before allowing protected operations.

### Database Collections

**Books**

Stores information about books contributed by library members:

- Title
- Author
- Category
- Image URL
- Description
- Total copies
- Available copies
- Added by (name and email)
- Creation date

**Borrows**

Stores borrowing information:

- Book ID
- Book title
- Book image
- User email
- Borrow date
- Return date

The backend handles copy recalculation and prevents duplicate active borrowing of the same book by a user.

---

## 📂 Project Structure

```text
booknook-client/
├── public/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── books/
│   │   ├── add-book/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   ├── my-profile/
│   │   │
│   │   ├── login/
│   │   ├── register/
│   │   │
│   │   └── api/
│   │       └── auth/
│   │           └── [...all]/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── books/
│   │   ├── auth/
│   │   └── profile/
│   │
│   └── lib/
│
├── .env.example
├── components.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A Google OAuth application for Google sign-in
- An [ImgBB API key](https://api.imgbb.com/) for book image uploads
- A running BookNook Express API server

### Installation

Clone the client repository:

```bash
git clone https://github.com/ABiR994/booknook-client.git
cd booknook-client
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Configure the environment variables, then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Fill in the required values in `.env.local`:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB` | MongoDB database name |
| `BETTER_AUTH_SECRET` | Secret used by BetterAuth |
| `BETTER_AUTH_URL` | Application URL (`http://localhost:3000` locally) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_API_URL` | Express backend URL |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for uploading book covers |

### Google OAuth Configuration

Create an OAuth client in the [Google Cloud Console](https://console.cloud.google.com/).

Register the following authorized redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

For production, register:

```text
https://<your-website-name>.vercel.app/api/auth/callback/google
```

Add the corresponding credentials to your environment variables.

### Running the Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run ESLint:

```bash
npm run lint
```

---

## ☁️ Deployment

The client application is deployed on **Vercel**.

When deploying your own copy:

1. Import the client repository into Vercel.
2. Add all required environment variables in the project settings.
3. Set `BETTER_AUTH_URL` to your production frontend URL.
4. Set `NEXT_PUBLIC_API_URL` to your deployed Express API URL.
5. Configure the production Google OAuth callback URL.
6. Ensure the backend allows requests from your frontend origin through CORS.
7. Configure MongoDB Atlas network access for the deployed application.
8. Redeploy after changing environment variables.

The Express backend is maintained separately in the [booknook-server](https://github.com/ABiR994/booknook-server) repository.

---

## 👨‍💻 Author

**Salem Nur Abir**

CSE Student | Aspiring Software Engineer

<a href="https://github.com/ABiR994">
  <img src="https://img.shields.io/badge/GitHub-ABiR994-181717?style=for-the-badge&logo=github" alt="GitHub" />
</a>
<a href="https://linkedin.com/in/salem-nur-abir/">
  <img src="https://img.shields.io/badge/LinkedIn-Salem%20Nur%20Abir-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://abir994.pro.bd/">
  <img src="https://img.shields.io/badge/Portfolio-Visit%20Website-15803d?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
</a>

