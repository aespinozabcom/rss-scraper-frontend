import React, { useEffect, useState } from "react";

export const NoticiaRow = ({ data }) => {
  const [noticia, setNoticia] = useState({
    _id: "",
    url: "",
    date_published: "",
    title: "",
    content_html: "",
    summary: "",
  });

  const { _id, url, date_published, title, content_html, summary } = noticia;

  useEffect(() => {
    setNoticia(data);
  }, []);

  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{url}</td>
      <td>{date_published}</td>
      <td>{title}</td>
      <td>{content_html}</td>
      <td>{summary}</td>
    </tr>
  );
};
