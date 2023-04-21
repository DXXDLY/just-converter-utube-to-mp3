import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { fetch } from './services/ApiRequest';

interface ResponseData {
  status: string;
  link: string;
}

const App: React.FC = () => {
  const [link, setLink] = useState<string>('');
  const [id, setId] = useState<string | null>(null);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchData = () => {
        const interval = setInterval(async () => {
          setDisabled(true);
          const res = await fetch({ id });

          if (res.status === 200 && res.data.status === 'ok') {
            setDisabled(false);
            setResponse(res.data);
            clearInterval(interval);
          } else if (res.status === 200 && res.data.status === 'fail') {
            alert('Invalid video ID');
            setDisabled(false);
            clearInterval(interval);
          }
        }, 1000);
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);
  console.log(response)
  return (
    <div className="App">
      <div id="logo">
        <h2>MP3 DOWNLOADER</h2>
      </div>

      <div id="body">
        <input
          type="text"
          placeholder="YouTube link here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </div>

      <button
        onClick={() => {
          const text = link.split('=')[1];
          if (text) {
            setId(text);
          }
        }}
        disabled={disabled}
        className={disabled ? 'btn-disabled' : ''}
      >
        Download
      </button>
    </div>
  );
};

export default App;