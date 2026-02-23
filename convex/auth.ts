import GitHub from "@auth/core/providers/github";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [GitHub, Password],
	callbacks: {
		async afterUserCreatedOrUpdated(ctx, { userId, existingUserId }) {
			if (existingUserId) return; // Only initialize on first creation
			await ctx.db.patch(userId, {
				karma: 0,
				storiesCount: 0,
				totalHorrorScore: 0,
				badges: [],
				isBanned: false,
				isAdmin: false,
			});
		},
	},
});
