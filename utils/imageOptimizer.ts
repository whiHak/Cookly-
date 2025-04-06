export interface OptimizeImageOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
  outputType?: 'file' | 'base64'
}

export async function optimizeImage(
  file: File,
  options: OptimizeImageOptions = {}
): Promise<File | string> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'webp',
    outputType = 'file'
  } = options

  // Create an image element
  const img = document.createElement('img')
  const imgLoaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = reject
  })

  // Load the image
  img.src = URL.createObjectURL(file)
  await imgLoaded

  // Calculate new dimensions
  let width = img.width
  let height = img.height

  if (width > maxWidth) {
    height = (height * maxWidth) / width
    width = maxWidth
  }

  if (height > maxHeight) {
    width = (width * maxHeight) / height
    height = maxHeight
  }

  // Create a canvas and draw the resized image
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  ctx.drawImage(img, 0, 0, width, height)

  if (outputType === 'base64') {
    // Return base64 string
    return canvas.toDataURL(`image/${format}`, quality)
  } else {
    // Convert to blob and return as File
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Could not create blob'))
        },
        `image/${format}`,
        quality
      )
    })

    return new File([blob], file.name.replace(/\.[^.]+$/, `.${format}`), {
      type: `image/${format}`,
    })
  }
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      })
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
} 