"use client"

import Image from "next/image";
import Member from "./components/members";

export default function Home() {
  return (
    <div>
      <header className={'w-full shadow flex items-center gap-4 p-4'}>
        <Image
          className="dark:invert block"
          src="/svg/logo-turquoise.svg"
          alt="Logo"
          width={42}
          height={48}
          priority
        />
        <h1 className={'font-bold uppercase mr-auto'}>Tartarus</h1>
        <button className={'text-xs font-bold uppercase p-2 px-3 border rounded bg-black text-white dark:bg-white dark:text-black hover:bg-black/50'}>
          Connect
        </button>
      </header>
      <main className="flex flex-col p-4 sm:p-12">
        <Member />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-8 border-t mt-4">
        <a
          href="https://github.com/tech-week-hackathon/hackathon-judgement"
          target="_blank"
          rel="noopener noreferrer"
        >
          Judgment Repo →
        </a>
        <a
          href="https://drive.google.com/drive/folders/1vpHZ7DwjOESF3wcIvfvvKKC-Vkg5zDI-"
          target="_blank"
          rel="noopener noreferrer"
        >
          Assets Folder →
        </a>
      </footer>
    </div>
  );
}
