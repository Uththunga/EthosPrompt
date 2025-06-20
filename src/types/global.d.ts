/// <reference types="@emotion/react/types/css-prop" />
/// <reference types="vite/client" />

// Add global type declarations here
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}

// Add global variables if needed
declare const __APP_VERSION__: string;
declare const __DEV__: boolean;
