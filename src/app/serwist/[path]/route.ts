import { createSerwistRoute } from "@serwist/turbopack";

const revision = process.env.npm_package_version ?? "1";

const serwistRoute = createSerwistRoute({
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
  swSrc: "src/app/sw.ts",
  useNativeEsbuild: true,
});

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string }> }
) {
  const params = await context.params;
  return serwistRoute.GET(request, { params: Promise.resolve(params) });
}
