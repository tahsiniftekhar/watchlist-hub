export function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-text">Page Not Found</p>
        <p className="text-muted mt-2">
          The page you are looking for does not exist.
        </p>
      </div>
    </>
  );
}
