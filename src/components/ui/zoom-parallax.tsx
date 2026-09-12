'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const blurTransform = useTransform(scrollYProgress, [0, 0.6, 1], ['blur(0px)', 'blur(4px)', 'blur(16px)']);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh] w-full">
			<div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
				<div className="absolute z-10 text-center px-8 py-6 rounded-3xl max-w-3xl pointer-events-none bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl">
					<h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
						Our Premium Stay Experiences
					</h2>
					<p className="text-primary/60 mt-4 text-sm sm:text-base font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
						Scroll to explore our handpicked accommodations & scenic views curated by Kavini Dhyasree.
					</p>
				</div>

				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];
                    const filter = index === 0 ? 'blur(0px)' : blurTransform;

					return (
						<motion.div
							key={index}
							style={{ scale, filter }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw]">
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover rounded-2xl shadow-2xl border border-white/20"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
