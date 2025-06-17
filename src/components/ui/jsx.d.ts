import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Extend HTML attributes here
    className?: string;
  }

  interface IntrinsicElements {
    // Add any custom elements here if needed
    [elemName: string]: any;
  }
}

// Add global JSX namespace for custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add any custom elements here if needed
      [elemName: string]: any;
    }
  }
}
