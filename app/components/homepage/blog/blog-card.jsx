"use client";
import Image from 'next/image';
import Link from 'next/link';

function BlogCard({ blog }) {
  return (
    <div className="border border-white/10 transition-all duration-500 bg-white/5 backdrop-blur-md rounded-2xl relative group hover:border-[#16f2b3]/30 hover:bg-white/10">
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-2xl">
        <Image
          src={blog.cover_image}
          height={1080}
          width={1920}
          alt={blog.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-3">
        <Link target='_blank' href={blog.url}>
          <p className='cursor-pointer text-xl text-white font-bold hover:text-[#16f2b3] transition-colors line-clamp-1'>
            {blog?.title}
          </p>
        </Link>
        <p className='text-sm text-gray-400 line-clamp-3 leading-relaxed'>
          {blog?.summary}
        </p>
        <div className="mt-2">
          <Link
            target='_blank'
            href={blog.url}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#16f2b3] hover:text-white transition-colors"
          >
            View Certificate →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
