import ChatClient from "@/app/(chat)/(routes)/chat/[chatId]/components/client";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage: React.FC<ChatIdPageProps> = async ({ params }) => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
