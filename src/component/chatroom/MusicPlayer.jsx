import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

// 音乐播放器组件
const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null); // 引用 audio 元素

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player p-4 bg-gray-800 text-white rounded-lg mt-5">
            <h2 className="text-xl font-bold mb-3 flex justify-center">Music Player</h2>
            {/* 音频文件 */}
            <audio ref={audioRef} src="/assets/music/background.mp3" />
            {/* 播放和暂停按钮 */}
            <div className="flex justify-center">
                <button
                    onClick={togglePlayPause}
                    className="bg-green-500 rounded-full p-3 hover:bg-green-700 transition-colors"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;
