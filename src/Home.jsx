import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Arquivo de estilo

function Home() {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState({
    titulo: '',
    notas: '',
    prioridade: false,
  });
  const [editAnnotationId, setEditAnnotationId] = useState(null);

  useEffect(() => {
    fetchAnnotations();
  }, []);

  const fetchAnnotations = async () => {
    try {
      const response = await axios.get('/annotations');
      setAnnotations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createAnnotation = async () => {
    try {
      const response = await axios.post('/annotations', newAnnotation);
      setAnnotations([...annotations, response.data]);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const updateAnnotation = async (id, updatedAnnotation) => {
    try {
      await axios.put(`/annotations/${id}`, updatedAnnotation);
      const updatedAnnotations = annotations.map((annotation) =>
        annotation._id === id ? updatedAnnotation : annotation
      );
      setAnnotations(updatedAnnotations);
      setEditAnnotationId(null);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAnnotation = async (id) => {
    try {
      await axios.delete(`/annotations/${id}`);
      setAnnotations(annotations.filter((annotation) => annotation._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editAnnotation = (id) => {
    const annotation = annotations.find((annotation) => annotation._id === id);
    setNewAnnotation(annotation);
    setEditAnnotationId(id);
  };

  const clearForm = () => {
    setNewAnnotation({
      titulo: '',
      notas: '',
      prioridade: false,
    });
  };

  return (
    <div className="container">
      <h1>Anotações</h1>

      {!editAnnotationId && (
        <div>
          <h3>Criar uma Nova Anotação</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              style={{ width: '200px' }}
              placeholder="Título da anotação"
              value={newAnnotation.titulo}
              onChange={(e) =>
                setNewAnnotation({ ...newAnnotation, titulo: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              style={{ width: '200px' }}
              placeholder="Notas da anotação"
              value={newAnnotation.notas}
              onChange={(e) =>
                setNewAnnotation({ ...newAnnotation, notas: e.target.value })
              }
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={newAnnotation.prioridade}
              onChange={(e) =>
                setNewAnnotation({
                  ...newAnnotation,
                  prioridade: e.target.checked,
                })
              }
            />
            <label className="form-check-label">Alta Prioridade</label>
          </div>
          <button className="btn btn-primary" onClick={createAnnotation}>
            Criar
          </button>
        </div>
      )}

      <h3>Todas as Anotações</h3>
      {annotations.length > 0 ? (
        <div className="card-deck">
          {annotations.map((annotation) => (
            <div
              className={`card ${annotation.prioridade ? 'card-prioridade-alta' : ''}`}
              key={annotation._id}
            >
              <div className="card-body">
                {editAnnotationId === annotation._id ? (
                  <div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: '200px' }}
                        value={newAnnotation.titulo}
                        onChange={(e) =>
                          setNewAnnotation({
                            ...newAnnotation,
                            titulo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: '200px' }}
                        value={newAnnotation.notas}
                        onChange={(e) =>
                          setNewAnnotation({
                            ...newAnnotation,
                            notas: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={newAnnotation.prioridade}
                        onChange={(e) =>
                          setNewAnnotation({
                            ...newAnnotation,
                            prioridade: e.target.checked,
                          })
                        }
                      />
                      <label className="form-check-label">Alta Prioridade</label>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateAnnotation(annotation._id, newAnnotation)}
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">{annotation.titulo}</h5>
                    <p className="card-text">{annotation.notas}</p>
                    <p className="card-text">
                      Prioridade: {annotation.prioridade ? 'Alta' : 'Baixa'}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => editAnnotation(annotation._id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAnnotation(annotation._id)}
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma anotação encontrada.</p>
      )}
    </div>
  );
}

export default Home;

