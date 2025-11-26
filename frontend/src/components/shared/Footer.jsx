import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-10 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="text-black dark:text-white text-sm">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/" className="text-black dark:text-white hover:text-[#6A38C2] text-sm">Home</a>
          <a href="/jobs" className="text-black dark:text-white hover:text-[#6A38C2] text-sm">Jobs</a>
          <a href="/about" className="text-black dark:text-white hover:text-[#6A38C2] text-sm">About</a>
          <a href="/contact" className="text-black dark:text-white hover:text-[#6A38C2] text-sm">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer