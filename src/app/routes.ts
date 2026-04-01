import { createBrowserRouter } from "react-router";
import { LoginPage } from "./components/login-page";
import { Layout } from "./components/layout";
import { IndexPage } from "./components/index-page";
import { ConversationsPage } from "./components/conversations-page";
import { UploadPage } from "./components/upload-page";
import { DocumentsPage } from "./components/documents-page";
import { LibraryPage } from "./components/library-page";
import { ReviewPage } from "./components/review-page";
import { MembersPage } from "./components/members-page";
import { SettingsPage } from "./components/settings-page";
import { ProfilePage } from "./components/profile-page";
import { ResearchBoardPage } from "./components/research-board-page";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: IndexPage,
      },
      {
        path: "conversations",
        Component: ConversationsPage,
      },
      {
        path: "research-board",
        Component: ResearchBoardPage,
      },
      {
        path: "upload",
        Component: UploadPage,
      },
      {
        path: "documents",
        Component: DocumentsPage,
      },
      {
        path: "library",
        Component: LibraryPage,
      },
      {
        path: "review",
        Component: ReviewPage,
      },
      {
        path: "members",
        Component: MembersPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
    ],
  },
]);