import { NextResponse, type NextRequest } from "next/server";

function productionHost(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw || raw.includes("vercel.app")) return null;
  try {
    return new URL(raw).host;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const prodHost = productionHost();
  const isProdDeployment = process.env.VERCEL_ENV === "production";

  // Apex is canonical: www → non-www (once the real domain is attached).
  if (
    isProdDeployment &&
    prodHost &&
    host === `www.${prodHost}`
  ) {
    const url = req.nextUrl.clone();
    url.host = prodHost;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  const res = NextResponse.next();

  // Noindex any host that is not the configured production domain
  // (covers *.vercel.app aliases even when VERCEL_ENV=production).
  if (!isProdDeployment || !prodHost || host !== prodHost) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
