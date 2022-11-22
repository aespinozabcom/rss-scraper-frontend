import React from "react";

export const Sidebar = () => {
  return (
    <div className="sidebar bg-secondary text-left">
      <ul>
        <li>
          <button className="btn btn-secondary w-100">Listar Noticias</button>
        </li>
        <li>
          <button className="btn btn-secondary w-100">Feeds</button>
        </li>
      </ul>
    </div>
  );
};
