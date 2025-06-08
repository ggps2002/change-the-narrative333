"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Heart,
  Loader2,
  PenSquare,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/utils";
import { useRouter } from "next/navigation";
import { useAdminBlog } from "@/hooks/useAdminBlog";
import TiptapEditor from "@/components/Editor/TipTapEditor";
import { useForm, Controller } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import DonationContentForm from "./DonationForm";
import SurveyTab from "./SurveyTab";

type BlogFormData = {
  title: string;
  author: string;
  category: string;
  type: string;
  publishDate: string;
  excerpt: string;
  content: string;
  coverImage: string;
};

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const { posts, loadingBlog, addPost, updatePost, deletePost } =
    useAdminBlog();
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      author: "",
      category: "Education",
      type: "seekers",
      publishDate: "",
      excerpt: "",
      content: "",
      coverImage: "",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
      } else if (user.email !== 'admin@changethenarrative333.org') {
        router.push('/dashboard');
      } else {
        setLoading(false); // ✅ Admin verified
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreation = () => {
    setEditingPostId(null);
    setContent(""); // important
    reset({
      title: "",
      author: "",
      category: "Education",
      type: "seekers",
      publishDate: "",
      excerpt: "",
      content: "", // ensures tiptap gets blank content
      coverImage: "",
    });
    setIsFormOpen(true);
  };

  interface BlogPost {
    id: string;
    title: string;
    author: string;
    category: string;
    type: string;
    publishDate?: Timestamp;
    excerpt: string;
    content: string;
    coverImage?: string;
  }

  const handlePostEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    const formattedDate = post.publishDate
      ? post.publishDate.toDate().toISOString().split("T")[0]
      : "";

    setContent(post.content); // needed to trigger tiptap editor

    reset({
      title: post.title,
      author: post.author,
      category: post.category,
      type: post.type,
      publishDate: formattedDate,
      excerpt: post.excerpt,
      content: post.content, // important for hook-form
      coverImage: post.coverImage || "",
    });

    setIsFormOpen(true);
  };

  const handleSaveBlog = async (data: BlogFormData) => {
    setIsSubmitting(true);

    const postData = {
      title: data.title,
      author: data.author,
      category: data.category,
      type: data.type,
      publishDate: Timestamp.fromDate(new Date(data.publishDate)),
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || "",
    };

    if (editingPostId) {
      // Update existing post
      await updatePost(editingPostId, postData);
    } else {
      // Add new post
      await addPost(postData);
    }

    setIsSubmitting(false);
    reset();
    setContent("");
    setIsFormOpen(false);
    setEditingPostId(null);
  };

  interface BlogPostForDelete {
    id: string;
    [key: string]: any;
  }

  const handleDeletePost = async (post: BlogPostForDelete): Promise<void> => {
    setDeletingPostId(post.id); // Mark this post as being deleted
    await deletePost(post.id);
    setDeletingPostId(null);
    reset();
    setContent("");
  };

  return (
    loading ? (
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex gap-2">
          <Loader2 className="w-7 h-7 animate-spin"/>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    ) : (
      <div className="flex flex-col min-h-screen">
        {/* Admin Header */}
        <section className="bg-primary text-white py-8">
          <div className="container-custom">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-white/80">
                  Manage content, surveys, and donations
                </p>
              </div>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </section>

        {/* Admin Content */}
        <section className="py-8 flex-grow bg-gray-50">
          <div className="container-custom">
            <Tabs defaultValue="surveys">
              <TabsList className="mb-8 bg-white">
                <TabsTrigger value="surveys">Survey Results</TabsTrigger>
                <TabsTrigger value="blog">Manage Blog</TabsTrigger>
                <TabsTrigger value="donation">Donation Content</TabsTrigger>
              </TabsList>
              <SurveyTab />

              <TabsContent value="blog">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          Blog Posts
                        </CardTitle>
                        <CardDescription>
                          Create and manage blog content
                        </CardDescription>
                      </div>
                      <Button onClick={handleCreation}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Post
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {posts.map((post) => (
                            <TableRow key={post.title}>
                              <TableCell>{post.title}</TableCell>
                              <TableCell>{post.author}</TableCell>
                              <TableCell>{post.category}</TableCell>
                              <TableCell>{post.type}</TableCell>
                              <TableCell>
                                {post.publishDate
                                  ? post.publishDate
                                      .toDate()
                                      .toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })
                                  : "Not Published"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handlePostEdit(post)}
                                  >
                                    <PenSquare className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeletePost(post)}
                                  >
                                    {deletingPostId === post.id ? (
                                      <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                      <>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <div className={`${!isFormOpen && "hidden"}`}>
                    <CardHeader className="pt-6 pb-2 flex justify-between">
                      <CardTitle className="text-lg">Create/Edit Post</CardTitle>
                      <Button
                        className="bg-transparent hover:bg-red-50 text-black"
                        onClick={() => setIsFormOpen(false)}
                      >
                        <X />
                        Close
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleSubmit(handleSaveBlog)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="post-title">Title</Label>
                            <Input
                              id="post-title"
                              {...register("title", {
                                required: "Title is required",
                              })}
                              placeholder="Post title"
                            />
                            {errors.title && (
                              <p className="text-sm text-red-600">
                                {errors.title.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="post-author">Author</Label>
                            <Input
                              id="post-author"
                              {...register("author", {
                                required: "Author is required",
                              })}
                              placeholder="Post author"
                            />
                            {errors.author && (
                              <p className="text-sm text-red-600">
                                {errors.author.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="post-category">Category</Label>
                            <select
                              id="post-category"
                              {...register("category", { required: true })}
                              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                            >
                              <option value="Education">Education</option>
                              <option value="Resources">Resources</option>
                              <option value="Support">Support</option>
                              <option value="Advocacy">Advocacy</option>
                              <option value="Healing">Healing</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="post-type">Target Audience</Label>
                            <select
                              id="post-type"
                              {...register("type", { required: true })}
                              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                            >
                              <option value="seekers">For Help Seekers</option>
                              <option value="supporters">For Supporters</option>
                              <option value="both">For Both</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="post-date">Publish Date</Label>
                            <Input
                              id="post-date"
                              type="date"
                              {...register("publishDate", {
                                required: "Publish date is required",
                              })}
                            />
                            {errors.publishDate && (
                              <p className="text-sm text-red-600">
                                {errors.publishDate.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="post-excerpt">Excerpt</Label>
                          <Textarea
                            id="post-excerpt"
                            {...register("excerpt", {
                              required: "Excerpt is required",
                            })}
                            placeholder="Brief description of the post"
                            rows={2}
                          />
                          {errors.excerpt && (
                            <p className="text-sm text-red-600">
                              {errors.excerpt.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="post-cover">Cover Image URL</Label>
                          <div className="flex gap-2">
                            <Input
                              id="post-cover"
                              placeholder="https://example.com/image.jpg"
                              {...register("coverImage", {
                                required: "Cover image URL is required",
                              })}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="hover:text-black"
                              onClick={() => {
                                const value = document.getElementById(
                                  "post-cover"
                                ) as HTMLInputElement;
                                if (value?.value?.trim()) {
                                  setPreviewImage(value.value.trim());
                                } else {
                                  setPreviewImage(null);
                                }
                              }}
                            >
                              Preview
                            </Button>
                          </div>

                          {errors.coverImage && (
                            <p className="text-sm text-red-600">
                              {errors.coverImage.message}
                            </p>
                          )}

                          {previewImage && (
                            <div className="pt-2">
                              <Image
                                src={previewImage}
                                alt="Cover Preview"
                                width={400}
                                height={224}
                                className="max-h-56 rounded-md object-cover border"
                                onError={() => setPreviewImage(null)}
                                unoptimized
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="post-content">Content</Label>
                          <Controller
                            control={control}
                            name="content"
                            rules={{ required: "Content is required" }}
                            render={({ field }) => (
                              <TiptapEditor
                                key={editingPostId ?? "new"} // reinitializes TipTap on switch
                                value={field.value ?? content}
                                onChange={(val) => {
                                  setContent(val); // keeps local state
                                  field.onChange(val); // updates react-hook-form
                                }}
                              />
                            )}
                          />

                          {errors.content && (
                            <p className="text-sm text-red-600">
                              {errors.content.message}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                              reset();
                              setContent("");
                              setIsFormOpen(false);
                              setEditingPostId(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                              ? "Saving..."
                              : editingPostId
                              ? "Update Post"
                              : "Save Post"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="donation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-accent" />
                      Donation Page Content
                    </CardTitle>
                    <CardDescription>
                      Manage the content displayed on the donation page
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DonationContentForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    )
  );
};

export default Admin;
