// OAuth bridge for Decap CMS GitHub login on Cloudflare Pages.
// Based on https://github.com/i40west/netlify-cms-cloudflare-pages (BSD-3-Clause).
// Route: GET /api/auth -> redirects to GitHub OAuth.

export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
    } = context;

    const client_id = env.GITHUB_CLIENT_ID;

    try {
        const url = new URL(request.url);
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        redirectUrl.searchParams.set(
            'state',
            crypto.getRandomValues(new Uint8Array(12)).join(''),
        );
        return Response.redirect(redirectUrl.href, 301);

    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
        });
    }
}
