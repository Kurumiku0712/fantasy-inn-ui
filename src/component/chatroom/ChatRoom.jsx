/* eslint-disable react/prop-types */
// eslint-disable-next-line
import { User, MessageCircle, Heart, Send, RefreshCcw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import DarkModeToggle from './DarkModeToggle';


const fetchRandomChatbot = async () => {
    const response = await fetch('http://localhost:4040/chatbot/random');
    if (!response.ok) {
        throw new Error('Failed to fetch chatbot');
    }
    return response.json();
}

const saveSwipe = async (chatbotId) => {
    const response = await fetch('http://localhost:4040/chatbot/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatbotId })
    });
    if (!response.ok) {
        throw new Error('Failed to save swipe');
    }
}

const fetchMatches = async () => {
    const response = await fetch('http://localhost:4040/chatbot/matches');
    if (!response.ok) {
        throw new Error('Failed to fetch matches');
    }
    return response.json();
}

const deleteAllMatches = async () => {
    const response = await fetch('http://localhost:4040/chatbot/matches/refresh', {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete matches');
    }
}


const fetchConversation = async (conversationId) => {
    console.log("fetching conversation: " + conversationId);
    const response = await fetch(`http://localhost:4040/chatbot/conversations/${conversationId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch conversation');
    }
    return response.json();
}

const sendMessage = async (conversationId, message) => {
    const response = await fetch(`http://localhost:4040/chatbot/conversations/${conversationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messageText: message, authorId: "user" })
    });
    if (!response.ok) {
        throw new Error('Failed to submit message');
    }
    return response.json();
}

const ChatbotSelector = ({ chatbot, onSwipe }) => (
    chatbot ? (
        <div className="rounded-lg overflow-hidden bg-white shadow-lg">
            <div className="relative">
                <img alt="not found" src={chatbot.imageUrl} />
                <div className="absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black">
                    <h2 className='text-3xl font-bold'>{chatbot.firstName} {chatbot.lastName}, {chatbot.personality}</h2>
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-600 mb-4">{chatbot.bio}</p>
            </div>
            <div className="p-4 flex justify-center space-x-4">
                <button className='bg-blue-500 rounded-full p-4 text-white hover:bg-blue-700'
                    onClick={() => onSwipe(chatbot.id, "left")}>
                    <RefreshCcw size={24} />
                </button>
                <button className='bg-red-500 rounded-full p-4 text-white hover:bg-red-700'
                    onClick={() => onSwipe(chatbot.id, "right")}>
                    <Heart size={24} />
                </button>
            </div>
        </div>
    ) : (<div>Loading...</div>)
);



const MatchesList = ({ matches, onSelectMatch }) => {

    const handleDeleteAllMatches = async () => {
        try {
            await deleteAllMatches();
            window.location.reload(); // 删除完成后刷新页面
        } catch (error) {
            console.error('Failed to refresh matches:', error);
        }
    }

    return (
        <div className="rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Preferred Contacts</h2>
                <button onClick={handleDeleteAllMatches} className="bg-green-500 text-white p-2 rounded">
                    Refresh
                </button>
            </div>
            <ul>
                {matches.map((match, index) => (
                    <li key={index} className="mb-2">
                        <button
                            className="w-full hover:bg-gray-100 rounded flex item-center"
                            onClick={() => onSelectMatch(match.chatbot, match.conversationId)}
                        >
                            <img alt="not found" src={match.chatbot.imageUrl} className="w-16 h-16 rounded-full mr-3 object-cover" />
                            <span>
                                <h3 className='font-bold'>{match.chatbot.firstName} {match.chatbot.lastName}</h3>
                            </span>
                        </button>
                    </li>
                ))
                }
            </ul>
        </div>);
}

const ChatScreen = ({ currentMatch, conversation, refreshState }) => {

    const [input, setInput] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(conversation, input);
        }
    };

    const handleSend = async (conversation, input) => {
        if (input.trim()) {
            await sendMessage(conversation.id, input);
            setInput('');
        }
        refreshState();
    }

    return currentMatch ? (
        <div className='rounded-lg shadow-lg p-4'>
            <h2 className="text-2xl font-bold mb-4">Chat with {currentMatch.firstName} {currentMatch.lastName} </h2>
            <div className="h-[50vh] border rounded-lg overflow-y-auto mb-6 p-4 bg-gray-50">
                {conversation.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.authorId === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`flex items-end ${message.authorId === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {message.authorId === 'user' ? (<User size={15} />) :
                                (<img alt="not found"
                                    src={`${currentMatch.imageUrl}`}
                                    className="w-11 h-11 rounded-full"
                                />)}
                            <div
                                className={`max-w-xs px-4 py-2 rounded-2xl ${message.authorId === 'user'
                                    ? 'bg-blue-500 text-white ml-2'
                                    : 'bg-gray-200 text-gray-800 mr-2'
                                    }`}
                            >
                                {message.messageText}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-2 border-gray-300 rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
                    placeholder="Type a message..."
                />
                <button
                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => handleSend(conversation, input)}
                >
                    <Send size={24} />
                </button>
            </div>
        </div>
    ) : (<div>Loading...</div>);
}

function ChatRoom() {

    const [currentChatbot2, setCurrentChatbot2] = useState(null);

    const loadRandomChatbot = async () => {
        try {
            const chatbot = await fetchRandomChatbot();
            setCurrentChatbot(chatbot);
        } catch (error) {
            console.error(error);
        }
    }

    const loadMatches = async () => {
        try {
            const matches = await fetchMatches();
            setMatches(matches);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        loadRandomChatbot();
        loadMatches();
    }, []);

    const [currentScreen, setCurrentScreen] = useState('chatbot');
    const [currentChatbot, setCurrentChatbot] = useState(null);
    const [matches, setMatches] = useState([]);
    const [currentMatchAndConversation, setCurrentMatchAndConversation] = useState({ match: {}, conversation: [] });


    const onSwipe = async (chatbotId, direction) => {
        if (!chatbotId) {
            console.error('chatbot ID is null or undefined');
            return;
        }
        loadRandomChatbot();
        if (direction === 'right') {
            await saveSwipe(chatbotId)
            await loadMatches();
        }
    }

    const onSelectMatch = async (chatbot, conversationId) => {
        const conversation = await fetchConversation(conversationId);
        setCurrentMatchAndConversation({ match: chatbot, conversation: conversation });
        setCurrentScreen('chat');
    }

    const refreshChatState = async () => {
        const conversation = await fetchConversation(currentMatchAndConversation.conversation.id);
        setCurrentMatchAndConversation({ match: currentMatchAndConversation.match, conversation: conversation });
    }




    const renderScreen = () => {
        switch (currentScreen) {
            case 'chatbot':
                return <ChatbotSelector chatbot={currentChatbot} onSwipe={onSwipe} />;
            case 'matches':
                return <MatchesList matches={matches} onSelectMatch={onSelectMatch} />;
            case 'chat':
                console.log(currentMatchAndConversation);
                return <ChatScreen
                    currentMatch={currentMatchAndConversation.match}
                    conversation={currentMatchAndConversation.conversation}
                    refreshState={refreshChatState} />;
            default:
                return <div>Invalid screen</div>;
        }
    }

    const refreshCurrentPage = async () => {
        try {
            window.location.reload();
        } catch (error) {
            console.error('Failed to refresh:', error);
        }
    }

    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> {/* 确保整个页面的根容器应用深色模式 */}
            <div className="flex flex-row max-w-screen-lg mx-auto p-3">

                {/* 深色模式切换区域*/}
                <div className="w-1/4 p-4"> {/* 固定宽度 1/4 的侧边栏 */}
                    <DarkModeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                </div>

                <div className="flex-1"> {/* 主聊天界面部分 */}
                    <nav className="flex justify-between items-center mb-3">
                        <button className='bg-green-500 rounded-full text-white hover:bg-green-700'>
                            <User onClick={() => setCurrentScreen("chatbot")} />
                        </button>
                        <button className='text-white' onClick={() => refreshCurrentPage()}>
                            Chat Room
                        </button>
                        <button className='bg-green-500 rounded-full text-white hover:bg-green-700'>
                            <MessageCircle onClick={() => setCurrentScreen("matches")} />
                        </button>
                    </nav>


                    {renderScreen()}



                    <button
                        onClick={() => navigate('/chatbots')} // 当点击按钮时，跳转到 /chatbots 页面
                        className="text-white p-2 rounded mx-auto block mt-4">
                        View All Chatbots
                    </button>

                    {currentChatbot2 && (
                        <div>
                            <h2>{currentChatbot2.firstName} {currentChatbot2.lastName}</h2>
                            <p>{currentChatbot2.bio}</p>
                            <img src={`${currentChatbot2.imageUrl}`} alt={currentChatbot2.firstName} />
                        </div>
                    )}
                </div>

                {/* 音乐播放器区域 */}
                <div className="w-1/4 p-4"> {/* 固定宽度 1/4 的侧边栏 */}
                    <MusicPlayer />
                </div>
            </div>
        </div>

    )
}

export default ChatRoom
