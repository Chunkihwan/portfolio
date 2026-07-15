'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useMemo, useState } from 'react';

const RAW_PROJECTS = [
    {
        date: '2026.03.26',
        title: '공직자 재산 정보',
        link: 'https://jaesan.newstapa.org/',
        image: '20260326.jpg',
        category: ['INTERACTIVE', 'NEXT.JS', 'DATA-VISUALIZATION'],
    },
    {
        date: '2025.08.28',
        title: '내란 기획자 노상원의 수첩',
        link: 'https://pages.newstapa.org/2025/RohSangWon/',
        image: '20250828.jpg',
        category: ['INTERACTIVE', 'NEXT.JS', 'DATA-VISUALIZATION'],
    },
    {
        date: '2025.01.14',
        title: '명태균 게이트, 판도라의 상자를 열다',
        link: 'https://pages.newstapa.org/2025/pandora/',
        image: '20250114.jpg',
        category: ['INTERACTIVE', 'NEXT.JS', 'DATA-VISUALIZATION'],
    },
    {
        date: '2024.12.03',
        title: '윤석열 내란 타임라인',
        link: 'https://pages.newstapa.org/2024/insurrection/',
        image: '20241203.jpg',
        category: ['INTERACTIVE', 'NEXT.JS', 'DATA-VISUALIZATION'],
    },
    {
        date: '2023.7.6',
        title: '검찰의 금고를 열다',
        link: 'https://pages.newstapa.org/2023/07_prosecution/',
        image: 'image_nt_0.jpg',
        category: ['INTERACTIVE', 'NEXT.JS', 'DATA-VISUALIZATION'],
    },
    {
        date: '2022.2.25',
        title: '달려라! 푸하맨',
        link: 'https://www.airkorea.or.kr/portal/game/',
        image: 'image_20220225.jpg',
        category: ['GAME', 'WEBGL', 'THREE.JS'],
    },
    {
        date: '2021.10.01',
        title: '플라스틱 쓰레기왕',
        link: 'https://www.joongang.co.kr/digitalspecial/455',
        image: 'image_455.jpg',
        category: ['GAME', 'WEBGL', 'THREE.JS'],
    },
    // { date: "2019.08.23", title: "주가로 본 YG엔터테인먼트의 흥망성쇠", link: "https://www.joongang.co.kr/digitalspecial/367", image: "image_367.jpg", category: ["DATA-VISUALIZATION", "WEBGL", "THREE.JS"] },
    {
        date: '2018.12.28',
        title: '디지털 콘텐트 랩 2018',
        link: 'https://www.joongang.co.kr/digitalspecial/339',
        image: 'image_339.jpg',
        category: ['WEBGL', 'THREE.JS', 'INTERACTIVE'],
    },
    // { date: "2018.12.13", title: "탈탈 털어보자 우리동네 세금 출장", link: "https://www.joongang.co.kr/digitalspecial/336", image: "image_336.jpg", category: ["INTERACTIVE"] },
    {
        date: '2018.10.11',
        title: '가장 얇고 가벼운 흉기, 빨대',
        link: 'https://www.joongang.co.kr/digitalspecial/322',
        image: 'image_322.jpg',
        category: ['WEB', 'WEBGL', 'THREE.JS', 'INTERACTIVE'],
    },
    {
        date: '2018.09.21',
        title: '우주, 어디까지 가고 싶니?',
        link: 'https://www.joongang.co.kr/digitalspecial/316',
        image: 'image_316.jpg',
        category: ['WEBGL', 'THREE.JS', 'STORYTELLING'],
    },
    {
        date: '2018.08.23',
        title: "문과사전 - 청와대,부처 '문라인' 대해부",
        link: 'https://www.joongang.co.kr/digitalspecial/204',
        image: 'image_204.jpg',
        category: ['DATA-VISUALIZATION', 'INTERACTIVE'],
    },
    {
        date: '2018.08.23',
        title: "공기 반, 과자 반 '뻥 과자'를 찾아라",
        link: 'https://www.joongang.co.kr/digitalspecial/196',
        image: 'image_196.jpg',
        category: ['INTERACTIVE'],
    },
    {
        date: '2018.08.02',
        title: '전기요금 계산기',
        link: 'https://www.joongang.co.kr/digitalspecial/309',
        image: 'image_309.jpg',
        category: ['INTERACTIVE'],
    },
    {
        date: '2018.07.25',
        title: '데이터로 찾아낸 로드킬 고속도로',
        link: 'https://www.joongang.co.kr/digitalspecial/307',
        image: 'image_307.jpg',
        category: ['INTERACTIVE', 'DATA-VISUALIZATION'],
    },
    {
        date: '2018.07.19',
        title: '납량특집 공포체험! 그 영화, 그 장면',
        link: 'https://www.joongang.co.kr/digitalspecial/306',
        image: 'image_306.jpg',
        category: ['WEBGL', 'INTERACTIVE'],
    },
    {
        date: '2018.04.25',
        title: '3D로 체험하는 판문점의 어제와 오늘',
        link: 'https://www.joongang.co.kr/digitalspecial/290',
        image: 'image_290.jpg',
        category: ['THREE.JS', ' INTERACTIVE', 'STORYTELLING'],
    },
    // { date: "2018.01.26", title: "우리 물고기가 달라졌어요", link: "https://www.joongang.co.kr/digitalspecial/260", image: "image_260.jpg", category: ["DATA-VISUALIZATION", "INTERACTIVE"] },
    {
        date: '2017.12.29',
        title: '2017 중앙일보 데이터 저널리즘',
        link: 'https://www.joongang.co.kr/digitalspecial/245',
        image: 'image_245.jpg',
        category: ['DATA-VISUALIZATION', 'INTERACTIVE', 'THREE.JS'],
    },
    {
        date: '2017.06.15',
        title: '거제, 이대로 추락할까',
        link: 'https://www.joongang.co.kr/digitalspecial/184',
        image: 'image_184.jpg',
        category: ['STORYTELLING'],
    },
    // { date: "2017.04.14", title: "대선 후보를 움직이는 사람들", link: "https://www.joongang.co.kr/digitalspecial/167", image: "image_167.jpg", category: ["INTERACTIVE", "DATA-VISUALIZATION"] },
    // { date: "2017.04.12", title: "대선후보 정치 가계부", link: "https://www.joongang.co.kr/digitalspecial/165", image: "image_165.jpg", category: ["INTERACTIVE", "DATA-VISUALIZATION"] },
    // { date: "2017.02.23", title: "도전 WBC 야구왕 퀴즈", link: "https://www.joongang.co.kr/digitalspecial/148", image: "image_148.jpg", category: ["INTERACTIVE", "DATA-VISUALIZATION"] },
    {
        date: '2016.09.21',
        title: '대한민국 검사의 초상',
        link: 'https://www.joongang.co.kr/digitalspecial/114',
        image: 'image_114.jpg',
        category: ['INTERACTIVE'],
    },
    {
        date: '2016.08.18',
        title: '해안침식, 백사장이 사라진다',
        link: 'https://www.joongang.co.kr/digitalspecial/111',
        image: 'image_111.jpg',
        category: ['STORYTELLING'],
    },
];

const PROJECTS = RAW_PROJECTS.map((project) => {
    const tags = project.category.map((tag) => tag.trim());
    // const summary = `${tags.slice(0, 2).join(' · ')} 중심으로 구현한 인터랙티브 프로젝트`;

    return {
        date: project.date,
        title: project.title,
        link: project.link,
        image: `/legacy/${project.image}`,
        tags,
    };
});

const ThreeBackdrop = dynamic(() => import('./components/three-backdrop').then((mod) => mod.ThreeBackdrop), {
    ssr: false,
});

const KaleidoscopeHero = dynamic(() => import('./components/kaleidoscope-hero').then((mod) => mod.KaleidoscopeHero), {
    ssr: false,
});

const FILTERS = [
    'ALL',
    'INTERACTIVE',
    'THREE.JS',
    'DATA-VISUALIZATION',
    'WEBGL',
    'GAME',
    'WEB',
    'STORYTELLING',
    'NEXT.JS',
];

export default function Home() {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'ALL') {
            return PROJECTS;
        }

        return PROJECTS.filter((project) => project.tags.includes(activeFilter));
    }, [activeFilter]);

    const { scrollYProgress } = useScroll();
    const progressScale = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 24,
        mass: 0.2,
    });

    return (
        <div className="relative isolate min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_20%_5%,rgba(85,216,255,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(112,134,255,0.22),transparent_38%),#040b17] text-slate-100">
            <ThreeBackdrop />

            <motion.div
                className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-cyan-300"
                style={{ scaleX: progressScale }}
            />

            <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
                    <a href="#top" className="text-sm tracking-[0.3em] text-cyan-200">
                        JACKSON
                    </a>
                    <nav className="flex items-center gap-4 text-sm text-slate-300 md:gap-6">
                        {/* <a href="#projects" className="transition hover:text-cyan-200">
                            Projects
                        </a> */}
                        <a href="/about" className="transition hover:text-cyan-200">
                            About
                        </a>
                        <a href="/awards" className="transition hover:text-cyan-200">
                            Awards
                        </a>
                        {/* <a href="#contact" className="transition hover:text-cyan-200">
                            Contact
                        </a> */}
                    </nav>
                </div>
            </header>

            <main id="top" className="w-full pb-20">
                <section className="hidden md:block relative min-h-[76vh] overflow-hidden border-b border-white/10 px-6 pt-20 md:min-h-[82vh] md:px-10 md:pt-24">
                    <KaleidoscopeHero />
                    <div className="relative z-10 mx-auto flex min-h-[calc(76vh-5rem)] w-full max-w-6xl items-end pb-10 md:min-h-[calc(82vh-6rem)] md:pb-14">
                        <div className="max-w-3xl">
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-4 text-sm text-cyan-100"
                            >
                                Interactive Designer / Frontend Developer
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.08 }}
                                className="text-5xl font-semibold leading-[0.98] text-white md:text-7xl"
                            >
                                JACKSON
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.18 }}
                                className="mt-5 max-w-xl text-base leading-7 text-slate-200 md:text-lg"
                            >
                                저널리즘과 인터랙티브를 연결하는 개발자입니다.
                            </motion.p>
                        </div>
                    </div>
                </section>

                <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-16">
                    <section id="projects" className="pb-20 md:pb-28">
                        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-3xl font-semibold text-white">Projects</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {FILTERS.map((filter) => {
                                    const isActive = activeFilter === filter;
                                    return (
                                        <button
                                            type="button"
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`rounded-full border px-3 py-1.5 text-xs tracking-wide transition ${
                                                isActive
                                                    ? 'border-cyan-200 bg-cyan-200 text-slate-900'
                                                    : 'border-white/20 bg-white/5 text-slate-200 hover:border-cyan-200/60 hover:text-cyan-100'
                                            }`}
                                        >
                                            {filter}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredProjects.map((project, index) => (
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={`${project.title}-${project.date}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.3, delay: index * 0.06 }}
                                    className="group"
                                >
                                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/60">
                                        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
                                        </div>
                                        <span className="mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">
                                            {project.date}
                                        </span>
                                        <h3 className="text-xl font-medium text-white">{project.title}</h3>
                                        {/* <p className="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p> */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={`${project.title}-${tag}`}
                                                    className="text-xs text-cyan-100/90"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </section>

                    <section
                        id="contact"
                        className="rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-slate-900/70 to-slate-950/70 p-7 backdrop-blur-lg md:p-10"
                    >
                        <h2 className="text-2xl font-semibold text-white">Contact</h2>
                        <p className="mt-3 text-sm text-slate-200">프로젝트 문의, 협업 제안</p>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm">
                            <a
                                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 transition hover:border-cyan-200 hover:text-cyan-100"
                                href="mailto:yahao2512@gmail.com"
                            >
                                e-mail
                            </a>
                            <a
                                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 transition hover:border-cyan-200 hover:text-cyan-100"
                                href="https://www.instagram.com/yahao2512/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Instagram
                            </a>
                            <a
                                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 transition hover:border-cyan-200 hover:text-cyan-100"
                                href="https://brunch.co.kr/@yahao2512"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Brunch
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
