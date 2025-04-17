import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken, userId, isSignedIn } = useAuth();
	const [loading, setLoading] = useState(true);
	const { checkAdminStatus, reset: resetAuthStore } = useAuthStore();
	const { initSocket, disconnectSocket } = useChatStore();
	const [error, setError] = useState<string | null>(null);

	// Initial auth setup
	useEffect(() => {
		const initAuth = async () => {
			setError(null);
			try {
				if (!isSignedIn) {
					setLoading(false);
					return;
				}
				
				// Get a fresh token
				const token = await getToken({skipCache: true});
				
				// Set the token in axios
				updateApiToken(token);
				
				if (token) {
					try {
						await checkAdminStatus();
						// init socket
						if (userId) initSocket(userId);
					} catch (adminError: any) {
						console.error("Error checking admin status:", adminError);
						// Don't treat admin check failures as fatal errors
						resetAuthStore();
					}
				}
			} catch (error: any) {
				updateApiToken(null);
				console.error("Error in auth provider:", error);
				setError("Authentication error. Please try again later.");
				toast.error("Authentication error");
			} finally {
				setLoading(false);
			}
		};

		initAuth();

		// clean up
		return () => disconnectSocket();
	}, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket, resetAuthStore, isSignedIn]);

	// Set up a periodic token refresh (every 10 minutes)
	useEffect(() => {
		if (!isSignedIn) return;
		
		// Function to refresh the token
		const refreshToken = async () => {
			try {
				const token = await getToken({skipCache: true});
				updateApiToken(token);
				console.log("Auth token refreshed");
			} catch (error) {
				console.error("Token refresh error:", error);
			}
		};
		
		// Set up periodic refresh
		const refreshInterval = setInterval(refreshToken, 10 * 60 * 1000); // 10 minutes
		
		return () => {
			clearInterval(refreshInterval);
		};
	}, [getToken, isSignedIn]);
	
	if (loading) {
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);
	}

	if (error) {
		return (
			<div className='h-screen w-full flex flex-col gap-4 items-center justify-center p-4 text-center'>
				<p className='text-red-500'>{error}</p>
				<button
					onClick={() => window.location.reload()}
					className='px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition'
				>
					Retry
				</button>
			</div>
		);
	}

	return <>{children}</>;
};
export default AuthProvider;
