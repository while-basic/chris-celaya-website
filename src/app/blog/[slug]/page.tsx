import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { formatFullDate, toTitleCase } from '@/lib/format'
import { Heading, ImageBlur, MDXContent } from '@/components/ui'
import { Comment } from '@/components/blog'

const getPost = (slug: string) => allPosts.find((post) => post.slug === slug)

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return notFound()

  return (
    <article className="w-full space-y-4 px-2 py-8 sm:px-4">
      <figure className="overflow-hidden border text-center bg-color-secondary border-color">
        <ImageBlur
          src={post.thumbnail}
          alt={`Thumbnail for article ${post.title}`}
          blurDataURL={post.thumbnailPlaceholder}
          width={1200}
          height={630}
        />
        <figcaption className="py-2 text-xs">{post.thumbnailCredit}</figcaption>
      </figure>
      <div className="flex items-center text-sm font-medium text-color-secondary">
        <time dateTime={post.createdAt} className="flex items-center space-x-2">
          Published at {formatFullDate(post.createdAt)}
        </time>
        <span>・{post.readTime} minute(s) read</span>
      </div>
      <Heading>{post.title}</Heading>
      <p>{post.summary}</p>
      <div className="flex items-center space-x-2">
        {post.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-sm bg-color-secondary">
            {toTitleCase(tag)}
          </span>
        ))}
      </div>
      <hr className="border-color" />
      <MDXContent code={post.body.code} />
      <hr className="pb-4 border-color" />
      <Comment />
    </article>
  )
}
