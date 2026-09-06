import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Heart,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  X,
  Mail,
} from "lucide-react";
import { careersContent, JobOpening } from "@/data";
import { toast } from "sonner";

export default function Careers() {
  const { hero, culture, openings, openApplication } = careersContent;
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [activeJobModal, setActiveJobModal] = useState<JobOpening | null>(null);

  const departments = [
    "All",
    ...Array.from(new Set(openings.map((o) => o.department))),
  ];

  const filteredJobs = openings.filter(
    (job) => selectedDept === "All" || job.department === selectedDept
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gradient-to-b from-brand-peach-bg via-[#FFF5ED] to-[#FCFCFD] py-16 md:py-20 border-b border-orange-100/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-purple/10 text-brand-purple">
                <Sparkles size={14} /> {hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-purple-dark tracking-tight">
                {hero.title}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {hero.subtitle}
              </p>
            </div>
          </Container>
        </section>

        {/* ================= CULTURE & PERKS ================= */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green block mb-2">
                Why Work With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-purple-dark tracking-tight">
                {culture.heading}
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-3">
                {culture.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {culture.perks.map((perk, i) => (
                <div
                  key={i}
                  className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-peach-bg text-brand-purple flex items-center justify-center font-bold">
                    <Heart size={22} className="text-brand-purple" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">
                    {perk.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ================= OPEN POSITIONS ================= */}
        <section className="py-16 bg-[#F9FAFB] border-y border-gray-100">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-purple block mb-2">
                  Current Vacancies
                </span>
                <h3 className="text-3xl font-black text-brand-purple-dark tracking-tight">
                  Open Positions ({filteredJobs.length})
                </h3>
              </div>

              {/* Department Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedDept === dept
                        ? "bg-brand-purple text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-lg mx-auto space-y-4">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto" />
                <h4 className="text-lg font-bold text-gray-900">
                  No active openings in this department
                </h4>
                <p className="text-sm text-gray-500">
                  We frequently post new roles. Feel free to submit an open application below.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-brand-purple/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-bold rounded-md">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-green-50 text-brand-green text-xs font-bold rounded-md">
                          {job.type}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-brand-purple transition-colors">
                        {job.title}
                      </h4>

                      <p className="text-sm text-gray-600 line-clamp-2 max-w-3xl">
                        {job.shortDescription}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-gray-400" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-gray-400" /> {job.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveJobModal(job)}
                        className="w-full md:w-auto px-6 py-3 bg-brand-purple text-white hover:bg-brand-purple-dark font-bold text-xs md:text-sm rounded-xl transition-all shadow-sm"
                      >
                        View & Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* ================= OPEN APPLICATION CARD ================= */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="bg-gradient-to-r from-brand-purple-dark via-[#4B2F83] to-brand-purple rounded-3xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto space-y-5 shadow-xl shadow-brand-purple/20">
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                Spontaneous Applications
              </span>
              <h3 className="text-2xl md:text-3xl font-black">
                {openApplication.title}
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
                {openApplication.description} {openApplication.instructions}
              </p>
              <div className="pt-2">
                <a
                  href={openApplication.emailLink}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-purple-dark hover:bg-brand-peach-bg font-bold rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <Mail size={18} /> {openApplication.buttonText}
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* ================= JOB DETAILS MODAL ================= */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple text-xs font-bold rounded-md">
                  {activeJobModal.department}
                </span>
                <span className="px-3 py-1 bg-green-50 text-brand-green text-xs font-bold rounded-md">
                  {activeJobModal.type}
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                {activeJobModal.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                📍 {activeJobModal.location} &nbsp;|&nbsp; ⏱️ Experience: {activeJobModal.experience}
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-bold text-gray-900 mb-1">About the Role</h5>
                <p className="text-gray-600 leading-relaxed">
                  {activeJobModal.shortDescription}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-2">Key Responsibilities</h5>
                <ul className="space-y-1.5 list-disc pl-5 text-gray-600">
                  {activeJobModal.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-2">Requirements</h5>
                <ul className="space-y-1.5 list-disc pl-5 text-gray-600">
                  {activeJobModal.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setActiveJobModal(null)}
                className="px-5 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={`mailto:careers@desiiglobal.com?subject=Application%20for%20${encodeURIComponent(
                  activeJobModal.title
                )}&body=Hi%20DesiiGlobal%20Team,%0D%0A%0D%0APlease%20find%20attached%20my%20resume%20for%20the%20${encodeURIComponent(
                  activeJobModal.title
                )}%20role.%0D%0A%0D%0A`}
                className="px-6 py-2.5 bg-brand-purple text-white font-bold rounded-xl text-sm hover:bg-brand-purple-dark text-center inline-flex items-center justify-center gap-2"
              >
                <Send size={16} /> Apply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
