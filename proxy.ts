import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for those starting with:
    // - _next/static (static files)
    // - _next/image (image optimization)
    // - favicon.ico, sitemap.xml, robots.txt
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|og|.*\\..*).+)",
    "/",
  ],
};
