const URL = 'https://spotify-typescript.vercel.app';

function generateSiteMap(pages: { id: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${URL}</loc>
      </url>
      ${pages
        ?.map(({ id }) => {
          return `
            <url>
                <loc>${URL}/${id}</loc>
            </url>
            `;
        })
        .join('')}
   </urlset>
 `;
}

export async function GET() {
  const pages = [
    { id: 'artists' },
    { id: 'traks' },
    { id: 'playlists' },
    { id: 'albums' },
    { id: 'login' },
    { id: 'search' },
  ];
  const body = generateSiteMap(pages);

  return new Response(body, {
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
    status: 200,
  });
}
