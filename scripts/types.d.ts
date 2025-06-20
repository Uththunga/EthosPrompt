// Type definitions for Node.js globals and module resolution
declare const __dirname: string;
declare const __filename: string;

// Add type definitions for import.meta in Node.js
declare namespace NodeJS {
  interface ImportMeta {
    url: string;
  }
}

declare const importMeta: NodeJS.ImportMeta;

// This allows TypeScript to understand the import.meta property
declare module 'node:module' {
  interface ImportMeta {
    url: string;
  }
}
