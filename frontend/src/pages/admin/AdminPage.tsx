import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { Loader2, Music, Album } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "./components/Header";
import AddSongDialog from "./components/AddSongDialog";
import AddAlbumDialog from "./components/AddAlbumDialog";

// Stable admin page with incremental functionality
const AdminPage: React.FC = () => {
	const { isAdmin, isLoading } = useAuthStore();
	const { 
		fetchStats, 
		fetchSongs, 
		fetchAlbums, 
		songs, 
		albums, 
		stats, 
		isLoading: dataLoading,
		deleteSong,
		deleteAlbum
	} = useMusicStore();
	
	const [activeTab, setActiveTab] = useState("songs");
	const [loading, setLoading] = useState(true);

	// Safely load data in sequence
	useEffect(() => {
		let mounted = true;
		const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
		
		async function loadData() {
			try {
				// Load stats
				await fetchStats().catch(e => console.error("Stats error:", e));
				if (!mounted) return;
				
				// Small delay between requests
				await delay(100);
				
				// Load songs
				await fetchSongs().catch(e => console.error("Songs error:", e));
				if (!mounted) return;
				
				// Small delay between requests
				await delay(100);
				
				// Load albums
				await fetchAlbums().catch(e => console.error("Albums error:", e));
			} catch (error) {
				console.error("Data loading error:", error);
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}
		
		loadData();
		
		return () => {
			mounted = false;
		};
	}, [fetchStats, fetchSongs, fetchAlbums]);
	
	// Show loading state
	if (isLoading || dataLoading || loading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 flex items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
					<p className="text-zinc-400">Loading admin dashboard...</p>
				</div>
			</div>
		);
	}
	
	// Unauthorized state
	if (!isAdmin) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 flex items-center justify-center">
				<div className="p-6 bg-zinc-800/50 rounded-lg text-center">
					<h2 className="text-xl mb-2">Unauthorized</h2>
					<p className="text-zinc-400">You don't have access to the admin panel.</p>
				</div>
			</div>
		);
	}
	
	// Stats row with actual data
	const statsData = [
		{ label: "Total Songs", value: stats?.totalSongs?.toString() || "0", color: "bg-emerald-500/10 text-emerald-500" },
		{ label: "Total Albums", value: stats?.totalAlbums?.toString() || "0", color: "bg-violet-500/10 text-violet-500" },
		{ label: "Total Artists", value: stats?.totalArtists?.toString() || "0", color: "bg-orange-500/10 text-orange-500" },
		{ label: "Total Users", value: stats?.totalUsers?.toString() || "0", color: "bg-sky-500/10 text-sky-500" }
	];
	
	// Songs content
	const SongsContent = () => (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Music className="size-5 text-emerald-500" />
							Songs Library
						</CardTitle>
						<CardDescription>Manage your music tracks</CardDescription>
					</div>
					<AddSongDialog />
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-zinc-800/50">
							<TableHead className="w-[50px]"></TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Artist</TableHead>
							<TableHead>Release Date</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{songs?.map((song) => (
							<TableRow key={song._id} className="hover:bg-zinc-800/50">
								<TableCell>
									<img src={song.imageUrl} alt={song.title} className="size-10 rounded object-cover" />
								</TableCell>
								<TableCell className="font-medium">{song.title}</TableCell>
								<TableCell>{song.artist}</TableCell>
								<TableCell>
									{song.createdAt?.split("T")[0] || "N/A"}
								</TableCell>
								<TableCell className="text-right">
									<Button
										variant="ghost"
										size="sm"
										className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
										onClick={() => deleteSong(song._id)}
									>
										<Loader2 className="size-4 mr-2 animate-spin opacity-0" />
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
						{(!songs || songs.length === 0) && (
							<TableRow>
								<TableCell colSpan={5} className="text-center py-4 text-zinc-400">
									No songs found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
	
	// Albums content
	const AlbumsContent = () => (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Album className="size-5 text-violet-500" />
							Albums Library
						</CardTitle>
						<CardDescription>Manage your music albums</CardDescription>
					</div>
					<AddAlbumDialog />
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-zinc-800/50">
							<TableHead className="w-[50px]"></TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Artist</TableHead>
							<TableHead>Release Year</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{albums?.map((album) => (
							<TableRow key={album._id} className="hover:bg-zinc-800/50">
								<TableCell>
									<img src={album.imageUrl} alt={album.title} className="size-10 rounded object-cover" />
								</TableCell>
								<TableCell className="font-medium">{album.title}</TableCell>
								<TableCell>{album.artist}</TableCell>
								<TableCell>{album.releaseYear}</TableCell>
								<TableCell className="text-right">
									<Button
										variant="ghost"
										size="sm"
										className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
										onClick={() => deleteAlbum(album._id)}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
						{(!albums || albums.length === 0) && (
							<TableRow>
								<TableCell colSpan={5} className="text-center py-4 text-zinc-400">
									No albums found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
	
	// Main admin dashboard
	return (
		<div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-6 md:p-8">
			<Header />
			
			{/* Stats dashboard */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				{statsData.map((stat, index) => (
					<div key={index} className={`p-4 rounded-lg ${stat.color.split(' ')[0]}`}>
						<p className={`text-sm ${stat.color.split(' ')[1]}`}>{stat.label}</p>
						<p className="text-xl font-bold">{stat.value}</p>
					</div>
				))}
			</div>
			
			{/* Tab navigation */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
				<TabsList className="p-1 bg-zinc-800/50">
					<TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
						<Music className="mr-2 size-4" />
						Songs
					</TabsTrigger>
					<TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
						<Album className="mr-2 size-4" />
						Albums
					</TabsTrigger>
				</TabsList>
				
				<TabsContent value="songs">
					<SongsContent />
				</TabsContent>
				
				<TabsContent value="albums">
					<AlbumsContent />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AdminPage;
