import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const MarkdownViewer = () => {
  const { chapter } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const formattedChapter = chapter.padStart(3, '0');
    const markdownUrl = `/three_kingdom/chapter_${formattedChapter}.md`;
    
    setLoading(true);
    setError(null);

    fetch(markdownUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`章节 ${formattedChapter} 不存在`);
        }
        return response.text();
      })
      .then(text => {
        const cleanText = text.replace(/^\uFEFF/, '');
        const cleanedContent = cleanText.split('\n\n').filter(paragraph => 
          !paragraph.includes('uutxt.com') && 
          !paragraph.includes('niaoyan.com') &&
          !paragraph.includes('[a]') &&
          !paragraph.includes('[b]') &&
          !paragraph.includes('[c]') &&
          !paragraph.includes('[d]') &&
          !paragraph.includes('[e]') &&
          !paragraph.includes('[f]') &&
          !paragraph.includes('[g]') &&
          !paragraph.includes('[h]')
        ).join('\n\n');
        setContent(cleanedContent);
        setLoading(false);
      })
      .catch(error => {
        console.error('加载markdown文件时出错:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [chapter]);

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="markdown-container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer; 