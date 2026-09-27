import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopHeader } from '../components/layout/TopHeader';
import { Sidebar } from '../components/layout/Sidebar';

export const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <TopHeader onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />

      {/* Body container with Sidebar + Main content */}
      <div className="flex-1 flex w-full max-w-[1720px] mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
