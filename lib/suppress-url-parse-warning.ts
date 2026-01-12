/**
 * Suppress Node.js DEP0169 deprecation warning for url.parse()
 * This warning comes from dependencies (axios, Next.js internals) that we cannot control.
 * 
 * We've already migrated our own code to use the WHATWG URL API (see lib/api/url-utils.ts),
 * but some dependencies still use the deprecated url.parse() method.
 * 
 * This file should be imported as early as possible in the application lifecycle.
 */

if (typeof process !== 'undefined' && process.emitWarning) {
  const originalEmitWarning = process.emitWarning;
  
  process.emitWarning = function (warning: string | Error, ...args: any[]) {
    // Suppress the specific DEP0169 warning about url.parse()
    if (
      typeof warning === 'string' &&
      warning.includes('url.parse()') &&
      warning.includes('DEP0169')
    ) {
      // Silently ignore this warning
      return;
    }
    
    // For all other warnings, use the original behavior
    return (originalEmitWarning as any).apply(process, [warning, ...args]);
  };
}

export {};
