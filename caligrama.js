document.getElementById('crear').addEventListener('click', () => {
  const texto = document.getElementById('poema').value;
  const palabras = texto.split(/\s+/);
  const lienzo = document.getElementById('lienzo');
  lienzo.innerHTML = '';

  const colores = ['#1f3b4d', '#7b3f00', '#b22222', '#2e8b57', '#6a5acd', '#000000', '#c19a6b'];

  palabras.forEach((palabra) => {
    const contenedor = document.createElement('div');
    contenedor.className = 'palabra-contenedor';
    contenedor.style.left = `${Math.random() * 90}%`;
    contenedor.style.top = `${Math.random() * 90}%`;

    const span = document.createElement('span');
    span.className = 'palabra';
    span.textContent = palabra;
    span.style.color = colores[Math.floor(Math.random() * colores.length)];
    contenedor.appendChild(span);

    const rotarBtn = document.createElement('button');
    rotarBtn.className = 'rotar-btn no-exportar';
    rotarBtn.textContent = '🔄';
    contenedor.appendChild(rotarBtn);

    let rotacion = 0;
    rotarBtn.addEventListener('click', () => {
      rotacion = (rotacion + 15) % 360;
      span.style.transform = `rotate(${rotacion}deg)`;
    });

    contenedor.onmousedown = function(e) {
      if (e.target === rotarBtn) return;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;

      document.onmousemove = function(ev) {
        contenedor.style.left = (ev.pageX - lienzo.offsetLeft - offsetX) + 'px';
        contenedor.style.top = (ev.pageY - lienzo.offsetTop - offsetY) + 'px';
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    lienzo.appendChild(contenedor);
  });
});

document.getElementById('descargar').addEventListener('click', () => {
  const lienzo = document.getElementById('lienzo');
  html2canvas(lienzo, {
    ignoreElements: (el) => el.classList.contains('no-exportar')
  }).then(canvas => {
    const enlace = document.createElement('a');
    enlace.download = 'caligrama.png';
    enlace.href = canvas.toDataURL('image/png');
    enlace.click();
  });
});
