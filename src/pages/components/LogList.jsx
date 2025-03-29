import React from "react";

const LogList = ({ logs }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg h-[300px] overflow-auto">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Logs</h3>
      {logs.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {logs.map((log, index) => (
            <li key={index} className="py-2 text-gray-800">
              <span className="font-medium">{log.action}</span>
              <span className="block text-sm text-gray-500">
                {log.timestamp}
              </span>
            </li>
          ))}s
        </ul>
      ) : (
        <p className="text-gray-500">No logs found</p>
      )}
    </div>
  );
};

export default LogList;
