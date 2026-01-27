import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyCourses from "./pages/MyCourses";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import DiscussionSelect from "./pages/DiscussionSelect";
import CommunityDiscussion from "./pages/CommunityDiscussion";
import TeacherDiscussion from "./pages/TeacherDiscussion";
import AIDiscussion from "./pages/AIDiscussion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id/chapter/:chapterId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discussions" element={<DiscussionSelect />} />
          <Route path="/discussions/community" element={<CommunityDiscussion />} />
          <Route path="/discussions/teacher" element={<TeacherDiscussion />} />
          <Route path="/discussions/ai" element={<AIDiscussion />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
