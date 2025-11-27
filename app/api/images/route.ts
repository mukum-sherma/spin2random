import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
	try {
		const imagesDirectory = path.join(process.cwd(), 'public', 'images');
		const files = fs.readdirSync(imagesDirectory);
		
		// Filter only image files
		const imageFiles = files.filter(file => {
			const ext = path.extname(file).toLowerCase();
			return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
		});
		
		return NextResponse.json({ images: imageFiles });
	} catch (error) {
		console.error('Error reading images directory:', error);
		return NextResponse.json({ images: [] }, { status: 500 });
	}
}
