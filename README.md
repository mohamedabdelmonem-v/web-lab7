# Multi-page React Online Shop (Assignment 7)

## 📁 File Organization
- `src/api/productsApi.js`: Pure JavaScript async layer handling API calls to DummyJSON for fetching single or list product data using native Fetch and `AbortSignal`.
- `src/api/authApi.js`: Simulated authentication API layer providing delayed promise handling for user credentials.
- `src/hooks/useFetch.js`: Custom hook encapsulating fetching logic, error handling, loading states, and `AbortController` cancellation using `useReducer`.
- `src/hooks/useLocalStorage.js`: Custom hook syncing state with `localStorage` for visual theme persistence.
- `src/context/AuthContext.jsx`: React Context and reducer managing user authentication state across the application.
- `src/store/cartStore.js`: Zustand external store managing cart items, quantities, and external `localStorage` subscriptions.
- `src/components/Layout.jsx`: Master layout wrapper rendering navigation, child routes (`Outlet`), and footer with theme bindings.
- `src/components/NavBar.jsx`: Global header navigation bar displaying route links, active states, cart count, and theme toggle.
- `src/components/ProtectedRoute.jsx`: Routing wrapper redirecting unauthenticated users to `/login` while preserving origin location.
- `src/pages/ProductList.jsx`: Product catalog view using URL query strings (`useSearchParams`) for derived filtering.
- `src/pages/ProductDetail.jsx`: Product detail view consuming dynamic URL route parameters (`useParams`).
- `src/pages/Cart.jsx`: Shopping cart view allowing item removal, quantity updates, and total price calculation.
- `src/pages/Login.jsx`: Controlled login form component with dynamic redirect capabilities.
- `src/pages/Home.jsx` & `NotFound.jsx`: Landing page and 404 fallback page components.
- `src/App.jsx`: Main routing configuration connecting nested routes, providers, and layout.

---

## ❓ Reasoning Questions (Section 10)

1. **State Choices**:
   - **Signed-in user**: Managed in `AuthContext` with `useReducer` because authentication status is low-frequency state needed globally across top-level components.
   - **Cart**: Managed in a Zustand store to handle high-frequency item updates without triggering widespread React context re-renders.
   - **Filter values**: Stored in the URL query string (`useSearchParams`) to make filtered catalog states shareable and bookmarkable via URL.
   - **Product list**: Fetched and scoped locally inside components using `useFetch` to keep component lifecycles modular.
   - **Theme**: Stored in `localStorage` via `useLocalStorage` to persist visual layout preferences across browser sessions.

2. **Context vs. Zustand Store**:
   - Authentication state rarely changes, making Context ideal for top-down delivery. In contrast, cart state updates frequently (adding items, changing quantities). Managing the cart inside Context would trigger unnecessary re-renders across all wrapped components unless complex memoization is introduced. Zustand provides fine-grained, atomic state selection to prevent extra re-renders.

3. **Custom Hooks (`useFetch`)**:
   - `useFetch` shares the encapsulated async lifecycle logic, `AbortController` request cancellation, loading, and error states. It *does not* share state data between components; each invocation creates an independent state instance.

4. **Route Parameters**:
   - The `id` parameter returned from `useParams()` is a **string**. This mattered when passing the ID into numeric comparisons, URL dynamic paths, and API fetching functions.

5. **Protected Routes Security**:
   - Client-side route protection using `ProtectedRoute` only improves UX by hiding unauthorized screens and redirecting users. It is **not real security** because client-side JavaScript can be inspected or modified. True security must be enforced by backend servers verifying tokens on protected API endpoints.

6. **Deep Links & Static Servers**:
   - On a plain static web server, reloading `/products/3` returns a server 404 error because no physical file exists at that path. It works on Vite's development server because SPA fallback rules intercept non-file requests and direct them to `index.html`, allowing `react-router` to handle routing on the client side.

---

## 📚 Notes on Self-Study Items

1. **Query String Parameter Preservation**:
   - To update one query parameter (e.g., `category`) without losing existing search parameters (e.g., `q`), we instantiate a new `URLSearchParams(searchParams)` object, update or delete the specific key, and update the URL via `setSearchParams(newParams)`.

2. **Safe Store Initialization from LocalStorage**:
   - To prevent application crashes due to corrupted or missing `localStorage` data, we wrap `localStorage.getItem()` and `JSON.parse()` calls inside `try...catch` blocks. If parsing fails or data is missing, we gracefully fall back to default initial values (e.g., an empty array `[]`).

3. **Light/Dark Theme Implementation**:
   - Managed using the `useLocalStorage` custom hook to persist theme preference. The theme class (e.g., `.light` or `.dark`) is applied dynamically to the outer container in `Layout.jsx`, styling background and font colors via CSS custom properties or scoped selectors.

---

## 🛠️ Challenges Faced

1. **Managing URL-Driven State Without Effects**:
   - Ensuring that filtered product lists were calculated as pure **Derived State** during render based on `useSearchParams`, rather than saving filtered output into local state or synchronizing through `useEffect`.

2. **Preventing Memory Leaks & In-flight Request Stacks**:
   - Properly integrating `AbortController` inside `useFetch` to ensure that rapidly changing search filters or navigating between product pages cleanly cancels pending API requests.

3. **Zustand Subscription Synchronization Outside React**:
   - Syncing Zustand cart state to `localStorage` using `useCartStore.subscribe()` outside the React component render tree, keeping persistence completely decoupled from component lifecycles.