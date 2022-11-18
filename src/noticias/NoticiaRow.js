import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/noticias.css";

export const NoticiaRow = ({ data, edited, setEdited, setLoad }) => {
  const [noticia, setNoticia] = useState({
    _id: "",
    url: "",
    date_published: "",
    title: "",
    content_html: "",
    summary: "",
    feedMedio: "",
    api: "",
  });

  const [changed, setChanged] = useState(false);

  const {
    _id,
    url,
    date_published,
    title,
    content_html,
    summary,
    feedMedio,
    api,
  } = noticia;

  useEffect(() => {
    setNoticia(data);
  }, []);

  const onChange = (e) => {
    setNoticia({
      ...noticia,
      [e.target.name]: e.target.value,
    });

    if (!changed) {
      setChanged(true);
    }
  };

  useEffect(() => {
    if (changed) {
      const filtrar = edited.filter((x) => x._id === _id);

      if (filtrar.length > 0) {
        const lista = edited.map((nt) => {
          if (nt._id === _id) {
            return noticia;
          } else {
            return nt;
          }
        });

        const listaFiltrado = lista.filter((x) => x._id !== "");
        setEdited(listaFiltrado);
      } else {
        const lista = edited;
        lista.push(noticia);
        const listaFiltrado = lista.filter((x) => x._id !== "");

        setEdited(listaFiltrado);
      }
    }
  }, [noticia]);

  const onClick = async () => {
    try {
      const obj = {
        fecha: date_published,
        titular: title,
        cuerpo: `${content_html} ${summary}`,
        link: url,
        valorizacion: 0,
      };

      const { data: dataToken } = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/usuario/login`,
        method: "POST",
        data: {
          correo: process.env.REACT_APP_USER_NOTICIA,
          contrasena: process.env.REACT_APP_PASSWORD_NOTICIA,
        },
      });

      let buscarEmpresa = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/empresa/nombre/n*a`,
        method: "GET",
        headers: {
          "x-token": dataToken.token,
        },
      });

      if (JSON.stringify(buscarEmpresa) === JSON.stringify({})) {
        buscarEmpresa = await axios({
          url: `${process.env.REACT_APP_NOTICIA_HOST}/api/empresa`,
          method: "POST",
          headers: {
            "x-token": dataToken.token,
          },
          data: {
            descripcion: "n/a",
          },
        });
      }

      obj.idEmpresa = buscarEmpresa.data.idEmpresa;

      const { data: dataScrap } = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/web-scrapp/rss`,
        method: "POST",
        data: {
          content_html,
          title,
          summary,
        },
        headers: {
          "x-token": dataToken.token,
        },
      });

      if (dataScrap.Pais === "No encontrado") {
        let buscarRegion = await axios({
          url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia/nombre/SIN INDENTIFICAR - NO ENCONTRADO`,
          method: "GET",
          headers: {
            "x-token": dataToken.token,
          },
        });

        if (JSON.stringify(buscarRegion.data) === JSON.stringify({})) {
          let buscarPais = await axios({
            url: `${process.env.REACT_APP_NOTICIA_HOST}/api/pais/nombre/no encontrado`,
            method: "GET",
            headers: {
              "x-token": dataToken.token,
            },
          });

          if (JSON.stringify(buscarPais.data) === JSON.stringify({})) {
            buscarPais = await axios({
              url: `${process.env.REACT_APP_NOTICIA_HOST}/api/pais`,
              method: "POST",
              headers: {
                "x-token": dataToken.token,
              },
              data: {
                descripcion: "no encontrado",
              },
            });
          }

          buscarRegion = await axios({
            url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia`,
            method: "POST",
            headers: {
              "x-token": dataToken.token,
            },
            data: {
              descripcion: "SIN INDENTIFICAR - NO ENCONTRADO",
              idPais: buscarPais.data.idPais,
            },
          });
        }

        obj.idRegion = buscarRegion.data.idRegionProvincia;
      } else {
        if (dataScrap.Region.includes("Noticia sin")) {
          let buscarRegion = await axios({
            url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia/nombre/sin identificar - ${dataScrap.Pais}`,
            method: "GET",
            headers: {
              "x-token": dataToken.token,
            },
          });

          if (JSON.stringify(buscarRegion.data) === JSON.stringify({})) {
            let buscarPais = await axios({
              url: `${process.env.REACT_APP_NOTICIA_HOST}/api/pais/nombre/${dataScrap.Pais}`,
              method: "GET",
              headers: {
                "x-token": dataToken.token,
              },
            });

            if (JSON.stringify(buscarPais.data) === JSON.stringify({})) {
              buscarPais = await axios({
                url: `${process.env.REACT_APP_NOTICIA_HOST}/api/pais`,
                method: "POST",
                headers: {
                  "x-token": dataToken.token,
                },
                data: {
                  descripcion: dataScrap.Pais,
                },
              });
            }

            buscarRegion = await axios({
              url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia`,
              method: "POST",
              headers: {
                "x-token": dataToken.token,
              },
              data: {
                descripcion: `sin identificar - ${dataScrap.Pais}`,
                idPais: buscarPais.data.idPais,
              },
            });
          }

          obj.idRegion = buscarRegion.data.idRegionProvincia;
        } else {
          let buscarRegion = await axios({
            url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia/nombre/${dataScrap.Region}`,
            method: "GET",
            headers: {
              "x-token": dataToken.token,
            },
          });

          if (JSON.stringify(buscarRegion.data) === JSON.stringify({})) {
            buscarRegion = await axios({
              url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia/nombre/SIN INDENTIFICAR - NO ENCONTRADO`,
              method: "GET",
              headers: {
                "x-token": dataToken.token,
              },
            });

            if (JSON.stringify(buscarRegion.data) === JSON.stringify({})) {
              let buscarPais = await axios({
                url: `${process.env.REACT_APP_NOTICIA_HOST}/api/pais/nombre/no encontrado`,
                method: "GET",
                headers: {
                  "x-token": dataToken.token,
                },
              });

              if (JSON.stringify(buscarPais.data) === JSON.stringify({})) {
                buscarPais = await axios({
                  url: `${process.env.REACT_APP_NOTICIA_HOST}/api/pais`,
                  method: "POST",
                  headers: {
                    "x-token": dataToken.token,
                  },
                  data: {
                    data: {
                      descripcion: "no encontrado",
                    },
                  },
                });
              }

              buscarRegion = await axios({
                url: `${process.env.REACT_APP_NOTICIA_HOST}/api/region-provincia`,
                method: "POST",
                headers: {
                  "x-token": dataToken.token,
                },
                data: {
                  descripcion: "SIN INDENTIFICAR - NO ENCONTRADO",
                  idPais: buscarPais.data.idPais,
                },
              });
            }
          }

          obj.idRegion = buscarRegion.data.idRegionProvincia;
        }
      }

      const { data: dataFeed } = await axios({
        url: `${process.env.REACT_APP_BACKEND_HOST}/api/feed-medio/${feedMedio}`,
        method: "GET",
      });

      let medio = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/medio/buscar/${dataFeed.descripcion}`,
        method: "GET",
        headers: {
          "x-token": dataToken.token,
        },
      });
      if (JSON.stringify(medio.data) === JSON.stringify({})) {
        medio = await axios({
          url: `${process.env.REACT_APP_NOTICIA_HOST}/api/medio`,
          method: "POST",
          headers: {
            "x-token": dataToken.token,
          },
          data: {
            nombreMedio: dataFeed.descripcion,
            idPais: 1,
            idCanalMedio: 6,
          },
        });
      }

      obj.idMedio = medio.data.idMedio;

      const { data: dataApi } = await axios({
        url: `${process.env.REACT_APP_BACKEND_HOST}/api/api/${api}`,
        method: "GET",
      });

      let portal = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/portal/nombre/${dataApi.descripcion}`,
        method: "GET",
        headers: {
          "x-token": dataToken.token,
        },
      });

      if (JSON.stringify(portal.data) === JSON.stringify({})) {
        portal = await axios({
          url: `${process.env.REACT_APP_NOTICIA_HOST}/api/portal`,
          method: "POST",
          headers: {
            "x-token": dataToken.token,
          },
          data: {
            descripcion: dataApi.descripcion,
          },
        });
      }

      obj.idPortal = portal.data.idPortal;

      let buscarAlcance = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/alcance/nombre/n*a`,
        method: "GET",
        headers: {
          "x-token": dataToken.token,
        },
      });

      if (JSON.stringify(buscarAlcance.data) === JSON.stringify({})) {
        buscarAlcance = await axios({
          url: `${process.env.REACT_APP_NOTICIA_HOST}/api/alcance`,
          method: "POST",
          headers: {
            "x-token": dataToken.token,
          },
          data: {
            descripcion: "n/a",
          },
        });
      }

      obj.idAlcance = buscarAlcance.data.idAlcance;

      let buscarValoracion = await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/valoracion/nombre/n*a`,
        method: "GET",
        headers: {
          "x-token": dataToken.token,
        },
      });

      if (JSON.stringify(buscarValoracion.data) === JSON.stringify({})) {
        buscarValoracion = await axios({
          url: `${process.env.REACT_APP_NOTICIA_HOST}/api/valoracion`,
          method: "POST",
          headers: {
            "x-token": dataToken.token,
          },
          data: {
            descripcion: "n/a",
          },
        });
      }

      obj.idValoracion = buscarValoracion.data.idValoracion;

      await axios({
        url: `${process.env.REACT_APP_NOTICIA_HOST}/api/noticia`,
        method: "POST",
        headers: {
          "x-token": dataToken.token,
        },
        data: obj,
      });

      await axios({
        url: `${process.env.REACT_APP_BACKEND_HOST}/api/noticia/${_id}`,
        method: "DELETE",
      });

      setLoad(true);

      alert("Noticia importada");
    } catch (error) {
      console.error(error);

      alert("Error al importar noticia");
    }
  };

  const limpiarContent = () => {
    const contentLimpiado = content_html
      .replace(/<[^>]+>/g, "")
      .split(".")
      .join(". ")
      .split(".  ")
      .join(". ")
      .split("&nbsp;")
      .join(" ")
      .split("&quot;")
      .join(" ")
      .split("?")
      .join("? ")
      .split("?  ")
      .join("? ");

    setNoticia({
      ...noticia,
      content_html: contentLimpiado,
    });
  };

  const limpiarSummary = () => {
    const summaryLimpiado = summary
      .replace(/<[^>]+>/g, "")
      .split(".")
      .join(". ")
      .split(".  ")
      .join(". ")
      .split("&nbsp;")
      .join(" ")
      .split("&quot;")
      .join(" ")
      .split("?")
      .join("? ")
      .split("?  ")
      .join("? ");

    setNoticia({
      ...noticia,
      summary: summaryLimpiado,
    });
  };

  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{url}</td>
      <td>
        <input
          name="date_published"
          type="datetime-local"
          value={date_published.replace("Z", "")}
          onChange={onChange}
        />
      </td>
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
        <button className="btn btn-primary" onClick={limpiarContent}>
          Limpiar
        </button>
      </td>
      <td>
        <textarea
          value={summary}
          name="summary"
          onChange={onChange}
          className="form-control inputContent"
        />
        <button className="btn btn-primary" onClick={limpiarSummary}>
          Limpiar
        </button>
      </td>
      <td>
        <button onClick={onClick} className="btn btn-primary">
          Importar
        </button>
      </td>
    </tr>
  );
};
