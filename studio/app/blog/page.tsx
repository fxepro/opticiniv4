"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, User, Clock } from 'lucide-react';
import { fetchFeaturedPosts, fetchRecentPosts, fetchCategories, fetchTags, type BlogPost, type Category, type Tag } from '@/lib/api/blog';
import { format } from 'date-fns';
import { PageHero } from '@/components/page-hero';
import { PageLayout } from '@/components/page-layout';
import { PUBLIC_PAGES_EN } from '@/lib/i18n/public-pages-en';

const BLOG_EN = PUBLIC_PAGES_EN.blog;

export default function BlogPage() {
  const { t } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const tr = (key: string, fallback: string) => (hydrated ? t(key) : fallback);

  const minReadLabel = (count: number) =>
    hydrated
      ? t('blog.minRead', { count })
      : BLOG_EN.minRead.replace(/\{\{count\}\}/g, String(count));
  const router = useRouter();
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Use Promise.allSettled to handle partial failures gracefully
      const results = await Promise.allSettled([
        fetchFeaturedPosts(),
        fetchRecentPosts(10),
        fetchCategories(),
        fetchTags(),
      ]);
      
      // Handle featured posts
      if (results[0].status === 'fulfilled') {
        setFeaturedPosts(results[0].value);
      } else {
        console.error('Error loading featured posts:', results[0].reason);
        setFeaturedPosts([]);
      }
      
      // Handle recent posts
      if (results[1].status === 'fulfilled') {
        setRecentPosts(results[1].value);
      } else {
        console.error('Error loading recent posts:', results[1].reason);
        setRecentPosts([]);
      }
      
      // Handle categories
      if (results[2].status === 'fulfilled') {
        setCategories(results[2].value);
      } else {
        console.error('Error loading categories:', results[2].reason);
        setCategories([]);
      }
      
      // Handle tags
      if (results[3].status === 'fulfilled') {
        setTags(results[3].value);
      } else {
        console.error('Error loading tags:', results[3].reason);
        setTags([]);
      }
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--rd-blue-600)] mx-auto mb-4"></div>
            <p style={{ color: "var(--rd-text-secondary)" }}>{tr("blog.loading", BLOG_EN.loading)}</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        badge={tr("blog.heroBadge", BLOG_EN.heroBadge)}
        title={tr("blog.heroTitle", BLOG_EN.heroTitle)}
        subtitle={tr("blog.heroSubtitle", BLOG_EN.heroSubtitle)}
      />
      <div className="container mx-auto px-4 pt-16 pb-16 max-w-7xl" style={{ background: "var(--rd-bg-page)" }}>
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12 mt-12">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: "var(--rd-text-muted)" }} />
              <Input
                placeholder={tr("blog.searchPlaceholder", BLOG_EN.searchPlaceholder)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 border-[1.5px] rounded-lg"
                style={{ borderColor: "var(--rd-border-light)" }}
              />
            </div>
            <Button onClick={handleSearch} className="rounded-lg font-semibold" style={{ background: "var(--rd-blue-600)", color: "#fff" }}>{tr("blog.search", BLOG_EN.search)}</Button>
          </div>
        </div>

        <div className={`grid gap-8 ${(featuredPosts.length > 0 || recentPosts.length > 0) ? "lg:grid-cols-3" : "max-w-2xl mx-auto"}`}>
          {/* Main Content */}
          <div className={`space-y-8 ${(featuredPosts.length > 0 || recentPosts.length > 0) ? "lg:col-span-2" : ""}`}>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{tr("blog.featuredPosts", BLOG_EN.featuredPosts)}</h2>
                <div className="space-y-6">
                  {featuredPosts.map((post) => (
                    <div key={post.id} className="bg-white border-[1.5px] rounded-[18px] overflow-hidden transition-all hover:border-[#93c5fd] hover:shadow-lg">
                      <div className="p-6" style={{ borderColor: "var(--rd-border-light)" }}>
                        <Link href={`/blog/${post.slug}`}>
                          <div className="flex gap-6">
                            {post.featured_image_url && (
                              <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={post.featured_image_url}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {post.category && (
                                  <Badge variant="outline" style={{ borderColor: "var(--rd-border-light)" }}>{post.category.name}</Badge>
                                )}
                                <Badge style={{ background: "var(--rd-blue-600)", color: "#fff" }}>{tr("blog.featuredBadge", BLOG_EN.featuredBadge)}</Badge>
                              </div>
                              <h3 className="text-xl font-semibold mb-2 hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                                {post.title}
                              </h3>
                              {post.excerpt && (
                                <p className="mb-4 line-clamp-2" style={{ color: "var(--rd-text-secondary)" }}>
                                  {post.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm" style={{ color: "var(--rd-text-muted)" }}>
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {post.author.full_name || post.author.username}
                                </span>
                                {post.published_at && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {format(new Date(post.published_at), 'MMM d, yyyy')}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {minReadLabel(post.read_time)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{tr("blog.recentPosts", BLOG_EN.recentPosts)}</h2>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="bg-white border-[1.5px] rounded-[18px] overflow-hidden transition-all hover:border-[#93c5fd] hover:shadow-lg" style={{ borderColor: "var(--rd-border-light)" }}>
                      <div className="p-6">
                        <Link href={`/blog/${post.slug}`}>
                          <div className="flex gap-6">
                            {post.featured_image_url && (
                              <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={post.featured_image_url}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {post.category && (
                                  <Badge variant="outline" style={{ borderColor: "var(--rd-border-light)" }}>{post.category.name}</Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold mb-2 hover:text-[var(--rd-blue-600)] transition-colors" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>
                                {post.title}
                              </h3>
                              {post.excerpt && (
                                <p className="mb-4 line-clamp-2" style={{ color: "var(--rd-text-secondary)" }}>
                                  {post.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm" style={{ color: "var(--rd-text-muted)" }}>
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {post.author.full_name || post.author.username}
                                </span>
                                {post.published_at && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {format(new Date(post.published_at), 'MMM d, yyyy')}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {minReadLabel(post.read_time)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {featuredPosts.length === 0 && recentPosts.length === 0 && (
              <div className="bg-white border-[1.5px] rounded-[18px] py-16 px-6 text-center" style={{ borderColor: "var(--rd-border-light)" }}>
                <p className="text-lg" style={{ color: "var(--rd-text-secondary)" }}>{tr("blog.noPosts", BLOG_EN.noPosts)}</p>
              </div>
            )}
          </div>

          {/* Sidebar - only show when there are posts */}
          {(featuredPosts.length > 0 || recentPosts.length > 0) && (
          <div className="space-y-6">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white border-[1.5px] rounded-[18px] p-6" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{tr("blog.categories", BLOG_EN.categories)}</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-[var(--rd-bg-subtle)] transition-colors"
                      style={{ color: "var(--rd-text-secondary)" }}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.post_count}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="bg-white border-[1.5px] rounded-[18px] p-6" style={{ borderColor: "var(--rd-border-light)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "var(--rd-text-heading)", fontFamily: "var(--font-sora), sans-serif" }}>{tr("blog.tags", BLOG_EN.tags)}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/blog?tag=${tag.slug}`}
                      className="inline-block"
                    >
                      <Badge variant="outline" className="hover:bg-[var(--rd-bg-subtle)]" style={{ borderColor: "var(--rd-border-light)" }}>
                        {tag.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
