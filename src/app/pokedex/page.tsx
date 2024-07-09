import MainLayout from "@/components/Global/main.layout";
interface HomePage {}

export default function HomePage() {
  return (
    <MainLayout
      links={[{ url: "#", id: "test", text: "Moves" }]}
      left={<>PlaceHolder</>}
      mini={<>mini</>}
      dPadLinks={{}}
    >
      <>Test</>
    </MainLayout>
  );
}
