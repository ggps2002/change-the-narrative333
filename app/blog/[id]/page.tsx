import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Tag, User } from "lucide-react";
import { format } from "date-fns";

interface BlogPageProps {
  params: { id: string };
}

const BlogPostPage = async ({ params }: BlogPageProps) => {
  const docRef = doc(db, "blogPosts", params.id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return notFound();

  const post = snapshot.data();

  return (
    <div className="w-full py-16 px-4 lg:px-24">
      {post.coverImage && (
        <div className="relative w-full h-96 mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4 mb-10">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {post.publishDate?.seconds &&
            format(new Date(post.publishDate.seconds * 1000), "PPP")}
        </span>
        <span className="flex items-center gap-1">
          <User className="h-4 w-4" />
          {post.author}
        </span>
        <span className="flex items-center gap-1">
          <Tag className="h-4 w-4" />
          {post.category}
        </span>
      </div>

      <div
        className="prose prose-base lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogPostPage;
