document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.case-gallery img, .case-media img')
  if (!images.length) return

  const overlay = document.createElement('div')
  overlay.className = 'lightbox-overlay'
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-img" alt="">'
  document.body.appendChild(overlay)

  const overlayImg = overlay.querySelector('.lightbox-img')
  const closeBtn = overlay.querySelector('.lightbox-close')

  const open = (src, alt) => {
    overlayImg.src = src
    overlayImg.alt = alt || ''
    overlay.classList.add('open')
    document.body.classList.add('lightbox-lock')
  }

  const close = () => {
    overlay.classList.remove('open')
    document.body.classList.remove('lightbox-lock')
    overlayImg.src = ''
  }

  images.forEach(img => {
    img.classList.add('lightbox-trigger')
    img.addEventListener('click', () => open(img.src, img.alt))
  })

  overlay.addEventListener('click', e => {
    if (e.target === overlayImg) return
    close()
  })

  closeBtn.addEventListener('click', close)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close()
  })
})
