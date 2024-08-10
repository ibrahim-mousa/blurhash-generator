import { encode } from 'blurhash'
import sharp from 'sharp'
import axios from 'axios'
import { NextResponse } from 'next/server';

/**
 * Takes a url of an image and returns a blurhash
 * TODO: handle file upload
 * 
 * example: 
 * curl -X POST http://localhost:3000/generate \
 -H 'Content-Type: application/json' \
 -d '{"url": "https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png"}'
 */
export async function POST(request: Request) {
  let imageBuffer;

  const data = await request.json()

  const { url } = data;

  if (!url) {
    return NextResponse.json({ error: "can't find url param" }, { status: 400 })
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    imageBuffer = Buffer.from(response.data, 'binary');
    const { data, info } = await sharp(imageBuffer).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);

    return NextResponse.json({ blurHash }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch image from URL" }, { status: 400 })
  }
}

