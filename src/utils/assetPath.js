export function assetPath(path) {
  const normalizedPath = path.replace(/^\/+/, '')

  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
