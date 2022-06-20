import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'

export default function Home({ posts }) {
  const {systemTheme, theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true)
    }, [])
    const renderThemeChanger = () => {
      if(!mounted) return null;
      const currentTheme = theme === 'system' ? systemTheme : theme;
      
      if(currentTheme === 'dark'){
        return(
          <SunIcon
           className="w-10 h-10"
           role="button"
           onClick={() => setTheme('light')}
           />
        );
      } else {
        return(
          <MoonIcon
            className="w-10 h-10"
            role="button"
            onClick={() => setTheme('dark')} 
          />
        );
      }
    };
  return (
    <div className="container mx-auto px-10 mb-8">
      {renderThemeChanger()}
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}

