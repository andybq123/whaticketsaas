import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const TicketAdvancedLayout = styled(Paper)(({ theme }) => ({
    height: "100%",
    minHeight: 0,
    overflow: "hidden",
    display: "grid",
    borderRadius: 0,
    backgroundColor: theme.palette.background.default,
    gridTemplateRows: "56px minmax(0, 1fr)"
}))

export default TicketAdvancedLayout;