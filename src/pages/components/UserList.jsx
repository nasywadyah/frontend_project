import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg h-[300px] overflow-auto">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Users</h3>
      {users.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li
              key={user.id}
              className="py-2 flex justify-between items-center"
            >
              <span className="text-gray-800 font-medium">{user.name}</span>
              <span
                className={`text-sm px-2 py-1 rounded-lg ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default UserList;
