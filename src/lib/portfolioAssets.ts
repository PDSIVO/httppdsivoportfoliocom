// Resolves bundled portfolio asset keys (e.g. "asset:social/sm-1.jpg")
// to their final Vite-hashed URLs. For new uploads, image_url stores a
// regular http(s) URL or data URI and is returned as-is.

const modules = import.meta.glob(
  ["/src/assets/social/*", "/src/assets/church/*", "/src/assets/brand/*", "/src/assets/business/*"],
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

const lookup: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  // path like "/src/assets/social/sm-1.jpg" -> key "social/sm-1.jpg"
  const key = path.replace("/src/assets/", "");
  lookup[key] = url;
}

export function resolveImage(imageUrl: string): string {
  if (imageUrl.startsWith("asset:")) {
    const key = imageUrl.slice("asset:".length);
    return lookup[key] ?? imageUrl;
  }
  return imageUrl;
}

export const bundledAssetOptions = Object.keys(lookup)
  .sort()
  .map((key) => ({ key: `asset:${key}`, url: lookup[key] }));