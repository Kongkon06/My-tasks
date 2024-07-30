export default function Progressbar({ progress }) {
    return (
      <div className="w-1/5 bg-gray-300 rounded-full h-5">
        <div
          className="bg-blue-600 h-5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  }