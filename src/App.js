import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      // console.log(response)
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/Rocketseat/GabrielNR",
      techs: [
        "Node",
        "Express",
        "TypeScript"
      ],
  });
  
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }


  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`/repositories/${id}`).then(() => {
      const repositoriesFiltered = repositories.filter(
        (item) => item.id !== id
      );

      setRepositories(repositoriesFiltered);

    })
  }


  return (
    <div>
      <ul data-testid="repository-list">
         {repositories.map(repository =>  (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
