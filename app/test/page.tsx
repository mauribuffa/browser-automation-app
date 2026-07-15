export default function TestPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg font-medium">Protected test page</h1>
        <p className="text-sm text-muted-foreground">
          If you can see this, you&apos;re signed in. Otherwise Clerk redirected
          you to sign-in.
        </p>
      </div>
    </div>
  )
}
