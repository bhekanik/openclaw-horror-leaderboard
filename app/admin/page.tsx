"use client";

import { useMutation, useQuery } from "convex/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";

export default function AdminPage() {
	const currentUser = useQuery(api.users.currentUser);
	const stats = useQuery(api.admin.getStats);
	const pendingReports = useQuery(api.reports.listPending);
	const reviewReport = useMutation(api.admin.reviewReport);

	if (currentUser === undefined) {
		return <p className="text-center py-12 text-muted-foreground">Loading...</p>;
	}

	if (!currentUser?.isAdmin) {
		return (
			<div className="text-center py-12">
				<h1 className="text-3xl font-bold font-display">Access Denied</h1>
				<p className="text-muted-foreground mt-2">You do not have admin privileges.</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>

			{/* Stats */}
			<div className="grid grid-cols-2 gap-4 max-w-md">
				<Card>
					<CardContent className="text-center py-4">
						<div className="text-2xl font-bold">{stats?.pendingReportCount ?? 0}</div>
						<div className="text-sm text-muted-foreground">Pending Reports</div>
					</CardContent>
				</Card>
			</div>

			{/* Report Queue */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold font-display">Report Queue</h2>
				{!pendingReports || pendingReports.length === 0 ? (
					<p className="text-muted-foreground">No pending reports.</p>
				) : (
					<div className="space-y-3">
						{pendingReports.map((report) => (
							<Card key={report._id}>
								<CardContent className="py-4 flex items-center justify-between">
									<div>
										<Badge variant="secondary">{report.reason}</Badge>
										<span className="text-sm text-muted-foreground ml-2">
											{report.storyId ? "Story" : "Comment"} report
										</span>
									</div>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => reviewReport({ reportId: report._id, status: "reviewed" })}
										>
											Dismiss
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => reviewReport({ reportId: report._id, status: "actioned" })}
										>
											Action
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
