import React from 'react'
import BlogspageLayout from './BlogspageLayout'
import BlogCard from '../../components/blogpage_components/BlogCard'

export default function BlogPageLiked() {

  const data = [{
    imageSrc: "https://img1.etsystatic.com/019/0/9161936/il_fullxfull.564171949_ajso.jpg",
    heading: "BaghChal History", 
    body: `This is the history of BaghChal. Welcome to SengokuDaimyo.com—a webpage 
    started by the late Anthony J. Bryant as the central linking point to shops and various projects, 
    mostly related to medieval Japan.`,
    author: 'Prabesh',
    publishedDate: '2021/Mar/23'
  },
  {
    heading: "BaghChal History", 
    body: `This is the history of BaghChal. Welcome to SengokuDaimyo.com—a webpage 
    started by the late Anthony J. Bryant as the central linking point to shops and various projects, 
    mostly related to medieval Japan. It is now maintained and updated in his memory by his friends and students 
    so that it remains available to everyone with an in interest in Japanese history.`,
    author: 'Prabesh',
    publishedDate: '2021/Mar/23'
  }]

  return (
    <BlogspageLayout>
      <p>Liked blogs</p>
    </BlogspageLayout>
  )
}
