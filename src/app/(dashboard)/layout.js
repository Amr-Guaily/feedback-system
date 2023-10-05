import Navbar from "@/components/layout/Navbar";
import PrivateRoute from "@/components/layout/PrivateRoute";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
    return (
        <PrivateRoute>
            <Navbar />
            <Box as="main" bg="gray.100" flexGrow={1}>
                <Box className="container" py={10}>
                    {children}
                </Box>
            </Box>
        </PrivateRoute>
    );
}