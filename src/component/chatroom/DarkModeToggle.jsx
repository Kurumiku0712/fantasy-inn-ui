import React from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = ({ isDarkMode, toggleTheme }) => {
    return (
        <div className="dark-mode-toggle p-4 bg-gray-800 text-white rounded-lg mt-5">
            <h2 className="text-xl font-bold mb-3 flex justify-center">Theme Mode</h2>
            {/* 深色模式按钮 */}
            <div className="flex justify-center">
                <button
                    onClick={toggleTheme}
                    className={`bg-yellow-500 rounded-full p-3 hover:bg-yellow-700 transition-colors`}
                >
                    {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                </button>
            </div>
        </div>
    );
};

export default DarkModeToggle;
