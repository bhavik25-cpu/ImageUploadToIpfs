// frontend/src/App.js
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div className="app">
      <h1>IPFS Image Upload </h1>
      <TabView>
        <TabPanel header="Image">
          <ImageUpload />
        </TabPanel>
     
      </TabView>
    </div>
  );
}

export default App;
