"use client";

import { useState } from "react";
import TeamsHero from "@/components/teams/TeamsHero";
import TeamsMarquee from "@/components/teams/TeamsMarquee";
import TeamSection from "@/components/teams/TeamSection";
import CinematicScroll from "@/components/teams/CinematicScroll";
import TeamsClosing from "@/components/teams/TeamsClosing";
import YearFilter from "@/components/teams/YearFilter";
import { teamDataByYear, type TeamYear } from "@/data/teamData";
import {
    Brain,
    Code,
    Network,
    Palette,
    PenTool,
    Camera,
    Megaphone,
    GraduationCap,
    Users,
    Target,
    Lightbulb,
    Shield,
    Handshake
} from "lucide-react";

// Technical Domain Focus Areas
const technicalFocusAreas = [
    {
        icon: Brain,
        title: "Machine Learning",
        description: "Exploring AI frontiers, from neural networks to predictive modeling and intelligent systems.",
    },
    {
        icon: Code,
        title: "Web Development",
        description: "Building scalable, modern applications with cutting-edge technologies and frameworks.",
    },
    {
        icon: Network,
        title: "DSA & System Design",
        description: "Mastering algorithms and architecting robust, high-performance distributed systems.",
    },
];

// Creative Domain Focus Areas
const creativeFocusAreas = [
    {
        icon: Palette,
        title: "Graphics & UI/UX",
        description: "Designing intuitive interfaces and stunning visual assets that captivate users.",
    },
    {
        icon: PenTool,
        title: "Content & Writing",
        description: "Crafting compelling narratives and engaging content that tells our story.",
    },
    {
        icon: Camera,
        title: "Photo & Video",
        description: "Capturing moments and telling stories through professional visual media.",
    },
    {
        icon: Megaphone,
        title: "Marketing & PR",
        description: "Building community engagement and managing our public presence.",
    },
];

// Faculty Focus Areas
const facultyFocusAreas = [
    {
        icon: GraduationCap,
        title: "Academic Guidance",
        description: "Providing scholarly direction and ensuring alignment with academic standards.",
    },
    {
        icon: Lightbulb,
        title: "Research Mentorship",
        description: "Guiding students through research methodologies and publication processes.",
    },
    {
        icon: Handshake,
        title: "Industry Connect",
        description: "Bridging academia and industry through professional networks and collaborations.",
    },
];

// Leadership Focus Areas
const leadershipFocusAreas = [
    {
        icon: Target,
        title: "Strategic Vision",
        description: "Setting chapter goals, planning initiatives, and driving organizational growth.",
    },
    {
        icon: Users,
        title: "Community Building",
        description: "Fostering an inclusive environment and strengthening member engagement.",
    },
    {
        icon: Shield,
        title: "Operations & Governance",
        description: "Managing chapter affairs, finances, and ensuring smooth execution of events.",
    },
];

export default function TeamsPageClient() {
    const [selectedYear, setSelectedYear] = useState<TeamYear>("2025-26");

    // Get team data for selected year
    const currentTeamData = teamDataByYear[selectedYear];
    const { faculty, officeBearers, technical, creative } = currentTeamData;

    return (
        <main className="min-h-screen bg-[#030303] text-[var(--foreground)]">
            {/* Cinematic Scroll Indicator */}
            <CinematicScroll />

            {/* Hero Section */}
            <TeamsHero />

            {/* Marquee Section */}
            <TeamsMarquee />

            {/* Year Filter */}
            <YearFilter
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
            />

            {/* Content Sections */}
            <div className="relative">
                {/* Faculty Coordinators */}
                <TeamSection
                    title="Faculty Coordinators"
                    subtitle="The Mentors"
                    description="Distinguished faculty members who guide and support our chapter's vision, research initiatives, and academic excellence."
                    members={faculty}
                    sectionNumber="01"
                    focusAreas={facultyFocusAreas}
                />

                {/* Office Bearers */}
                <TeamSection
                    title="Office Bearers"
                    subtitle="The Leadership"
                    description="The core leadership team driving strategy, operations, and chapter growth through dedicated service and vision."
                    members={officeBearers}
                    sectionNumber="02"
                    focusAreas={leadershipFocusAreas}
                />

                {/* Technical Team - only show if has members */}
                {technical.length > 0 && (
                    <TeamSection
                        title="Technical Domain"
                        subtitle="The Engineers"
                        description="Experts in development, data science, and emerging technologies building innovative solutions that push boundaries."
                        members={technical}
                        sectionNumber="03"
                        focusAreas={technicalFocusAreas}
                    />
                )}

                {/* Creative Team - only show if has members */}
                {creative.length > 0 && (
                    <TeamSection
                        title="Creative Domain"
                        subtitle="The Artisans"
                        description="Creative minds shaping our visual identity, content strategy, and community engagement through artistic excellence."
                        members={creative}
                        sectionNumber="04"
                        focusAreas={creativeFocusAreas}
                    />
                )}

                {/* Closing Section */}
                <TeamsClosing />
            </div>
        </main>
    );
}
