import { createSerwistRoute } from "@serwist/turbopack";

const revision = process.env.npm_package_version ?? "1";

export const { GET } = createSerwistRoute({
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
  swSrc: "src/app/sw.ts",
  useNativeEsbuild: true,
});
