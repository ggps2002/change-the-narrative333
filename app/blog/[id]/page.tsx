"use client";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Tag, User } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

const BlogPostPage = ({ params }: BlogPageProps) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { id } = await params;
        const docRef = doc(db, "blogPosts", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          setError(true);
          return;
        }

        setPost(snapshot.data());
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <div className="w-full py-16 px-4 lg:px-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-10"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    notFound();
    return null;
  }

  return (
    <div className="w-full py-16 px-4 lg:px-24">
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