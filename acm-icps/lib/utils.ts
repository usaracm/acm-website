export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function resolveAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("/") && !path.startsWith("/iicair")) {
    return `/iicair${path}`;
  }
  return path;
}
