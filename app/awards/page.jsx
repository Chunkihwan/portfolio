'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const AWARDS = [
    {
        title: '데이터 저널리즘 어워드 오픈 데이터 / 명태균 게이트, 판도라의 상자를 열다',
        date: '2025',
        link: 'https://pages.newstapa.org/2025/pandora/',
    },
    {
        title: '한국기자상 기획보도 / 검찰 예산 최초 공동검증',
        date: '2024',
        link: 'https://pages.newstapa.org/2023/09_prosecution/',
    },
    {
        title: '데이터 저널리즘 어워드 탐사보도 / 검찰의 금고를 열다',
        date: '2023',
        link: 'https://pages.newstapa.org/2023/07_prosecution/',
    },
    {
        title: '한국 가톨릭 매스컴대상, 인터넷부문 / 대한난민 정착기',
        date: '2022',
        link: 'https://2022refugee.cpbc.co.kr/',
    },
    {
        title: '온라인 저널리즘 어워드 특별상 / 데이터브루',
        date: '2019',
        link: 'https://www.joongang.co.kr/article/23642208',
    },
    {
        title: '데이터 저널리즘 어워드 대상 / 우리동네 의회살림',
        date: '2018',
        link: 'https://www.joongang.co.kr/digitalspecial/298',
    },
    {
        title: '온라인 저널리즘 어워드 스토리텔링 / 그날 판문점',
        date: '2018',
        link: 'https://www.joongang.co.kr/digitalspecial/290',
    },
    {
        title: '온라인 저널리즘 어워드 본상 / 우리안의 그렌펠',
        date: '2017',
        link: 'https://www.joongang.co.kr/DigitalSpecial/199',
    },
    {
        title: '인터넷 선거보도상 대상 / 대선후보를 움직이는 사람들 외 2건',
        date: '2017',
        link: 'https://www.joongang.co.kr/digitalspecial/157',
    },
    {
        title: '온라인 저널리즘 어워드 대상 / 검사의 초상',
        date: '2016',
        link: 'https://www.joongang.co.kr/digitalspecial/114',
    },
];

export default function AwardsPage() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_20%_8%,rgba(103,220,255,0.2),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(119,125,255,0.2),transparent_36%),#040b17] px-6 pt-6 py-16 text-slate-100 md:px-10">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="mt-1 text-3xl font-semibold md:text-4xl">Awards</h1>
                    </div>
                    <Link
                        href="/"
                        aria-label="홈으로 이동"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg leading-none transition hover:border-cyan-200 hover:text-cyan-100"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </Link>
                </div>

                <section className="grid gap-3">
                    {AWARDS.map((award, index) => (
                        <motion.div
                            key={`${award.date}-${award.title}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.3, delay: index * 0.06 }}
                        >
                            <a
                                href={award.link}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-2xl border border-white/15 bg-slate-900/55 p-5 transition hover:-translate-y-0.5 hover:border-cyan-200/60"
                            >
                                <p className="text-xs text-cyan-200">{award.date}</p>
                                <h2 className="mt-1 text-base text-white md:text-xl">{award.title}</h2>
                            </a>
                        </motion.div>
                    ))}
                </section>
            </div>
        </main>
    );
}
