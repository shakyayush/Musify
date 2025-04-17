import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
});

// Add request interceptor to ensure token is refreshed before each request
axiosInstance.interceptors.request.use(
	async (config) => {
		try {
			// Get clerk's auth object from window
			const Clerk = (window as any).Clerk;
			
			if (Clerk && Clerk.session) {
				// Request a fresh token before each API call
				const token = await Clerk.session.getToken();
				
				// Set the Authorization header with the fresh token
				config.headers.Authorization = `Bearer ${token}`;
				
				console.log("Token refreshed for request");
			}
		} catch (error) {
			console.error("Error refreshing token:", error);
		}
		
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		// If we get a 401 Unauthorized error
		if (error.response && error.response.status === 401) {
			console.log("Unauthorized request - redirecting to login");
			
			// You could trigger a sign out or redirect here if needed
			// window.location.href = "/"; 
		}
		
		return Promise.reject(error);
	}
);
