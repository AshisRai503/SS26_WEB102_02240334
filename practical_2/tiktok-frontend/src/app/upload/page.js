'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ caption, visibility, allowComments, allowDuet, allowStitch });
    alert('Video uploaded (demo)');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload video</h1>
      
      <div className="flex">
        {/* Upload Area */}
        <div className="w-[360px] border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <span className="text-4xl text-gray-400">+</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Select video to upload</h3>
          <p className="text-sm text-gray-500 mb-4">Or drag and drop a file</p>
          <p className="text-xs text-gray-400 mb-1">MP4 or WebM</p>
          <p className="text-xs text-gray-400 mb-1">720x1280 resolution or higher</p>
          <p className="text-xs text-gray-400 mb-1">Up to 10 minutes</p>
          <p className="text-xs text-gray-400 mb-4">Less than 2 GB</p>
          <button className="bg-red-500 text-white py-2 px-8 rounded-md">
            Select file
          </button>
        </div>
        
        {/* Form */}
        <div className="flex-1 ml-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Add a caption..."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cover</label>
              <div className="h-20 bg-gray-200 rounded-md"></div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Who can view this video</label>
              <select 
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option>Public</option>
                <option>Friends</option>
                <option>Private</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Allow users to</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="comments"
                    checked={allowComments}
                    onChange={(e) => setAllowComments(e.target.checked)}
                    className="mr-2" 
                  />
                  <label htmlFor="comments">Comment</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="duet"
                    checked={allowDuet}
                    onChange={(e) => setAllowDuet(e.target.checked)}
                    className="mr-2" 
                  />
                  <label htmlFor="duet">Duet</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="stitch"
                    checked={allowStitch}
                    onChange={(e) => setAllowStitch(e.target.checked)}
                    className="mr-2" 
                  />
                  <label htmlFor="stitch">Stitch</label>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button type="button" className="px-6 py-2 border rounded-md">Discard</button>
              <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded-md">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}