import React from 'react';
import { EmailStore } from './stores/EmailStore';
import { FolderStore } from './stores/FolderStore';
import { ApiService } from './services/ApiService';
import { EmailController } from './controllers/EmailController';
import { FolderController } from './controllers/FolderController';
import { Sidebar } from './components/Sidebar/Sidebar';
import { EmailList } from './components/EmailList/EmailList';
import { EmailViewer } from './components/EmailViewer/EmailViewer';
import { syncEmailCountWithFolders } from './utils/syncEmailCountWithFolders';

const emailStore = new EmailStore();
const folderStore = new FolderStore();
const apiService = new ApiService();
const emailController = new EmailController(emailStore, apiService);
const folderController = new FolderController(folderStore, apiService);

syncEmailCountWithFolders(emailStore, folderStore);

export default function App(): JSX.Element {
  const handleDeleteEmail = (emailId: string) => {
    emailController.deleteEmail(emailId);
    emailStore.clearSelection();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar controller={folderController} emailController={emailController} />
      <main className="flex flex-1 h-full">
        <section className="w-96 border-r h-full overflow-y-auto">
          <EmailList controller={emailController} />
        </section>
        <section className="flex-1 h-full overflow-y-auto">
          <EmailViewer controller={emailController} onDeleteEmail={handleDeleteEmail} />
        </section>
      </main>
    </div>
  );
}