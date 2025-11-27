import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const res = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${params.slug}`,
		);
		if (!res.ok) {
			throw new Response("Not Found", { status: 404 });
		}
		const post = await res.json();
		console.log("⚡️ ~ $slug.tsx:13 ~ post:", post)
		return { post };
	},
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const { post } = Route.useLoaderData();

	return (
	<div>
		Hello "/blog/{slug}"!
		<h2>{post.title}</h2>
		<p>{post.body}</p>
	</div>)

}
