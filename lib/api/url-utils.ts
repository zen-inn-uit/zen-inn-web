/**
 * URL utilities using the modern WHATWG URL API
 * This avoids the deprecated Node.js url.parse() method
 */

/**
 * Builds a URL with query parameters using the WHATWG URL API
 * @param baseUrl - The base URL (can be relative or absolute)
 * @param params - Query parameters as an object
 * @returns The full URL with query parameters
 */
export function buildUrlWithParams(
  baseUrl: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  // Filter out undefined and null values
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);

  // Use URLSearchParams for proper encoding
  const searchParams = new URLSearchParams(filteredParams);
  const queryString = searchParams.toString();

  if (!queryString) {
    return baseUrl;
  }

  // Check if baseUrl already has query parameters
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}`;
}

/**
 * Safely parses a URL using the WHATWG URL API
 * @param url - The URL to parse
 * @param base - Optional base URL for relative URLs
 * @returns URL object or null if parsing fails
 */
export function parseUrl(url: string, base?: string): URL | null {
  try {
    return new URL(url, base);
  } catch (error) {
    console.error('Failed to parse URL:', url, error);
    return null;
  }
}
