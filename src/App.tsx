/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, Job, Project, Conversation, PortfolioItem } from './types';
import { mockJobs, mockProjects, mockConversations, currentUser } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { JobsScreen } from './components/screens/JobsScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { MessagesScreen } from './components/screens/MessagesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

// Modals
import { ChatModal } from './components/modals/ChatModal';
import { ApplyModal } from './components/modals/ApplyModal';
import { DeliveryModal } from './components/modals/DeliveryModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { ProposalModal } from './components/modals/ProposalModal';
import { AddPortfolioModal, PortfolioDetailModal } from './components/modals/PortfolioModals';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');

  // Modals state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  // Dynamic state for interactive demo
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [userData, setUserData] = useState(currentUser);

  // Helper to open chat directly by ID or Client Name
  const handleOpenChatById = (convId: string) => {
    const conv = conversations.find((c) => c.id === convId);
    if (conv) {
      setSelectedConversation(conv);
    }
  };

  const handleOpenChatForClient = (clientName: string) => {
    const conv = conversations.find((c) =>
      c.clientName.toLowerCase().includes(clientName.toLowerCase())
    );
    if (conv) {
      setSelectedConversation(conv);
    } else {
      // Default to first conversation
      setSelectedConversation(conversations[0]);
    }
  };

  const handleJobApplied = (jobId: string) => {
    setAppliedJobIds((prev) => [...prev, jobId]);
  };

  const handleDeliverySubmitted = (projectId: string) => {
    // Show quick feedback
    console.log(`Entrega do projeto ${projectId} enviada`);
  };

  const handleResetData = () => {
    setAppliedJobIds([]);
    setConversations(mockConversations);
    setUserData(currentUser);
    setCurrentTab('inicio');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-lg min-h-screen bg-slate-50 sm:shadow-xl sm:border-x sm:border-slate-200 flex flex-col relative pb-20">
        {/* Mobile App Header */}
        <Header
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadMessagesCount={2}
        />

        {/* Main Content Area per Tab */}
        <div className="flex-1">
          {currentTab === 'inicio' && (
            <HomeScreen
              onTabChange={setCurrentTab}
              onSelectJob={(job) => setSelectedJob(job)}
              onOpenChat={handleOpenChatById}
              onOpenProfileCompletion={() => setCurrentTab('perfil')}
            />
          )}

          {currentTab === 'vagas' && (
            <JobsScreen
              onSelectJob={(job) => setSelectedJob(job)}
              appliedJobIds={appliedJobIds}
            />
          )}

          {currentTab === 'projetos' && (
            <ProjectsScreen
              onOpenDeliveryModal={(project) => setSelectedProject(project)}
              onOpenChatForClient={handleOpenChatForClient}
              onNewProposal={() => setIsProposalOpen(true)}
            />
          )}

          {currentTab === 'mensagens' && (
            <MessagesScreen
              onSelectConversation={(conv) => setSelectedConversation(conv)}
              onNewConversation={() => handleOpenChatForClient('Padaria Sabor da Terra')}
            />
          )}

          {currentTab === 'perfil' && (
            <ProfileScreen
              onEditProfile={() => setIsEditProfileOpen(true)}
              onAddPortfolio={() => setIsAddPortfolioOpen(true)}
              onSelectPortfolioItem={(item) => setSelectedPortfolioItem(item)}
            />
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          unreadMessagesCount={2}
        />

        {/* Interactive Modals */}
        {selectedConversation && (
          <ChatModal
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
          />
        )}

        {selectedJob && (
          <ApplyModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onApplySuccess={handleJobApplied}
          />
        )}

        {selectedProject && (
          <DeliveryModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onDeliverySubmitted={handleDeliverySubmitted}
          />
        )}

        {isEditProfileOpen && (
          <EditProfileModal
            onClose={() => setIsEditProfileOpen(false)}
            onSave={(updated) => setUserData(updated)}
          />
        )}

        {isNotificationsOpen && (
          <NotificationsModal
            onClose={() => setIsNotificationsOpen(false)}
            onNavigateTo={(tab) => setCurrentTab(tab as TabType)}
          />
        )}

        {isProposalOpen && (
          <ProposalModal
            onClose={() => setIsProposalOpen(false)}
            onCreated={(title) => {
              console.log('Proposta criada:', title);
            }}
          />
        )}

        {isAddPortfolioOpen && (
          <AddPortfolioModal
            onClose={() => setIsAddPortfolioOpen(false)}
            onAdd={(item) => {
              console.log('Item adicionado:', item);
            }}
          />
        )}

        {selectedPortfolioItem && (
          <PortfolioDetailModal
            item={selectedPortfolioItem}
            onClose={() => setSelectedPortfolioItem(null)}
          />
        )}
      </div>
    </div>
  );
}
