import { Suspense } from "react";
import Link from "next/link";

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

type User = {
	id: number;
	name: string;
	email: string;
};

async function fetchPosts(): Promise<Post[]> {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
		cache: "no-store",
	});
	if (!res.ok) throw new Error("Failed to fetch posts");
	return res.json();
}

async function fetchUsers(): Promise<User[]> {
	await new Promise((resolve) => setTimeout(resolve, 4000));
	const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3", {
		cache: "no-store",
	});
	if (!res.ok) throw new Error("Failed to fetch users");
	return res.json();
}

async function PostsList() {
	const posts = await fetchPosts();
	return (
		<ul className="flex flex-col gap-3">
			{posts.map((post) => (
				<li
					key={post.id}
					className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4"
				>
					<h3 className="font-semibold">{post.title}</h3>
					<p className="text-sm text-black/70 dark:text-white/70 mt-1">{post.body}</p>
				</li>
			))}
		</ul>
	);
}

async function UsersList() {
	const users = await fetchUsers();
	return (
		<ul className="flex flex-col gap-3">
			{users.map((user) => (
				<li
					key={user.id}
					className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4"
				>
					<p className="font-semibold">{user.name}</p>
					<p className="text-sm text-black/70 dark:text-white/70">{user.email}</p>
				</li>
			))}
		</ul>
	);
}

function SectionFallback({ label }: { label: string }) {
	return (
		<div className="rounded-lg border border-dashed border-black/[.15] dark:border-white/[.25] p-6">
			<p className="font-mono text-sm animate-pulse text-black/60 dark:text-white/60">{label}</p>
		</div>
	);
}

export default function TestPage() {
	return (
		<div className="min-h-screen p-8 sm:p-20">
			<div className="max-w-2xl mx-auto flex flex-col gap-8">
				<div>
					<Link
						href="/"
						className="text-sm hover:underline hover:underline-offset-4 text-black/60 dark:text-white/60"
					>
						← Home
					</Link>
					<h1 className="text-2xl font-semibold mt-4">Streaming &amp; Suspense Test</h1>
					<p className="text-sm text-black/70 dark:text-white/70 mt-2">
						This shell renders immediately. Posts (~2s) and Users (~4s) stream in via separate
						Suspense boundaries.
					</p>
				</div>

				<section className="flex flex-col gap-3">
					<h2 className="font-mono text-sm font-semibold">Posts (jsonplaceholder)</h2>
					<Suspense fallback={<SectionFallback label="Suspense fallback: loading posts…" />}>
						<PostsList />
					</Suspense>
				</section>

				<section className="flex flex-col gap-3">
					<h2 className="font-mono text-sm font-semibold">Users (jsonplaceholder)</h2>
					<Suspense fallback={<SectionFallback label="Suspense fallback: loading users…" />}>
						<UsersList />
					</Suspense>
				</section>
			</div>
		</div>
	);
}
