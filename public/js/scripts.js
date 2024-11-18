document.addEventListener("DOMContentLoaded", function() {
  const content = document.getElementById('content');

  function loadContent(page) {
    fetch(page)
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;
        if (page === 'cuestionario.html') {
          loadJsonData('questions/cuestionario.json', renderQuiz);
        } else if (page === 'buscador.html') {
          loadJsonData('questions/buscador.json', renderSearch);
        } else if (page === 'conversor.html') {
          loadJsonData('questions/conversor.json', renderConverter);
        }
      })
      .catch(error => console.error('Error loading page:', error));
  }

  function loadJsonData(jsonFile, callback) {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }

  function renderQuiz(data) {
    const quizContainer = document.getElementById('quiz-container');
    data.forEach((item, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = item.question;
      questionElement.appendChild(questionTitle);

      if (item.imageUrl) {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.question;
        questionElement.appendChild(img);
      }

      item.answers.forEach((answer, i) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        
        const input = document.createElement('input');
        input.type = (item.type === 'multiple-choice') ? 'checkbox' : 'radio';
        input.name = `question${index}`;
        input.id = `question${index}_answer${i}`;
        input.value = i;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = answer;

        answerElement.appendChild(input);
        answerElement.appendChild(label);
        questionElement.appendChild(answerElement);
      });

      quizContainer.appendChild(questionElement);
    });
  }

  function renderSearch(data) {
    // Implementar lógica para el buscador
    console.log(data);
  }

  function renderConverter(data) {
    // Implementar lógica para el conversor
    console.log(data);
  }

  document.getElementById('home-link').addEventListener('click', () => loadContent('home.html'));
  document.getElementById('cuestionario-link').addEventListener('click', () => loadContent('cuestionario.html'));
  document.getElementById('buscador-link').addEventListener('click', () => loadContent('buscador.html'));
  document.getElementById('conversor-link').addEventListener('click', () => loadContent('conversor.html'));

  // Load home content by default
  loadContent('home.html');
});


