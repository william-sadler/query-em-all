# Query 'Em All

**Query 'Em All** is a dynamic Pokedex application that lets users explore Pokémon data using the [Pokémon API](https://pokeapi.co). This project was developed to practice using React Query, handling loading and error states, and effectively displaying data with a visually appealing design.

## Features

- **Search Functionality**: 
  - Search for Pokémon by name with autocomplete suggestions.
  - Search by Pokémon ID for quick access.
- **Feeling Lucky Button**: Click to be redirected to a random Pokémon for surprise exploration.
- **Region Navigation**: 
  - Landing page displays a list of Pokémon regions for easy navigation.
  - Clickable links to view Pokémon categorized by generation/region.
- **Stylized Pokémon Cards**: 
  - Each Pokémon card showcases detailed information, including:
    - Typing
    - Up to four possible moves
    - Weight and height
    - Species
  - Includes animated pixel art at the top and official artwork in the center.

## Setup

### Cloning and Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd query-em-all
   ```
2. Install the required packages and start the server:
   ```sh
   npm install
   npm run dev
   ```
   Visit [localhost:5173/](http://localhost:5173/) to view the application.

### Project Structure

- **`client/apis/pokemon.ts`**: API interaction logic (already set up).
- **`models/pokemon.ts`**: Type definitions for Pokémon data.
- **Routes**:
  - `/`: Displays a list of Pokémon regions.
  - `generation/:region`: Displays a list of Pokémon from the selected region.
  - `/pokemon/:name`: Displays details for a selected Pokémon.

### Setting Up React Query

1. Install React Query and its Devtools:
   ```sh
   npm install @tanstack/react-query @tanstack/react-query-devtools
   ```
2. In `client/index.tsx`, import and set up the Query Client:
   ```tsx
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

   const queryClient = new QueryClient();
   root.render(
     <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
       <ReactQueryDevtools />
     </QueryClientProvider>
   );
   ```

## Challenges Implemented

1. Fetching a list of Pokémon from the API.
2. Implementing loading and error states for user feedback.
3. Fetching detailed information for individual Pokémon.
4. Enhancing detail views to include additional Pokémon data.

## Stretch Goals

- Navigation to view Pokémon by generation.
- Enhanced search functionality to filter Pokémon by name.

## Submitting this Challenge for Marking

This project fulfills the assessment for:
- **WD02: Build a JavaScript application that consumes a RESTful JSON API**

## Packages Used

```plaintext
@devacademy/eslint-config
@tanstack/react-query
@tanstack/react-query-devtools
@types/express
@types/react-dom
@types/react
@types/superagent
@types/supertest
@vitejs/plugin-react
esbuild
eslint
prettier
react
react-dom
react-router-dom
typescript
vite
vitest
```

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=query-em-all)
