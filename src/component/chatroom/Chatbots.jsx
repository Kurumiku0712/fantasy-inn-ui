import React, { useEffect, useState } from 'react';
import './Chatbots.css';

const ChatbotCard = ({ chatbot }) => {
    return (
        <div className="chatbot-card">
            <img src={chatbot.imageUrl} alt={`${chatbot.firstName} ${chatbot.lastName}`} className="chatbot-image" />
            <div className="chatbot-info">
                <h3>{chatbot.firstName} {chatbot.lastName}</h3>
            </div>
        </div>
    );
};

const Chatbots = () => {
    const [chatbots, setChatbots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const chatbotsPerPage = 4; // 每页显示 4 个 chatbot

    // 获取所有 chatbots
    const fetchChatbots = async () => {
        try {
            setLoading(true); // 开始加载，设置 loading 为 true
            const response = await fetch('http://localhost:4040/chatbot/all');
            const data = await response.json();
            setChatbots(data);
            setLoading(false); // 数据加载完成，设置 loading 为 false
        } catch (error) {
            console.error('Error fetching chatbots:', error);
            setLoading(false); // 即使出错也设置 loading 为 false
        }
    };

    // 在组件挂载时获取 chatbots
    useEffect(() => {
        fetchChatbots();
    }, []);

    // 计算分页的起始和结束索引
    const indexOfLastChatbot = currentPage * chatbotsPerPage;
    const indexOfFirstChatbot = indexOfLastChatbot - chatbotsPerPage;
    const currentChatbots = chatbots.slice(indexOfFirstChatbot, indexOfLastChatbot);

    // 切换到下一页或上一页
    const nextPage = () => {
        if (currentPage < Math.ceil(chatbots.length / chatbotsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 生成新的 chatbot
    const generateChatbot = async () => {
        try {
            setLoading(true); // 设置加载状态为 true
            await fetch('http://localhost:4040/chatbot/create', { method: 'POST' });
            setLoading(false); // 加载结束
        } catch (error) {
            console.error('Error generating chatbot:', error);
            setLoading(false); // 出错时取消加载状态
        }
    };

    return (
        <div className="chatbots-container">
            <h1>All Chatbots</h1>

            {/* 显示 loading 状态 */}
            {loading ? (
                <div>It will take some time to generate a new chatbot. Loading...</div>
            ) : (
                <>
                    <button
                        onClick={generateChatbot}
                        className="text-white p-2 rounded mx-auto block mt-5 mb-5">
                        Generate A New Chatbot
                    </button>

                    {/* 显示分页的 chatbots */}
                    <div className="chatbot-grid">
                        {currentChatbots.map((chatbot, index) => (
                            <ChatbotCard key={index} chatbot={chatbot} />
                        ))}
                    </div>

                    {/* 分页按钮 */}
                    <div className="pagination mt-5">
                        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage}</span>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(chatbots.length / chatbotsPerPage)}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chatbots;
