import Image from "next/image";
import Link from "next/link";
import { resolveAssetPath } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#161616] min-h-[320px] flex flex-col justify-between py-16 px-6 text-white/65">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Organizer Info */}
        <div className="flex flex-col gap-4">
          {/* Real logos side by side */}
          <div className="flex items-center gap-3 mb-1">
            <Image
              src={resolveAssetPath("/BLUE WITH WHITE TEXT.png")}
              alt="GGSIPU EDC ACM Student Chapter"
              width={36}
              height={36}
              className="object-contain shrink-0"
            />
            <span className="font-sans text-[13px] font-bold text-white">
              IIC-AIR <span className="text-primary">2027</span>
            </span>
          </div>
          <p className="text-[13px] leading-relaxed font-[300]">
            Guru Gobind Singh Indraprastha University East Delhi Campus (EDC) 1st Indraprastha International Conference on Artificial Intelligence, IoT and Robotics (IIC-AIR) 2027.
          </p>
          <div className="text-[11px] font-[300]">
            Organized by Guru Gobind Singh Indraprastha University East Delhi Campus (EDC) ACM Student Chapter, hosted at University School of Automation and Robotics (USAR).
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-[13px] font-semibold text-white uppercase tracking-wider mb-4">
            Conference
          </h4>
          <ul className="flex flex-col gap-2.5 text-[14px]">
            <li>
              <Link href="/call-for-papers" className="hover:text-white transition-colors font-[300]">
                Call for Papers
              </Link>
            </li>
            <li>
              <Link href="/tracks" className="hover:text-white transition-colors font-[300]">
                Technical Tracks
              </Link>
            </li>
            <li>
              <Link href="/dates" className="hover:text-white transition-colors font-[300]">
                Important Dates
              </Link>
            </li>
            <li>
              <Link href="/registration" className="hover:text-white transition-colors font-[300]">
                Registration Fees
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Organizing & Venue */}
        <div>
          <h4 className="text-[13px] font-semibold text-white uppercase tracking-wider mb-4">
            Organization
          </h4>
          <ul className="flex flex-col gap-2.5 text-[14px]">
            <li>
              <Link href="/committee" className="hover:text-white transition-colors font-[300]">
                Organizing Committee
              </Link>
            </li>
            <li>
              <Link href="/speakers" className="hover:text-white transition-colors font-[300]">
                Keynote Speakers
              </Link>
            </li>
            <li>
              <Link href="/venue" className="hover:text-white transition-colors font-[300]">
                Venue & Location
              </Link>
            </li>
            <li>
              <a
                href="https://openreview.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-[300]"
              >
                Submission Portal
              </a>
            </li>
            <li>
              <a
                href="https://www.ipu.ac.in/usar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-[300]"
              >
                GGSIPU Website
              </a>
            </li>
            <li>
              <a
                href="https://usar.acm.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-[300]"
              >
                ACM Website
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Venue address */}
        <div className="flex flex-col">
          <h4 className="text-[13px] font-semibold text-white uppercase tracking-wider mb-4">
            Location
          </h4>
          <address className="not-italic text-[13px] leading-relaxed font-[300]">
            Guru Gobind Singh Indraprastha University,<br />
            East Delhi Campus,<br />
            Surajmal Vihar, Delhi-110032
          </address>

          {/* IEEE Sustainability Initiative */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 flex items-center justify-center bg-[#24a148]/15 rounded-none shrink-0">
                <svg className="h-3 w-3 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16s1-1 3-1 4 2 6 2 3-1 3-1V4s-1 1-3 1-4-2-6-2-3 1-3 1z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-4" />
                </svg>
              </div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#24a148]">
                IEEE Sustainability Initiative
              </span>
            </div>
            <p className="text-[11px] leading-relaxed font-[300]">
              IIC-AIR 2027 supports IEEE&apos;s Sustainability Initiative by promoting sustainable practices and technologies across computing systems.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] font-[300] text-center sm:text-left">
          &copy; 2027 IIC-AIR. All rights reserved. Non-commercial academic event.
        </p>
        <p className="text-[12px] font-[300] text-center sm:text-right">
          Design guidelines enforced via ACM Chapter.
        </p>
      </div>
    </footer>
  );
}
