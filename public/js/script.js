document.addEventListener("DOMContentLoaded", function() {
  const content = document.getElementById('content');

  function loadContent(page) {
    fetch(page)
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;
        if (page === 'page1.html') {
          loadJsonData('questions/example1.json');
        } else if (page === 'page2.html') {
          loadJsonData('questions/example2.json');
        } else if (page === 'page3.html') {
          loadJsonData('questions/example3.json');
        }
      })
      .catch(error => console.error('Error loading page:', error));
  }

  function loadJsonData(jsonFile) {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        const pre = document.createElement('pre');
        pre.textContent = JSON.stringify(data, null, 2);
        content.appendChild(pre);
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }

  document.getElementById('home-link').addEventListener('click', () => loadContent('home.html'));
  document.getElementById('page1-link').addEventListener('click', () => loadContent('Cuestionario.html'));
  document.getElementById('page2-link').addEventListener('click', () => loadContent('Buscador.html'));
  document.getElementById('page3-link').addEventListener('click', () => loadContent('Conversor.html'));
});

