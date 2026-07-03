const publicAssetBasePath = process.env.NEXT_PUBLIC_ASSET_BASE_PATH ?? "";

export function publicAssetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicAssetBasePath}${normalizedPath}`;
}
