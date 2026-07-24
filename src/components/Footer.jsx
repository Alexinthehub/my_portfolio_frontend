import React from 'react';

function Footer() {
  return (
    <footer className="text-center text-gray-400 py-4 border-t border-gray-800 bg-[#02060e]">
      <p>&copy; {new Date().getFullYear()} Alex Mwendwa. All rights reserved.</p>
    </footer>
  );
}

export default Footer;