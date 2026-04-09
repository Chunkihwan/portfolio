import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    metadataBase: new URL('https://portfolio-chunkihwans-projects.vercel.app'),
    title: '전기환 | Interactive Portfolio',
    description: 'three.js와 데이터 시각화를 기반으로 한 인터랙티브 디자이너/프론트엔드 개발자 포트폴리오',
    openGraph: {
        title: '전기환 | Interactive Portfolio',
        description: 'three.js와 데이터 시각화를 기반으로 한 인터랙티브 디자이너/프론트엔드 개발자 포트폴리오',
        type: 'website',
        url: 'https://portfolio-chunkihwans-projects.vercel.app',
        images: [
            {
                url: '/legacy/thumb.jpg',
                width: 1200,
                height: 630,
                alt: '전기환 인터랙티브 포트폴리오',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '전기환 | Interactive Portfolio',
        description: 'three.js와 데이터 시각화를 기반으로 한 인터랙티브 디자이너/프론트엔드 개발자 포트폴리오',
        images: ['/legacy/thumb.jpg'],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-86EFV9QDZE" strategy="afterInteractive" />
                <Script id="ga-gtag" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-86EFV9QDZE');
          `}
                </Script>
                {children}
            </body>
        </html>
    );
}
