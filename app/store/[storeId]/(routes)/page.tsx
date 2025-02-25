"use client";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    return (
        <div className="flex justify-center items-center h-screen">
            <Button onClick={onOpen}>open your first store</Button>
        </div>
    );
}

export default SetupPage;
