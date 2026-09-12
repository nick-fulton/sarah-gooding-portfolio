document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.case-gallery').forEach(gallery => {
    const items = [...gallery.children]
    if (items.length < 2) return

    const gap = 16

    const columnsFor = width => {
      if (width <= 480) return 1
      if (width <= 760) return 2
      return 3
    }

    const aspectRatio = el => {
      if (el.tagName === 'IMG') {
        const width = el.naturalWidth || Number(el.dataset.naturalWidth) || 0
        const height = el.naturalHeight || Number(el.dataset.naturalHeight) || 0
        return width ? height / width : 1
      }
      return el.videoWidth ? el.videoHeight / el.videoWidth : 1
    }

    const layout = () => {
      const count = columnsFor(window.innerWidth)

      // Pull every item back into the gallery directly, in original order,
      // then discard any leftover column wrappers from a previous layout pass.
      items.forEach(item => gallery.appendChild(item))
      gallery.querySelectorAll(':scope > .gallery-col').forEach(col => col.remove())

      if (count === 1) {
        gallery.classList.remove('js-masonry')
        return
      }

      gallery.classList.add('js-masonry')

      const galleryWidth = gallery.getBoundingClientRect().width
      const colWidth = (galleryWidth - gap * (count - 1)) / count

      const makeColumns = () =>
        Array.from({ length: count }, () => {
          const col = document.createElement('div')
          col.className = 'gallery-col'
          return col
        })

      let cols = makeColumns()
      let heights = new Array(count).fill(0)

      const flushColumns = () => {
        cols.forEach(col => {
          if (col.children.length) gallery.appendChild(col)
        })
        cols = makeColumns()
        heights = new Array(count).fill(0)
      }

      items.forEach(item => {
        if (item.classList.contains('gallery-wide')) {
          flushColumns()
          gallery.appendChild(item)
          return
        }
        const predictedHeight = colWidth * aspectRatio(item)
        const shortest = heights.indexOf(Math.min(...heights))
        cols[shortest].appendChild(item)
        heights[shortest] += predictedHeight + gap
      })

      flushColumns()
    }

    // Images can carry loading="lazy" and report `.complete === true` before
    // they have actually fetched, so probe real dimensions with a detached
    // Image() (which always fetches immediately) rather than trusting the
    // in-page <img> element's own load state.
    const images = [...gallery.querySelectorAll('img')]
    const videos = [...gallery.querySelectorAll('video')]

    const probeImage = img =>
      new Promise(resolve => {
        if (img.naturalWidth) {
          resolve()
          return
        }
        const probe = new Image()
        probe.onload = () => {
          if (!img.naturalWidth) {
            img.dataset.naturalWidth = probe.naturalWidth
            img.dataset.naturalHeight = probe.naturalHeight
          }
          resolve()
        }
        probe.onerror = resolve
        probe.src = img.src
      })

    const videoReady = video =>
      video.readyState >= 1
        ? Promise.resolve()
        : new Promise(resolve => {
            video.addEventListener('loadedmetadata', resolve, { once: true })
            video.addEventListener('error', resolve, { once: true })
          })

    const ready = Promise.race([
      Promise.all([...images.map(probeImage), ...videos.map(videoReady)]),
      new Promise(resolve => setTimeout(resolve, 1500)),
    ])

    ready.then(layout)

    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(layout, 150)
    })
  })
})
