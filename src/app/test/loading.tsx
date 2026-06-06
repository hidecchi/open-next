export default function Loading() {
	return (
		<div className="min-h-screen p-8 sm:p-20">
			<div className="max-w-2xl mx-auto flex flex-col gap-4">
				<div className="h-8 w-64 animate-pulse rounded bg-black/[.08] dark:bg-white/[.12]" />
				<div className="h-4 w-full animate-pulse rounded bg-black/[.08] dark:bg-white/[.12]" />
				<div className="h-4 w-3/4 animate-pulse rounded bg-black/[.08] dark:bg-white/[.12]" />
				<p className="font-mono text-sm text-black/60 dark:text-white/60 mt-4">
					loading.tsx — route segment loading
				</p>
			</div>
		</div>
	);
}
