import { JSX } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function UserIdPage(): Promise<JSX.Element> {
    const authResult = await auth();
    const { userId } = authResult;
    if (userId) {
        redirect(`/store/${userId}`);
    }
    return (
        <></>
    );
}