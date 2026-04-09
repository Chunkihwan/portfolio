import Link from 'next/link';
import Image from 'next/image';

const keywords = [
    'Interactive Journalism',
    'Data Visualization',
    'Three.js / WebGL',
    'Story-driven UI',
    'Design + Development',
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,rgba(112,214,255,0.18),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(117,129,255,0.2),transparent_38%),#040b17] px-6 pt-6 py-16 text-slate-100 md:px-10">
            <div className="mx-auto w-full max-w-4xl">
                {/* <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 md:h-16 md:w-16">
                            <Image
                                src="/legacy/profile-jeongihwan.jpeg"
                                alt="전기환 프로필 사진"
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-xs tracking-[0.2em] text-cyan-200">PROFILE</p>
                            <h1 className="text-xl font-semibold md:text-2xl">전기환</h1>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-cyan-200 hover:text-cyan-100"
                    >
                        홈으로
                    </Link>
                </div> */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="mt-1 text-3xl font-semibold md:text-4xl">About</h1>
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

                <section className="rounded-3xl border border-white/15 bg-slate-900/60 p-6 backdrop-blur-xl md:p-8">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 md:h-16 md:w-16">
                            <Image
                                src="/legacy/profile-jeongihwan.jpeg"
                                alt="전기환 프로필 사진"
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-xs tracking-[0.2em] text-cyan-200">NAME</p>
                            <h1 className="text-base font-semibold md:text-2xl">전기환 / JACKSON</h1>
                        </div>
                    </div>
                    <p className="text-base leading-8 md:text-lg text-slate-100">
                        저널리즘과 인터랙티브를 연결하는 개발자입니다. <br className="hidden md:block" />
                        복잡한 데이터를 쉽고 재미있게 풀어내는 일을 합니다.
                    </p>

                    <p className="mt-6 text-sm leading-7 text-slate-300">
                        브런치에 프로젝트 제작기, 데이터 시각화 설계, three.js 기반 실험, 그리고 커리어 전환 과정을
                        기록하고 있습니다.
                    </p>
                    <a
                        href="https://brunch.co.kr/@yahao2512"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0 inline-flex text-cyan-100 underline underline-offset-4 text-sm"
                    >
                        brunch.co.kr/@yahao2512
                    </a>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="rounded-full border border-cyan-100/20 bg-cyan-100/5 px-3 py-1 text-xs text-cyan-100/90"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
