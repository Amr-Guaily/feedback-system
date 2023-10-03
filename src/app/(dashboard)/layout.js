import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Box as="main" bg="gray.100" flexGrow={1}>
                <Box className="container">
                    {children}
                </Box>
            </Box>
        </>
    );
}