import MainLayout from "@/components/Global/main.layout";
interface HomePage {}

export default function HomePage() {
  return (
    <MainLayout
      links={[{ url: "#", id: "test", text: "Moves" }]}
      left={<>Test</>}
      mini={<>mini</>}
    >
      <h1>Test</h1>
    </MainLayout>
  );
}
