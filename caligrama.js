
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

    // Soporte para arrastrar con mouse (PC)
    contenedor.addEventListener('mousedown', function(e) {
      if (e.target === rotarBtn) return;
      e.preventDefault();
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;

      function onMouseMove(ev) {
        contenedor.style.left = (ev.pageX - lienzo.offsetLeft - offsetX) + 'px';
        contenedor.style.top = (ev.pageY - lienzo.offsetTop - offsetY) + 'px';
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Soporte para arrastrar con touch (móvil)
    contenedor.addEventListener('touchstart', function(e) {
      if (e.target === rotarBtn) return;
      const touch = e.touches[0];
      const rect = contenedor.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;

      function onTouchMove(ev) {
        const moveTouch = ev.touches[0];
        contenedor.style.left = (moveTouch.clientX - lienzo.offsetLeft - offsetX) + 'px';
        contenedor.style.top = (moveTouch.clientY - lienzo.offsetTop - offsetY) + 'px';
      }

      function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    });

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
