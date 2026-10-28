The confirmation toast works in two main parts: rendering the global toast container at the root of the app, and triggering the notification from the form's submit handler.

---

1. Global Setup (`src/routes/__root.tsx`)

A single `<Toaster />` component from Sonner is mounted in the root layout so any page in the app can trigger notifications:

```tsx
import { Toaster } from "@/components/ui/sonner";

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
```

- `position="bottom-right"`: Dictates where the pop-ups appear on screen.
- `richColors`: Automatically themes the toast based on its type (a green background and icon for `toast.success`, red for `toast.error`, etc.).

---

2. Triggering the Toast on Submit (`src/routes/index.tsx`)

Inside the form page, the `toast` function is called when the user submits their message:

```tsx
import { toast } from "sonner";

function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); // Stop standard browser page reload
  setSubmitted(true);     // Toggle inline success UI

  toast.success(
    `Thanks${name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}! Your demo message is in.`,
    {
      description: "This is a demo — nothing has been sent or saved.",
    }
  );
}
```

- `event.preventDefault()`: Prevents the browser's default form submission from reloading the page.
- Personalized title: Checks if the user entered a name (`name.trim().split(" ")[0]`) to greet them by first name (e.g., "Thanks, Adnan! Your demo message is in."), falling back cleanly to "Thanks! Your demo message is in." if empty.
- `description`: Adds a secondary subtitle under the main alert explaining that this was a demo action.

---

What to explore next

1. Customize behavior: Adjust options like auto-dismiss duration (`duration: 5000`), add an action button (like an Undo action), or change screen positioning.
2. Real email delivery: Connect Lovable Cloud to handle real email notifications (e.g., via Resend) so submissions send an actual message instead of staying client-side demo state.