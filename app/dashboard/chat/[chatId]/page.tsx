import ChatInterface from "@/components/ChatInterface";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getConvexClient } from "@/lib/convex";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface ChatPageProps {
  params: Promise<{ chatId: Id<"chats"> }>;
}
const ChatPage = async ({ params }: ChatPageProps) => {
  const { chatId } = await params;
  const { userId } = await auth(); // using useauth because this is server side component id coming here is server side
  const id = await auth();
  console.log(id, "id");
  if (!userId) {
    redirect("/");
  }
  try {
    const convex = getConvexClient();
    const initialMessages = await convex.query(api.messages.list, { chatId });

    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ChatPage;
