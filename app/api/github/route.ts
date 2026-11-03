import { NextResponse } from 'next/server';

// Evaluated on every request (cached by the CDN for an hour) so a failed build-time call is never baked in.
export const dynamic = 'force-dynamic';

const USER = 'manmohansingh9562579-spec';

type GhRepo = { name: string; description: string | null; language: string | null; html_url: string; fork: boolean; pushed_at: string; stargazers_count: number };
type GhEvent = { type: string; repo: { name: string }; created_at: string; payload: { size?: number } };

export async function GET() {
  // The token (optional) is read on the server only and is never sent to the browser.
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'man-mohan-portfolio' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [repoRes, eventRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers }),
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`, { headers }),
    ]);
    if (!repoRes.ok) throw new Error(`GitHub repos responded ${repoRes.status}`);

    const all = (await repoRes.json()) as GhRepo[];
    const repos = all.filter((r) => !r.fork).slice(0, 8).map((r) => ({ name: r.name, description: r.description, language: r.language, url: r.html_url, pushedAt: r.pushed_at, stars: r.stargazers_count }));

    const languages: Record<string, number> = {};
    for (const r of all) if (!r.fork && r.language) languages[r.language] = (languages[r.language] ?? 0) + 1;

    const events = eventRes.ok
      ? ((await eventRes.json()) as GhEvent[]).filter((e) => e.type === 'PushEvent').slice(0, 6).map((e) => ({ repo: e.repo.name.split('/').pop() ?? e.repo.name, commits: e.payload.size ?? 0, date: e.created_at }))
      : [];

    return NextResponse.json({ ok: true, repos, languages, events }, { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
