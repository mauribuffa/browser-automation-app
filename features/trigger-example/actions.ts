"use server"

import { tasks } from "@trigger.dev/sdk"

// Type-only import: keeps the task's code out of your Next.js server bundle.
// NEVER import the task value here — only its type.
import type { helloWorldTask } from "@/trigger/example"

// Example: trigger the hello-world task from backend code (Server Action).
// Call this from a Client Component via a form action or onClick handler.
export async function triggerHelloWorldAction() {
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello from my Next.js app!",
  })

  // handle.id is the run id — use it with Trigger.dev Realtime to stream status.
  return { runId: handle.id }
}
