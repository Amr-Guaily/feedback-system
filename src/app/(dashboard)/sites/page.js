import EmptyState from "@/components/dashboard/sites/EmptyState";
import { Heading } from "@chakra-ui/react";

export default function Sites() {

    return (
        <>
            <Heading as="h1" fontWeight="medium" mb={8}>My Sites</Heading>
            <EmptyState />
        </>
    );
}