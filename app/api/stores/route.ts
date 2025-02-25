import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name, description } = body;
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        const store = await prismadb.store.create({
            data: {
                name,
                userId,
                description,
            }
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const { id } = await req.json();
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        if (!id) {
            return new NextResponse("ID is required", { status: 400 });
        }
        const store = await prismadb.store.delete({
            where: {
                id,
                userId,
            }
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        const stores = id 
            ? await prismadb.store.findMany({ where: { id, userId } })
            : await prismadb.store.findMany({ where: { userId } });
        return NextResponse.json(stores);
    } catch (error) {
        console.log('[STORE_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { id, isOpen, description } = body;
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        if (!id) {
            return new NextResponse("ID is required", { status: 400 });
        }
        const data = JSON.parse(JSON.stringify({
            isOpen,
            description
        }));
        const store = await prismadb.store.update({
            where: {
                id,
                userId,
            },
            data,
        });
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
