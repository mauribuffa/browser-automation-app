export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex flex-1 flex-col gap-2 p-6">
      <h1 className="font-heading text-lg font-medium tracking-tight">
        Workflow
      </h1>
      <p className="text-sm text-muted-foreground">
        Viewing workflow <code className="font-mono">{id}</code>
      </p>
    </div>
  )
}
