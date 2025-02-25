import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function StoreLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const authResult = await auth();
    const { userId } = authResult;
    if (!userId) {
        return null;
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });
    console.log(store);
    if (!store) {
        redirect(`/profile`);
    }
    return (
        <>
            {children}
        </>
    );
}