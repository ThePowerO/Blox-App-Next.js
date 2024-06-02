// /pages/api/convert-video.js

import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { videoUrl } = req.body;

    if (!videoUrl.endsWith('.wmv')) {
      return res.status(400).json({ error: 'Invalid video format. Only .wmv files are supported.' });
    }

    const inputPath = path.join('/tmp', 'input.wmv');
    const outputPath = path.join('/tmp', 'output.mp4');

    try {
      // Download the WMV video
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error('Failed to download video');
      }

      const fileStream = fs.createWriteStream(inputPath);
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', reject);
        fileStream.on('finish', resolve);
      });

      // Convert the video using ffmpeg
      ffmpeg(inputPath)
        .toFormat('mp4')
        .save(outputPath)
        .on('end', () => {
          res.setHeader('Content-Type', 'video/mp4');
          fs.createReadStream(outputPath).pipe(res);
        })
        .on('error', (err) => {
          console.error('Error converting video:', err);
          res.status(500).json({ error: 'Error converting video' });
        });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
