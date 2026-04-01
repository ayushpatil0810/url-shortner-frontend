# ShortLink Frontend

![ShortLink Preview](https://via.placeholder.com/1200x630/09090b/e4e4e7?text=ShortLink+-+Premium+URL+Shortener)

A stunning, highly-responsive, modern frontend for the ShortLink URL shortener platform.

## 🚀 Backend Infrastructure

**Important**: This repository is only the frontend application. 
The backend API (built with Node.js/Express) powers all the core URL shortening, analytics tracking, and authentication logic. 

**Find the backend repository here:**
👉 [https://github.com/ayushpatil0810/url-shortner-backend](https://github.com/ayushpatil0810/url-shortner-backend)

---

## ✨ Features

- **Premium Dark Aesthetic**: A meticulously crafted UI using deeply customized Tailwind CSS, translucent `backdrop-blur` glassmorphic cards, and ambient light sources for a state-of-the-art interface.
- **Dynamic Dashboard**: Full control over your links with instant feedback, link tracking displays, and real-time state synchronization via custom React hooks.
- **Authentication Flow**: Smooth, gorgeous login and register windows with integrated email verification warnings. 


## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Customized)
- **Icons**: [Hugeicons](https://hugeicons.com/)
- **State/Requests**: Axios with Custom Hooks

## 📦 Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/ayushpatil0810/url-shortner-frontend.git
cd url-shortner-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure Environment Variables**
Create a `.env.local` file in the root directory and define your API bases. Make sure it points to your locally running shortener backend!
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SHORT_URL_BASE=http://localhost:8000
```

4. **Start the development server**
```bash
npm run dev
```
Navigate to `http://localhost:3000` to magically see the platform in action.


## 🛡️ License

This project is open-source and available under the MIT License.
