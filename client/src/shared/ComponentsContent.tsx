import { Box } from "@mui/material";
import ProcessorContent from "../features/cpu/ProcessorContent";
import DiskContent from "../features/disk/DiskContent";
import MemoryContent from "../features/memory/MemoryContent";

interface ContantProps {
    barName: 'Processor'| 'Disk' | 'Memory';
}

const ComponentsContant: React.FC<ContantProps> = ({ barName })  => {


    let componentToRender;

    switch (barName) {
        case "Processor":
                componentToRender = <ProcessorContent />
                break;
        case "Disk":
                componentToRender = <DiskContent/>
                break;
        case "Memory":
                componentToRender = <MemoryContent/>
                break;
        default:
                componentToRender = null;
                break;
        
    }
    

    return (
        <>
            <Box>
                {componentToRender}
            </Box>
        </>
    )
}

export default ComponentsContant 