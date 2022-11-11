## Getting Started

```bash
yarn install
yarn run dev
```

## Testing

```bash
yarn run test --coverage --verbose --watchAll=False
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory Structure

```
/src
    /components     [.tsx]  Reusable components, e.g., forms, cards, layouts, etc.
        /forms
        /layouts
        ...
    /lib            [.ts]   Hooks, API call wrappers, etc.
    /pages          [.tsx]  Pages.
    /styles         [.css]  Only globals.css locates here. One can write Tailwind CSS global styles.
    /utils          [.ts]   Utility functions that could be used throughout the codebase.
`