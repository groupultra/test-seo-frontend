import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MarkdownViewer from './components/MarkdownViewer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 重定向根路径到第一章 */}
          <Route path="/" element={<Navigate to="/three_kingdom/chapter_001" replace />} />
          
          {/* 处理章节路由，使用正则表达式确保章节号是三位数 */}
          <Route 
            path="/three_kingdom/chapter_:chapter" 
            element={<MarkdownViewer />} 
          />
          
          {/* 处理无效路由 */}
          <Route path="*" element={<div>页面不存在</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 