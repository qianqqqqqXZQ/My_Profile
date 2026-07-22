export const contactGlobeAssetUrls = {
  day: '/media/contact-globe/day.jpg',
  night: '/media/contact-globe/night.jpg',
  specular: '/media/contact-globe/specularClouds.jpg',
  dot: '/media/contact-globe/dot.png',
  countries: '/media/contact-globe/globe.json',
}

let assetPromise

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.decoding = 'async'
    image.onload = async () => {
      try {
        await image.decode?.()
      } catch {
        // Some browsers resolve onload before decode support is available. The decoded
        // browser cache is still preferable to starting the scene from an empty texture.
      }
      resolve(image)
    }
    image.onerror = () => reject(new Error(`Failed to load contact globe asset: ${src}`))
    image.src = src
  })

export function preloadContactGlobeAssets() {
  if (!assetPromise) {
    assetPromise = Promise.all([
      loadImage(contactGlobeAssetUrls.day),
      loadImage(contactGlobeAssetUrls.night),
      loadImage(contactGlobeAssetUrls.specular),
      loadImage(contactGlobeAssetUrls.dot),
      fetch(contactGlobeAssetUrls.countries).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load contact globe boundaries: ${response.status}`)
        }
        return response.json()
      }),
    ]).then(([day, night, specular, dot, countries]) => ({
      day,
      night,
      specular,
      dot,
      countries,
    }))
  }

  return assetPromise
}
