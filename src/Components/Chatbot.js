// Chatbot.js

import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';


const steps = [
  // ... your existing steps
  {
		id: '0',
		message: 'Hey!',

		// This calls the next id
		// i.e. id 1 in this case
		trigger: '1',
	}, {
		id: '1',

		// This message appears in
		// the bot chat bubble
		message: 'Please let me know what I can call you during this conversation. Example: Bot',
		trigger: '2'
	}, {
		id: '2',

		// Here we want the user
		// to enter input
		user: true, 
		trigger: '3',
	}, {
		id: '3',
		message: " Hi {previousValue}, how can I help you?",
		trigger: '4'
	}, {
		id: '4',
		options: [
			
			// When we need to show a number of
			// options to choose we create alist
			// like this
			{ value: 1, label: 'Investment Support', trigger: '5'},
			{ value: 2, label: 'Pattern Analysis', trigger: '6'},
      { value: 3, label: 'Prediction Analysis', trigger: '7'},
      { value: 4, label: 'Other', trigger: '8'},

		],
		
	},
  {
    id: '5',
    message: `1. Educate Yourself: Learn about blockchain technology, how cryptocurrencies work, and key terms like wallets and exchanges. 
  2. Start Small: Only invest what you can afford to lose due to the volatile nature of crypto markets.
  3. Diversify Your Portfolio: Spread your investments across different cryptocurrencies to minimize risk.
  4. Choose Reputable Exchanges: Use well-established exchanges with strong security measures.
  5. Secure Your Investments: Set up secure wallets, and consider using hardware wallets for long-term storage.
  6. Stay Informed: Keep abreast of market trends, news, and developments in the cryptocurrency space.
  7. Long-Term Perspective: Consider a patient, long-term investment strategy rather than reacting to short-term market fluctuations.
  8. Risk Management: Set realistic goals, define your risk tolerance, and use tools like stop-loss orders.
  9. Avoid FOMO: Don't make decisions based on fear of missing out or hype. Research before investing.
  10. Use Dollar-Cost Averaging (DCA): Invest a fixed amount at regular intervals to reduce the impact of market volatility.
  11. Beware of Scams: Be cautious of scams and fraudulent schemes. Verify information from multiple sources.
  12. Seek Professional Advice: If unsure, consider seeking advice from financial professionals based on your financial situation and goals.`,
    trigger: '4',
  },
  {
		id: '6',
		message: "In order to analyze patterns and variations in the prices of Cryptos, go to the Crypto Patterns tab in CITRANs navigation bar.",
    trigger:'4',
  },
  {
		id: '7',
		message: "In order to predict the price of a crypto in the near future for a specific date, head towards the Prediction Analysis tab in CITRANs navigation bar.",
    trigger:'4',
  },
  {
    id: '8',
    message: "I apologize but I have not yet been programmed to answer dynamic questions. 😊 You might ask one of these:",
    trigger:'9',
    
  },
  {
		id: '9',
		options: [
			{ value: 1, label: 'What is cryptocurrency?', trigger: '10'},
			{ value: 2, label: 'Can I buy crypto on CITRAN? If yes, how?', trigger: '11'},
      { value: 3, label: 'No Thanks', trigger: '12'},
		],
		
	},
  {
    id:'10',
    message:"Cryptocurrency is a type of digital or virtual currency that uses cryptography for security and operates on decentralized networks based on blockchain technology. ",
    trigger:'9',

  },
  {
    id:'11',
    message:"Yes. You can buy cryptocurrency on CITRAN by adding it to the cart and proceed by making payment for the same",
    trigger:'9',
  },
  {
    id:'12',
    message:"Hope you have a great day ahead! 😊",
  }

  
];

const theme = {
  background: 'whitesmoke',
  headerBgColor: '#BA8437',
  headerFontSize: '15px',
  botBubbleColor: '#BA8437',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: 'white',
  userFontColor: 'black',
};

const config = {
  botAvatar: 'bot.gif',
  floating: true,
};

const Chatbot = () => {
  return (
    <div className="">
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="CitranBot"
          steps={steps}
          {...config}
          recognitionEnable={true}
        />
      </ThemeProvider>
    </div>
  );
};

export default Chatbot;