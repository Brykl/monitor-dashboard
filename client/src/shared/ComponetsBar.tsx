import { Box } from "@mui/material";



interface MyComponentsProps {
    status: boolean;
    content: string;
    onClick: () => void;
}

const ComponentBar: React.FC<MyComponentsProps> = ({ status, content, onClick}) => {

    let color: string = '#d5c7aa';
    let colorText: string = '#596146';
    let colorHover: string | null  = '#d8ccb5';


    if(status){
        color = '#8e9b6d';
        colorText= 'white';
        colorHover = 'null'
    }
    
    return (
        <>
            <Box
            onClick={onClick}
            sx={{bgcolor: color, flexGrow: 1, display: 'flex',
                 justifyContent: 'center', alignItems: 'center', color: colorText, fontSize: '20px',
                 '&:hover': {
                    bgcolor: colorHover
                 }
                 }} ><Box>{content}</Box></Box>
        </>
    )
}

export default ComponentBar;