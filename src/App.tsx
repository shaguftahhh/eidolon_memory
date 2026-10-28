import React, { useState } from 'react';
import { HYPERFLOW_CASE_STUDY } from './data/requiemData';
import { ForensicArtifact } from './types/requiem';
import { EidolonNav } from './components/EidolonNav';
import { EidolonHero } from './components/EidolonHero';
import { EidolonGhostPresence } from './components/EidolonGhostPresence';
import { EidolonProblemSection } from './components/EidolonProblemSection';
import { EidolonHowItWorks } from './components/EidolonHowItWorks';
import { EidolonTerminalGateway } from './components/EidolonTerminalGateway';
import { EidolonAutopsySection } from './components/EidolonAutopsySection';
import { EidolonTimelineSection } from './components/EidolonTimelineSection';
import { EidolonEvidenceVaultSection } from './components/EidolonEvidenceVaultSection';
import { EidolonDreamsMapBlueprint } from './components/EidolonDreamsMapBlueprint';
import { RequiemOpenWeightSection } from './components/RequiemOpenWeightSection';
import { RequiemGovernanceSection } from './components/RequiemGovernanceSection';
import { EidolonFooter } from './components/EidolonFooter';
import { RequiemProofModal } from './components/RequiemProofModal';
import { ReviveStoryModal } from './components/ReviveStoryModal';
import { FollowMemoryModal } from './components/FollowMemoryModal';
import { RequiemChamberWorkspace } from './components/RequiemChamberWorkspace';
import { RequiemModelSettingsModal } from './components/RequiemModelSettingsModal';
import { RequiemNewInvestigationModal } from './components/RequiemNewInvestigationModal';

export default function App() {
  const [caseStudy, setCaseStudy] = useState(HYPERFLOW_CASE_STUDY);
  const [selectedProofArtifact, setSelectedProofArtifact] = useState<ForensicArtifact | null>(null);
  const [isChamberActive, setIsChamberActive] = useState(false);
  const [isModelSettingsOpen, setIsModelSettingsOpen] = useState(false);
  const [isNewInvestigationOpen, setIsNewInvestigationOpen] = useState(false);
  const [isReviveStoryOpen, setIsReviveStoryOpen] = useState(false);
  const [isFollowMemoryOpen, setIsFollowMemoryOpen] = useState(false);

  // Quick proof selector
  const handleSelectArtifact = (artifact: ForensicArtifact) => {
    setSelectedProofArtifact(artifact);
  };

  const handleOpenChamber = () => {
    setIsChamberActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitChamber = () => {
    setIsChamberActive(false);
  };

  const handleCompleteNewInvestigation = () => {
    setIsNewInvestigationOpen(false);
    setIsChamberActive(true);
  };

  // If user enters dedicated Spectral Chamber workspace
  if (isChamberActive) {
    return (
      <div className="bg-[#07050A] min-h-screen text-stone-200 selection:bg-cyan-500/30 selection:text-cyan-200">
        <RequiemChamberWorkspace
          caseStudy={caseStudy}
          onExitChamber={handleExitChamber}
          onSelectArtifact={handleSelectArtifact}
          onOpenModelSettings={() => setIsModelSettingsOpen(true)}
          onOpenNewInvestigation={() => setIsNewInvestigationOpen(true)}
        />

        {/* Proof Modal */}
        <RequiemProofModal
          artifact={selectedProofArtifact}
          onClose={() => setSelectedProofArtifact(null)}
        />

        {/* Settings Modal */}
        <RequiemModelSettingsModal
          isOpen={isModelSettingsOpen}
          onClose={() => setIsModelSettingsOpen(false)}
        />

        {/* New Investigation Modal */}
        <RequiemNewInvestigationModal
          isOpen={isNewInvestigationOpen}
          onClose={() => setIsNewInvestigationOpen(false)}
          onCompleteInvestigation={handleCompleteNewInvestigation}
        />
      </div>
    );
  }

  // Full Landing Page & Spectral Altar Mode
  return (
    <div className="bg-[#07050A] min-h-screen text-stone-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans relative overflow-x-hidden">
      {/* Background Atmosphere Glows (Cyan ectoplasm + Amber marigold candle warmth) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[700px] h-[550px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Navigation */}
      <EidolonNav
        onOpenChamber={handleOpenChamber}
        isChamberActive={isChamberActive}
        onOpenModelModal={() => setIsModelSettingsOpen(true)}
      />

      {/* Hero Section */}
      <EidolonHero
        onEnterArchive={handleOpenChamber}
        onExploreExperience={() => {
          const el = document.getElementById('manifestation');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Living Human Ghost Presence (The Spectral Apparition) */}
      <EidolonGhostPresence
        onFollowMemory={() => setIsFollowMemoryOpen(true)}
        onReviveStory={() => setIsReviveStoryOpen(true)}
      />

      {/* Problem Section: Not Every Ending Was Intended */}
      <EidolonProblemSection />

      {/* Methodology: How Eidolon Works */}
      <EidolonHowItWorks />

      {/* Terminal Gateway: The Archive is Waiting */}
      <EidolonTerminalGateway
        onStartCustomInvestigation={() => setIsNewInvestigationOpen(true)}
        onOpenSampleCase={() => {
          const el = document.getElementById('autopsy');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Case Study Autopsy: HyperFlow Engine & The Midnight Architect */}
      <EidolonAutopsySection
        caseStudy={caseStudy}
        onSelectArtifactProof={handleSelectArtifact}
      />

      {/* Chronological Strata: Ghost Timeline */}
      <EidolonTimelineSection
        milestones={caseStudy.timeline}
      />

      {/* Primary Artifacts: Evidence Vault */}
      <EidolonEvidenceVaultSection
        artifacts={caseStudy.artifacts}
        onSelectArtifact={handleSelectArtifact}
      />

      {/* Reconstructive Blueprint: Unfinished Dreams & Roadmap */}
      <EidolonDreamsMapBlueprint
        blueprint={caseStudy.blueprint}
      />

      {/* Gemma 2 Architecture: Why Open-Weight AI Matters */}
      <RequiemOpenWeightSection />

      {/* Archival Ethics: Governance, Copyright & Trust */}
      <RequiemGovernanceSection />

      {/* Footer */}
      <EidolonFooter />

      {/* Interactive Proof Modal */}
      <RequiemProofModal
        artifact={selectedProofArtifact}
        onClose={() => setSelectedProofArtifact(null)}
      />

      {/* Revive Story Modal */}
      <ReviveStoryModal
        isOpen={isReviveStoryOpen}
        onClose={() => setIsReviveStoryOpen(false)}
      />

      {/* Follow Memory Modal */}
      <FollowMemoryModal
        isOpen={isFollowMemoryOpen}
        onClose={() => setIsFollowMemoryOpen(false)}
      />

      {/* Model Settings Modal */}
      <RequiemModelSettingsModal
        isOpen={isModelSettingsOpen}
        onClose={() => setIsModelSettingsOpen(false)}
      />

      {/* New Investigation Modal */}
      <RequiemNewInvestigationModal
        isOpen={isNewInvestigationOpen}
        onClose={() => setIsNewInvestigationOpen(false)}
        onCompleteInvestigation={handleCompleteNewInvestigation}
      />
    </div>
  );
}
