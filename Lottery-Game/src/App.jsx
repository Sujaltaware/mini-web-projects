import React from 'react';
import { useState } from 'react';

const genTicket = (length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10));
};

const sum = (ticket) => {
  return ticket.reduce((total, num) => total + num, 0);
};

export default function LotteryGame() {
  let [ticket, setTicket] = useState(genTicket(3))
  const [showWinPopup, setShowWinPopup] = useState(sum(ticket) === 15);


  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 overflow-auto">
      <div className="w-full mx-auto">

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 text-yellow-400 text-4xl">🏆</div>
            <h1 className="text-5xl font-bold text-white">Lucky Numbers</h1>
            <div className="w-12 h-12 text-yellow-400 text-4xl">✨</div>
          </div>
          <p className="text-xl text-blue-200">Generate your lucky 3-digit lottery ticket!</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 text-blue-300 text-2xl">🎫</div>
              <h2 className="text-2xl font-semibold text-white">Current Ticket</h2>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-xl p-6">
                <div className="text-sm font-medium text-gray-600 mb-2">LOTTERY TICKET</div>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {ticket[0]}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {ticket[1]}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {ticket[2]}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Sum: {sum(ticket)} {sum(ticket) === 15 ? '🎉 WINNER!' : ''}
                </div>
              </div>
            </div>
            {showWinPopup && (
              <div className="fixed inset-0 bg-black/50 rounded-3xl flex items-center justify-center z-50 ">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center transform animate-bounce ease-in-out relative">
                  <button onClick={() => setShowWinPopup(false)} className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold transition-colors duration-200">
                    ✕
                  </button>

                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-purple-900 mb-2">Congratulations!</h2>
                  <p className="text-xl text-gray-700 mb-4">You Won the Lottery!</p>
                  <p className="text-lg text-green-600 mb-4">Your numbers add up to 15!</p>
                  <div className="flex justify-center gap-2 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {ticket[0]}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {ticket[1]}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      {ticket[2]}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button onClick={() => {
              const newTicket = genTicket(3);
              setTicket(newTicket);
              setShowWinPopup(sum(newTicket) === 15);
            }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3 mx-auto">
              <div className="w-6 h-6 text-2xl">🔀</div>
              Generate Lucky Numbers
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 inline-block border border-white/10">
            <div className="text-sm text-blue-200">Current Ticket Sum</div>
            <div className="text-2xl font-bold text-white">{sum(ticket)}</div>
            <div className="text-xs text-blue-300 mt-1">Win when sum = 15!</div>
          </div>
        </div>
      </div>
    </div>
  );
}