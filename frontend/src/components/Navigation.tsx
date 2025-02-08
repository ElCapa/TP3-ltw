import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <ul className="flex space-x-6 justify-center gap-4">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-300 font-medium text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Shark Picker
          </Link>
        </li>
        <li>
          <Link
            to="/admin/sharks"
            className="text-white hover:text-gray-300 font-medium text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Admin Sharks
          </Link>
        </li>
        <li>
          <Link
            to="/admin/sharks/novo"
            className="text-white hover:text-gray-300 font-medium text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Novo Tubarão
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;