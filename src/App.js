import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories] = useState([])  

  useEffect(handleGetRepository, [])

   function handleGetRepository(){
    api.get('repositories').then(response => setRepositories(response.data))
  }

  async function handleAddRepository() {
    api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }).then(response => setRepositories([...repositories, response.data]))

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories([...newRepositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
