import { useMusicStore } from "@/stores/useMusicStore";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
	const { stats, isLoading } = useMusicStore();
	
	// Add fallback for stats if it's undefined or properties are missing
	const totalSongs = stats?.totalSongs ?? 0;
	const totalAlbums = stats?.totalAlbums ?? 0;
	const totalArtists = stats?.totalArtists ?? 0;
	const totalUsers = stats?.totalUsers ?? 0;

	// If loading, show a simplified version
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="h-24 bg-zinc-800/50 rounded-lg animate-pulse"></div>
				))}
			</div>
		);
	}

	const statsData = [
		{
			icon: ListMusic,
			label: "Total Songs",
			value: totalSongs.toString(),
			bgColor: "bg-emerald-500/10",
			iconColor: "text-emerald-500",
		},
		{
			icon: Library,
			label: "Total Albums",
			value: totalAlbums.toString(),
			bgColor: "bg-violet-500/10",
			iconColor: "text-violet-500",
		},
		{
			icon: Users2,
			label: "Total Artists",
			value: totalArtists.toString(),
			bgColor: "bg-orange-500/10",
			iconColor: "text-orange-500",
		},
		{
			icon: PlayCircle,
			label: "Total Users",
			value: totalUsers.toLocaleString(),
			bgColor: "bg-sky-500/10",
			iconColor: "text-sky-500",
		},
	];

	try {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
				{statsData.map((stat) => (
					<StatsCard
						key={stat.label}
						icon={stat.icon}
						label={stat.label}
						value={stat.value}
						bgColor={stat.bgColor}
						iconColor={stat.iconColor}
					/>
				))}
			</div>
		);
	} catch (error) {
		console.error("Error rendering DashboardStats:", error);
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="h-24 bg-red-500/10 rounded-lg flex items-center justify-center text-center text-red-500">
						Failed to load stats
					</div>
				))}
			</div>
		);
	}
};
export default DashboardStats;
