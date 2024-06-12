import CompanionForm from "@/app/(root)/(routes)/companion/[companionId]/components/companion-form";
import prismadb from "@/lib/prismadb";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage: React.FC<CompanionIdPageProps> = async ({ params }) => {
  // TODO: Check subscription

  const companion = await prismadb.companion.findUnique({
    where: { id: params.companionId },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
