"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Loader2, Search, Tag, User } from "lucide-react";
import { useAdminBlog } from "@/hooks/useAdminBlog";
import Image from "next/image";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const { posts, loadingBlog } = useAdminBlog();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loadingBlog) {
      setFilteredPosts(posts);
      setCurrentPage(1); // Reset to first page on data change
    }
  }, [posts, loadingBlog]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
      setCurrentPage(1);
      return;
    }

    const lowerTerm = searchTerm.toLowerCase();
    const results = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(lowerTerm) ||
        post.excerpt?.toLowerCase().includes(lowerTerm) ||
        post.category?.toLowerCase().includes(lowerTerm)
    );
    setFilteredPosts(results);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Blog & Resources</h1>
            <p className="text-xl mb-8">
              Stories, information, and resources to support your journey
            </p>

            <form onSubmit={handleSearch} className="flex w-full max-w-lg">
              <Input
                type="text"
                placeholder="Search articles, topics, or tags..."
                className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                className="rounded-l-none bg-white text-primary hover:bg-white/90"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container-custom">
          {
            loadingBlog ? (
              <div className="flex justify-center items-center h-[500px]">
                <div className="flex">
                  <Loader2 className="w-7 h-7 animate-spin"/>
                   <p className="text-lg">Loading Blogs...</p>
                </div>
              </div>
            ) : (
               <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="seekers">For Help Seekers</TabsTrigger>
                <TabsTrigger value="supporters">For Supporters</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <BlogPostList posts={paginatedPosts} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>

            <TabsContent value="seekers">
              <BlogPostList
                posts={filteredPosts.filter((post) => post.type === "seekers")}
              />
            </TabsContent>

            <TabsContent value="supporters">
              <BlogPostList
                posts={filteredPosts.filter(
                  (post) => post.type === "supporters"
                )}
              />
            </TabsContent>
          </Tabs>
            )
          }
        </div>
      </section>
    </div>
  );
};

const formatDate = (dateObj: any) => {
  try {
    const date = dateObj?.toDate?.() || new Date(dateObj);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
};

const BlogPostList = ({ posts }: { posts: any[] }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-medium text-gray-500">No articles found</p>
        <p className="mt-2 text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-video relative w-full bg-gray-100">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-4xl text-gray-300 font-bold">
                {post.category?.[0] ?? "B"}
              </div>
            )}
          </div>

          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishDate)}</span>
              <span className="mx-1">•</span>
              <Tag className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              By {post.author}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link
              href={`/blog/${post.id}`}
              className="flex items-center text-primary hover:underline"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Blog;
