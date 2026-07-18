"use client"

import { useState, useTransition } from "react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { CircleCheckIcon, PlayIcon, TriangleAlertIcon } from "lucide-react"

import type { helloWorldTask } from "@/trigger/example"
import { runWorkflowAction } from "@/features/workflows/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface RightSidebarProps {
  workflowId: string
}

interface RunHandle {
  runId: string
  publicAccessToken: string
}

const TERMINAL_STATUSES = new Set([
  "COMPLETED",
  "CANCELED",
  "FAILED",
  "CRASHED",
  "INTERRUPTED",
  "SYSTEM_FAILURE",
  "EXPIRED",
  "TIMED_OUT",
])

export function RightSidebar({ workflowId }: RightSidebarProps) {
  const [isPending, startTransition] = useTransition()
  const [handle, setHandle] = useState<RunHandle | null>(null)

  const { run, error } = useRealtimeRun<typeof helloWorldTask>(
    handle?.runId ?? "",
    {
      accessToken: handle?.publicAccessToken,
      enabled: !!handle,
      skipColumns: ["payload"],
    }
  )

  const status = run?.status
  const isRunning = !!handle && (!status || !TERMINAL_STATUSES.has(status))

  const handleRunWorkflow = () => {
    startTransition(async () => {
      setHandle(await runWorkflowAction(workflowId))
    })
  }

  return (
    <div className="flex size-full flex-col items-center gap-4 p-4">
      <Button
        onClick={handleRunWorkflow}
        disabled={isPending || isRunning}
        className="w-full"
      >
        <PlayIcon />
        Run
      </Button>

      {handle && (
        <div className="flex w-full flex-col items-center gap-2">
          <RunStatusBadge status={status} error={!!error} />
          {error && (
            <p className="text-xs text-destructive">{error.message}</p>
          )}
          {status === "COMPLETED" && run?.output?.message && (
            <p className="text-sm text-muted-foreground">{run.output.message}</p>
          )}
        </div>
      )}
    </div>
  )
}

function RunStatusBadge({
  status,
  error,
}: {
  status: string | undefined
  error: boolean
}) {
  if (error || status === "FAILED" || status === "CRASHED") {
    return (
      <Badge variant="destructive">
        <TriangleAlertIcon />
        {status ?? "Error"}
      </Badge>
    )
  }

  if (status === "COMPLETED") {
    return (
      <Badge variant="secondary">
        <CircleCheckIcon />
        Completed
      </Badge>
    )
  }

  return (
    <Badge variant="secondary">
      <Spinner className="size-3" />
      {status ?? "Starting"}
    </Badge>
  )
}
