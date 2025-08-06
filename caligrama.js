document.getElementById('crear').addEventListener('click', () => {
  const texto = document.getElementById('poema').value;
  const palabras = texto.split(/\s+/);
  const lienzo = document.getElementById('lienzo');
  lienzo.innerHTML = ''; // Limpia

  const colores = ['#1f3b4d', '#7b3f00', '#b22222', '#2e8b57', '#6a5acd', '#000000', '#c19a6b'];

  palabras.forEach((palabra, i) => {
    const span = document.createElement('span');
    span.className = 'palabra';
    span.textContent = palabra;
    span.style.left = `${Math.random() * 90}%`;
    span.style.top = `${Math.random() * 90}%`;
    span.style.color = colores[Math.floor(Math.random() * colores.length)];

    // Arrastrar
    span.onmousedown = function(e) {
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;

      document.onmousemove = function(ev) {
        span.style.left = (ev.pageX - lienzo.offsetLeft - offsetX) + 'px';
        span.style.top = (ev.pageY - lienzo.offsetTop - offsetY) + 'px';
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    lienzo.appendChild(span);
  });
});

// Descargar como imagen PNG
document.getElementById('descargar').addEventListener('click', () => {
  const lienzo = document.getElementById('lienzo');
  html2canvas(lienzo).then(canvas => {
    const enlace = document.createElement('a');
    enlace.download = 'caligrama.png';
    enlace.href = canvas.toDataURL('image/png');
    enlace.click();
  });
});
