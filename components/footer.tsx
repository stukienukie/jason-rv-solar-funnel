export function Footer() {
  return (
    <footer className="px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} RVsOffGrid. All rights reserved.{' '}
        <a
          href="https://rvsoffgrid.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline"
        >
          rvsoffgrid.com
        </a>
      </p>
    </footer>
  )
}
