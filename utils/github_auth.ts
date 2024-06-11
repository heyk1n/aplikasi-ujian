import { OAuthApp } from "@octokit/oauth-app";

const app = new OAuthApp({
	clientId: Deno.env.get("CLIENT_ID")!,
	clientSecret: Deno.env.get("CLIENT_SECRET")!,
	clientType: "oauth-app",
});

export async function resolveAuthUser(code: string, state: string) {
	return await app.getUserOctokit({ code, state });
}

export function generateAuthorizationUrl() {
	return app.getWebFlowAuthorizationUrl({
		scopes: ["read:user"],
		state: Math.random().toString(36).slice(2),
		redirectUrl: Deno.env.get("REDIRECT_URL")!,
	});
}
