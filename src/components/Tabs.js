import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

const TabComponent = () => {
  const [tabData, setTabData] = useState([]);

  const fetchTabData = async () => {
    try {
      const response = await fetch('https://thingproxy.freeboard.io/fetch/https://loripsum.net/api/4');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text(); // Get response as text
      const paragraphs = text.split('</p>').map((p, index) => {
        const cleanContent = p.replace(/<[^>]*>/g, ''); // Optionally strip HTML tags
        return {
          title: `Tab ${index + 1}`,
          content: cleanContent.trim(), // Trim whitespace
        };
      }).filter(tab => tab.content); // Filter out empty tabs

      setTabData(paragraphs); // Set the parsed content
    } catch (error) {
      console.error('Error fetching tab data:', error);
    }
  };

  useEffect(() => {
    fetchTabData();
  }, []);

  return (
    <div className="container mx-auto p-4 text-white flex justify-center ">
      <Tabs>
        <TabList className="flex  bg-gray-800 justify-between ">
        {tabData.map((tab, index) => ( <Tab key={index} className=" text-white font-bold px-5 py-5 focus:bg-blue-500 focus:border:none  w-full hover:bg-gray-900 flex items-center justify-center"> 
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <content className="px-10 flex items-center bg-white py-5">
        {tabData.map((tab, index) => (
          <TabPanel key={index}>
            <h2 className="text-2xl font-bold mb-2 text-black ">{tab.title}</h2>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: tab.content }} />
          </TabPanel>
        ))}</content>
      </Tabs>
    </div>
  );
};

export default TabComponent;
