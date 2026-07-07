export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function resolveAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("/") && !path.startsWith("/iic-air")) {
    return `/iic-air${path}`;
  }
  return path;
}
