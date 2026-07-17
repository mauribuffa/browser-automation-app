"use client"

import { useTransition } from "react"
import { PlusIcon } from "lucide-react"

import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import { Button } from "@/components/ui/button"

export function NewWorkflowButton() {
  const [isPending, startTransition] = useTransition()

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      await createWorkflowAction(generateSlug())
    })
  }

  return (
    <Button onClick={handleCreateWorkflow} disabled={isPending}>
      <PlusIcon />
      New workflow
    </Button>
  )
}
