import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const TicketAdvancedLayout = styled(Paper)({
    height: "100%",
    minHeight: 0,
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "56px minmax(0, 1fr)"
})

export default TicketAdvancedLayout;