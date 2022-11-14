import React, { useEffect, useState } from "react";
import "../styles/noticias.css";

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

  const onChange = (e) => {
    setNoticia({
      ...noticia,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{url}</td>
      <td>{date_published}</td>
      <td>
        <textarea
          value={title}
          name="title"
          onChange={onChange}
          className="form-control inputTitulo"
        />
      </td>
      <td>
        <textarea
          value={content_html}
          name="content_html"
          onChange={onChange}
          className="form-control inputContent"
        />
      </td>
      <td>
        <textarea
          value={summary}
          name="summary"
          onChange={onChange}
          className="form-control inputContent"
        />
      </td>
    </tr>
  );
};
