import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

// Add error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
	console.error('Unhandled promise rejection:', event.reason);
});

// Add error handler for uncaught errors
window.addEventListener('error', (event) => {
	console.error('Uncaught error:', event.error);
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
			<AuthProvider>
				<BrowserRouter>
					<App />
					<Toaster position="top-center" />
				</BrowserRouter>
			</AuthProvider>
		</ClerkProvider>
	</StrictMode>
);
