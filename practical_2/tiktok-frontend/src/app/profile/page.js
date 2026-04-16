export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="h-24 w-24 rounded-full bg-gray-300 mr-6"></div>
        <div>
          <h1 className="text-2xl font-bold">@username</h1>
          <div className="flex space-x-4 mt-2">
            <span><strong>123</strong> Following</span>
            <span><strong>456</strong> Followers</span>
            <span><strong>789</strong> Likes</span>
          </div>
        </div>
      </div>
      
      {/* Bio */}
      <div className="mb-6">
        <p className="font-semibold">User Name</p>
        <p className="text-gray-600">Bio goes here - describe yourself!</p>
      </div>
      
      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="aspect-[9/16] bg-gray-200 flex items-center justify-center">
            <p>Video {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}